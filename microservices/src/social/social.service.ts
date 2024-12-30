import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, Post, Social } from './entities/social.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class SocialService {
  constructor(
    @InjectModel(Social.name) private readonly socialModel: Model<Social>,
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async followUser(userId: string, targetUserId: string): Promise<Social> {
    if (userId === targetUserId) {
      throw new BadRequestException('You cannot follow yourself.');
    }

    const userSocial = await this.socialModel.findOne({ user: userId });
    if (!userSocial) {
      await this.socialModel.create({ user: userId });
    }

    const targetUserSocial = await this.socialModel.findOne({
      user: targetUserId,
    });
    if (!targetUserSocial) {
      await this.socialModel.create({ user: targetUserId });
    }
    //check if the user is already following the target user
    if (userSocial.following.includes(targetUserId as any)) {
      throw new NotFoundException('You are already following this user.');
    }
    // Update the user's following and the target user's followers
    await this.socialModel.updateOne(
      { user: userId },
      { $addToSet: { following: targetUserId } },
    );

    await this.socialModel.updateOne(
      { user: targetUserId },
      { $addToSet: { followers: userId } },
    );

    return this.socialModel.findOne({ user: userId }).populate('following');
  }

  async unfollowUser(userId: string, targetUserId: string): Promise<Social> {
    if (userId === targetUserId) {
      throw new BadRequestException('You cannot unfollow yourself.');
    }

    const userSocial = await this.socialModel.findOne({ user: userId });

    if (!userSocial) {
      throw new NotFoundException('User not found');
    }

    const targetUserSocial = await this.socialModel.findOne({
      user: targetUserId,
    });

    if (!targetUserSocial) {
      throw new NotFoundException('Target user not found');
    }

    //check if the user is already following the target user
    if (!userSocial.following.includes(targetUserId as any)) {
      throw new NotFoundException('You are not following this user.');
    }

    // Update the user's following and the target user's followers
    await this.socialModel.updateOne(
      { user: userId },
      { $pull: { following: targetUserId } },
    );

    await this.socialModel.updateOne(
      { user: targetUserId },
      { $pull: { followers: userId } },
    );

    return this.socialModel.findOne({ user: userId }).populate('following');
  }

  async createPost(
    userId: string,
    createPostDto: CreatePostDto,
  ): Promise<Post> {
    const post = await this.postModel.create({
      author: userId,
      ...createPostDto,
    });

    const userSocial = await this.socialModel.findOne({ user: userId });

    if (!userSocial) {
      await this.socialModel.create({ user: userId });
    }

    // Push the post to the followers' feed
    const social = await this.socialModel.findOne({ user: userId });
    if (social.followers.length > 0) {
      await this.socialModel.updateMany(
        { user: { $in: social.followers } },
        { $push: { feed: post._id } },
      );
    }

    // Add the post to the user's feed
    await this.socialModel.updateOne(
      { user: userId },
      { $push: { feed: post._id } },
    );

    return post;
  }

  async deletePost(userId: string, postId: string) {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.author.toString() !== userId) {
      throw new BadRequestException('You cannot delete this post');
    }

    //change hidden to true instead of deleting the post
    await this.postModel.findByIdAndUpdate(postId, { hidden: true });

    return `post with id ${postId} deleted`;
  }

  async getFeed(userId: string) {
    const social = await this.socialModel.findOne({ user: userId }).populate({
      path: 'feed',
      populate: { path: 'author', select: 'name username profilePicture' },
    });

    if (!social) {
      throw new NotFoundException('User feed not found');
    }

    return social;
  }

  async likePost(userId: string, postId: string): Promise<Post> {
    const post = await this.postModel.findById(postId);

    if (post.hidden) {
      throw new NotFoundException('Post not found');
    }

    const hasLiked = post.likes.includes(userId as any);
    if (hasLiked) {
      throw new BadRequestException('You have already liked this post');
    }
    await this.postModel.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: userId } },
      { new: true },
    );

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async unlikePost(userId: string, postId: string): Promise<Post> {
    const post = await this.postModel.findById(postId);

    if (post.hidden) {
      throw new NotFoundException('Post not found');
    }

    const hasLiked = post.likes.includes(userId as any);
    if (!hasLiked) {
      throw new BadRequestException('You have not liked this post');
    }

    await this.postModel.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true },
    );

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async commentOnPost(
    userId: string,
    postId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentModel.create({
      author: userId,
      post: postId,
      ...createCommentDto,
    });

    // Add the comment to the post
    await this.postModel.findByIdAndUpdate(postId, {
      $push: { comments: comment._id },
    });

    return comment;
  }

  async deleteComment(userId: string, commentId: string) {
    const comment = await this.commentModel.findById(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.author.toString() !== userId) {
      throw new BadRequestException('You cannot delete this comment');
    }
    await this.postModel.findByIdAndUpdate(comment.post, {
      $pull: { comments: commentId },
    });

    //change hidden to true instead of deleting the comment
    await this.commentModel.findByIdAndUpdate(commentId, { hidden: true });

    return `comment with id ${commentId} deleted`;
  }
}
