import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { MovieModule } from '../movie/movie.module';
import { SupabaseModule } from '../supabase/supabase.module';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';

@Module({
  imports: [UserModule, MovieModule, SupabaseModule],
  providers: [RecommendationService],
  controllers: [RecommendationController],
})
export class RecommendationModule {}
