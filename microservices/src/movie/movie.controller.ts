import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get('single/:id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }

  @Get('like')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async checkIfLiked(@Req() req) {
    const userId = req.user.userId;
    console.log(userId);
    return this.movieService.getLikedMovies(userId);
  }

  @Post('like/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async likeMovie(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId;
    return this.movieService.likeMovie(id, userId);
  }

  @Delete('like/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async unlikeMovie(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId;
    return this.movieService.unlikeMovie(id, userId);
  }

  @Get('watchlist')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async checkIfInWatchlist(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId;
    return this.movieService.getWatchlist(userId);
  }

  @Post('watchlist/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async addToWatchlist(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId;
    return this.movieService.addToWatchlist(id, userId);
  }

  @Delete('watchlist/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async removeFromWatchlist(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId;
    return this.movieService.removeFromWatchlist(id, userId);
  }

  @Get('watched')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async getWatchlist(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId;
    return this.movieService.getWatchedMovies(userId);
  }

  @Post('watched/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async markAsWatched(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId;
    return this.movieService.markAsWatched(id, userId);
  }

  @Delete('watched/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async removeFromWatched(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId;
    return this.movieService.removeFromWatched(id, userId);
  }

  @Post('addPreference/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async addPreference(@Req() req, @Param('id') movieId: string) {
    const userId = req.user.userId;
    return this.movieService.addPreference(userId, movieId);
  }
}
