import { IsNotEmpty, IsString, IsNumber, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  movieId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}

export class UpdateReviewDto {
  @IsString()
  comment?: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;
}
