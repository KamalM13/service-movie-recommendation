import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get('movie')
  async getMovieSummary(@Query('name') name: string): Promise<{ summary: string }> {
    if (!name) {
      throw new HttpException('Movie name is required', HttpStatus.BAD_REQUEST);
    }

    const summary = await this.summaryService.generateSummary(name);
    return { summary };
  }
}
