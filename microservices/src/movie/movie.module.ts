import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Movie, MovieSchema } from './entities/movie.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/user/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [MovieController],
  providers: [MovieService, JwtStrategy],
})
export class MovieModule {}
