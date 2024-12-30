import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { SearchModule } from './search/search.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI),
    UserModule,
    MovieModule,
    RecommendationModule,
    SearchModule, // Import the RecommendationModule
    ReviewsModule
  ],
  controllers: [AppController],
  providers: [AppService], // Remove RecommendationService and SupabaseService
})
export class AppModule {}
