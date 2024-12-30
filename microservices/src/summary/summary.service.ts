import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SummaryService {
  private readonly openaiEndpoint = 'https://api.openai.com/v1/chat/completions';

  constructor(private readonly configService: ConfigService) {}

  async generateSummary(movieName: string): Promise<string> {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!movieName) {
      throw new HttpException('Movie name is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const response = await axios.post(
        this.openaiEndpoint,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant who provides concise movie summaries.',
            },
            {
              role: 'user',
              content: `Provide a detailed summary for the movie titled "${movieName}".`,
            },
          ],
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const summary = response.data.choices[0].message.content;
      return summary.trim();
    } catch (error) {
      console.error('Error calling OpenAI API:', error.response?.data || error.message);
      throw new HttpException(
        'Failed to generate summary. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
