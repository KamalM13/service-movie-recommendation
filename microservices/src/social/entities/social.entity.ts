import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Schema for representing the relationship between users (e.g., following/followers)
@Schema({ timestamps: true })
export class Social extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  following: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  followers: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Post', default: [] })
  feed: Types.ObjectId[];

  @Prop({ type: Boolean, default: false })
  hidden: boolean;
}

export const SocialSchema = SchemaFactory.createForClass(Social);

// Schema for representing posts or activities in the feed
@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  likes: Types.ObjectId[];

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: null })
  media: string;

  @Prop({ type: [Types.ObjectId], ref: 'Comment', default: [] })
  comments: Types.ObjectId[];

  @Prop({ type: Boolean, default: false })
  hidden: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);

// Schema for comments on posts
@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  post: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  hidden: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
