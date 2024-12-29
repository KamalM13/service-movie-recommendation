import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<Movie>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const newMovie = new this.movieModel(createMovieDto);
    return newMovie.save();
  }

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieModel.findById(id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const updatedMovie = await this.movieModel.findByIdAndUpdate(
      id,
      updateMovieDto,
      { new: true },
    );
    if (!updatedMovie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return updatedMovie;
  }

  async remove(id: string): Promise<string> {
    const deletedMovie = await this.movieModel.findByIdAndDelete(id);
    if (!deletedMovie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return `Movie with ID ${id} deleted successfully`;
  }

  async likeMovie(movieId, userId): Promise<string> {
    const movie = await this.movieModel.findById(movieId);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not authorized');
    }

    if (movie.likedBy.includes(userId)) {
      throw new NotFoundException('User has already liked this movie');
    }

    movie.likedBy.push(userId);
    user.likedMovies.push(movieId);

    await movie.save();
    await user.save();

    return `Movie with ID ${movieId} liked successfully`;
  }

  async unlikeMovie(movieId, userId): Promise<string> {
    const movie = await this.movieModel.findById(movieId);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not authorized');
    }

    if (!movie.likedBy.includes(userId)) {
      throw new NotFoundException('User has not liked this movie');
    }

    movie.likedBy = movie.likedBy.filter((id) => id !== userId);
    user.likedMovies = user.likedMovies.filter((id) => id !== movieId);

    await movie.save();
    await user.save();

    return `Movie with ID ${movieId} unliked successfully`;
  }

  async getLikedMovies(userId) {
    const user = await this.userModel.findById(userId).populate('likedMovies');
    if (!user) {
      throw new UnauthorizedException('User not authorized');
    }

    return user.likedMovies;
  }

  async getWatchlist(userId) {
    const user = await this.userModel.findById(userId).populate('watchList');
    if (!user) {
      throw new UnauthorizedException('User not authorized');
    }

    return user.watchList;
  }

  async addToWatchlist(movieId, userId): Promise<string> {
    const movie = await this.movieModel.findById(movieId);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not authorized');
    }

    if (user.watchList.includes(movieId)) {
      throw new NotFoundException('Movie is already in the watchlist');
    }

    user.watchList.push(movieId);
    await user.save();

    return `Movie with ID ${movieId} added to watchlist successfully`;
  }

  async removeFromWatchlist(movieId, userId): Promise<string> {
    const movie = await this.movieModel.findById(movieId);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not authorized');
    }

    if (!user.watchList.includes(movieId)) {
      throw new NotFoundException('Movie is not in the watchlist');
    }

    user.watchList = user.watchList.filter((id) => id !== movieId);
    await user.save();

    return `Movie with ID ${movieId} removed from watchlist successfully`;
  }

  async markAsWatched(movieId, userId): Promise<string> {
    const movie = await this.movieModel.findById(movieId);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not authorized');
    }

    if (user.watchedMovies.includes(movieId)) {
      throw new NotFoundException('Movie is already marked as watched');
    }

    user.watchedMovies.push(movieId);
    await user.save();

    return `Movie with ID ${movieId} marked as watched successfully`;
  }

  async getWatchedMovies(userId) {
    const user = await this.userModel.findById(userId).populate('watchedMovies');
    if (!user) {
      throw new UnauthorizedException('User not authorized');
    }

    return user.watchedMovies;
  }

  async removeFromWatched(movieId, userId): Promise<string> {
    const movie = await this.movieModel.findById(movieId);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not authorized');
    }

    if (!user.watchedMovies.includes(movieId)) {
      throw new NotFoundException('Movie is not marked as watched');
    }

    user.watchedMovies = user.watchedMovies.filter((id) => id !== movieId);
    await user.save();

    return `Movie with ID ${movieId} removed from watched list successfully`;
  }
}
