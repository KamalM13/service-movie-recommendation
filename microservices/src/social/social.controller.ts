import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SocialService } from './social.service';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}
  @Put('follow/:targetUserId')
  @UseGuards(AuthGuard('jwt'))
  async followUser(@Req() req, @Param('targetUserId') targetUserId: string) {
    const userId = req.user.userId;
    return this.socialService.followUser(userId, targetUserId);
  }

  @Put('unfollow/:targetUserId')
  @UseGuards(AuthGuard('jwt'))
  async unfollowUser(@Req() req, @Param('targetUserId') targetUserId: string) {
    const userId = req.user.userId;
    return this.socialService.unfollowUser(userId, targetUserId);
  }

  @Get('feed')
  @UseGuards(AuthGuard('jwt'))
  async getFeed(@Req() req) {
    const userId = req.user.userId;
    return this.socialService.getFeed(userId);
  }

  @Post('post')
  @UseGuards(AuthGuard('jwt'))
  async createPost(@Req() req, @Body() createPostDto) {
    const userId = req.user.userId;
    return this.socialService.createPost(userId, createPostDto);
  }

  @Delete('post/:postId')
  @UseGuards(AuthGuard('jwt'))
  async deletePost(@Req() req, @Param('postId') postId: string) {
    const userId = req.user.userId;
    return this.socialService.deletePost(userId, postId);
  }

  @Put('like/:postId')
  @UseGuards(AuthGuard('jwt'))
  async likePost(@Req() req, @Param('postId') postId: string) {
    const userId = req.user.userId;
    return this.socialService.likePost(userId, postId);
  }

  @Put('unlike/:postId')
  @UseGuards(AuthGuard('jwt'))
  async unlikePost(@Req() req, @Param('postId') postId: string) {
    const userId = req.user.userId;
    return this.socialService.unlikePost(userId, postId);
  }

  @Post('comment/:postId')
  @UseGuards(AuthGuard('jwt'))
  async createComment(
    @Req() req,
    @Param('postId') postId: string,
    @Body() createCommentDto,
  ) {
    const userId = req.user.userId;
    return this.socialService.commentOnPost(userId, postId, createCommentDto);
  }

  @Delete('comment/:commentId')
  @UseGuards(AuthGuard('jwt'))
  async deleteComment(@Req() req, @Param('commentId') commentId: string) {
    const userId = req.user.userId;
    return this.socialService.deleteComment(userId, commentId);
  }
}
