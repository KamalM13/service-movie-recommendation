import { Controller, Get, Param, Post } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';

@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get()
  async getAllRecommendations() {
    return { message: 'All recommendations.' };
  }

  @Post(':userId')
  async generateRecommendations(@Param('userId') userId: string) {
    await this.recommendationService.generateRecommendations(userId);
    return { message: 'Recommendations generated.' };
  }

  @Get(':userId')
  async getRecommendations(@Param('userId') userId: string) {
    return this.recommendationService.getRecommendations(userId);
  }
}
