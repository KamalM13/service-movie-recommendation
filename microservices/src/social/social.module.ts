import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialController } from './social.controller';
import { JwtStrategy } from 'src/user/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CommentSchema,
  PostSchema,
  SocialSchema,
} from './entities/social.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Social', schema: SocialSchema }]),
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  controllers: [SocialController],
  providers: [SocialService, JwtStrategy],
})
export class SocialModule {}
