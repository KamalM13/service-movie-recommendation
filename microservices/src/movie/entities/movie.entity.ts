import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Movie extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  tagline: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  releaseDate: Date;

  @Prop({ type: [String], default: [] })
  genres: string[];

  @Prop({ type: [String], default: [] })
  directors: string[];

  @Prop({ type: [String], default: [] })
  writers: string[];

  @Prop({ type: [String], default: [] })
  cast: string[];

  @Prop()
  posterUrl: string;

  @Prop()
  trailerUrl: string;

  @Prop({ type: [Types.ObjectId], ref: 'Review', default: [] })
  reviews: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  likedBy: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  addedToWatchlistBy: Types.ObjectId[];

  @Prop({ default: 0 })
  totalRatings: number;

  @Prop({ default: 0 })
  averageRating: number;

  @Prop({ type: [Number], default: [] })
  ratingsBreakdown: number[];

  @Prop()
  duration: string;

  @Prop()
  language: string;

  @Prop({ type: [String], default: [] })
  countries: string[];

  @Prop({ default: false })
  isTrending: boolean;

  @Prop({ default: false })
  hidden: boolean;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
