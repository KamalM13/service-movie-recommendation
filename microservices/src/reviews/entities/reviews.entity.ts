import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Review extends Document {
  @Prop({ required: true })
  movieId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, min: 0, max: 5 })
  rating: number;

  @Prop({ required: true })
  comment: string;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  dislikes: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
