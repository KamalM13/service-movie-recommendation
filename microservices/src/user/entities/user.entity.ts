import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: null })
  profilePicture: string;

  @Prop({ default: '' })
  bio: string;

  @Prop({ type: [Types.ObjectId], ref: 'Movie', default: [] })
  watchedMovies: Types.ObjectId[]; // Movies the user has marked as watched

  @Prop({ type: [Types.ObjectId], ref: 'Movie', default: [] })
  likedMovies: Types.ObjectId[]; // Movies the user liked

  @Prop({ type: [Types.ObjectId], ref: 'Movie', default: [] })
  watchList: Types.ObjectId[]; // Movies the user plans to watch

  @Prop({ default: false })
  isAdmin: boolean; // Flag to determine if the user has admin privileges

  @Prop({ default: 0 })
  totalReviews: number; // Total number of reviews written by the user

  @Prop({ default: 0 })
  totalLikesReceived: number; // Total likes received on their reviews

  @Prop({ type: [String], default: [] })
  preferences: string[]; // Genres or categories the user prefers (e.g., 'Action', 'Comedy')

  // @Prop({ type: [Types.ObjectId], ref: 'Review', default: [] })
  // reviews: Types.ObjectId[]; // Reviews written by the user
}

export const UserSchema = SchemaFactory.createForClass(User);
