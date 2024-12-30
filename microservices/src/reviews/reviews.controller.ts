import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get(':movieId')
  findByMovie(@Param('movieId') movieId: string) {
    return this.reviewsService.findByMovie(movieId);
  }

  @Patch(':reviewId')
  update(@Param('reviewId') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Post(':reviewId/like')
  likeReview(@Param('reviewId') reviewId: string) {
    return this.reviewsService.likeReview(reviewId);
  }

  @Post(':reviewId/dislike')
  dislikeReview(@Param('reviewId') reviewId: string) {
    return this.reviewsService.dislikeReview(reviewId);
  }
}
