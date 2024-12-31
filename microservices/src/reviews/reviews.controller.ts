import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('create/:movieId/:userId')
  create(
    @Param('movieId') movieId: string,
    @Param('userId') userId: string,
    @Body() createReviewDto: Omit<CreateReviewDto, 'movieId' | 'userId'>,
  ) {
    return this.reviewsService.create({ ...createReviewDto, movieId, userId });
  }

  @Get(':movieId')
  findByMovie(@Param('movieId') movieId: string) {
    return this.reviewsService.findByMovie(movieId);
  }

  @Patch(':reviewId')
  update(@Param('reviewId') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Post('/like/:reviewId')
  likeReview(@Param('reviewId') reviewId: string) {
    console.log('Review ID received in controller:', reviewId); // Log for debugging
    return this.reviewsService.likeReview(reviewId);
  }

  @Post('/dislike/:reviewId')
  dislikeReview(@Param('reviewId') reviewId: string) {
    return this.reviewsService.dislikeReview(reviewId);
  }
}
