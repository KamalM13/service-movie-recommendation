import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { Movie } from '../movie/entities/movie.entity';

export interface SearchOptions {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterOptions {
  genres?: string[];
  releaseYear?: number | { start: number; end: number };
  minRating?: number;
  language?: string;
  countries?: string[];
  cast?: string[];
  directors?: string[];
  isTrending?: boolean;
  hidden?: boolean;
}

@Injectable()
export class SearchService {
  constructor(@InjectModel('Movie') private readonly movieModel: Model<Movie>) {}

  private buildSortOptions(options: SearchOptions): { [key: string]: SortOrder } {
    const sortField = options.sortBy || 'releaseDate';
    const sortOrder = options.sortOrder === 'asc' ? 1 : -1;
    return { [sortField]: sortOrder };
  }

  private buildQuery(criteria: any, options: SearchOptions = {}) {
    const sort: { [key: string]: SortOrder } = this.buildSortOptions(options);
    return this.movieModel
      .find(criteria)
      .sort(sort)
      .select('-reviews -likedBy -addedToWatchlistBy');
  }

  async searchMovies(
    query: string,
    options: SearchOptions = {},
    filters: FilterOptions = {},
  ): Promise<Movie[]> {
    const searchCriteria: any = {
      $and: [
        {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { tagline: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
          ],
        },
      ],
    };

    if (filters.genres?.length) {
      searchCriteria.$and.push({ genres: { $in: filters.genres } });
    }

    if (filters.releaseYear) {
      if (typeof filters.releaseYear === 'number') {
        searchCriteria.$and.push({
          releaseDate: {
            $gte: new Date(filters.releaseYear, 0, 1),
            $lt: new Date(filters.releaseYear + 1, 0, 1),
          },
        });
      } else {
        searchCriteria.$and.push({
          releaseDate: {
            $gte: new Date(filters.releaseYear.start, 0, 1),
            $lt: new Date(filters.releaseYear.end + 1, 0, 1),
          },
        });
      }
    }

    if (filters.minRating) {
      searchCriteria.$and.push({ averageRating: { $gte: filters.minRating } });
    }

    if (filters.language) {
      searchCriteria.$and.push({ language: filters.language });
    }

    if (filters.countries?.length) {
      searchCriteria.$and.push({ countries: { $in: filters.countries } });
    }

    if (filters.cast?.length) {
      searchCriteria.$and.push({ cast: { $in: filters.cast } });
    }

    if (filters.directors?.length) {
      searchCriteria.$and.push({ directors: { $in: filters.directors } });
    }

    if (filters.isTrending !== undefined) {
      searchCriteria.$and.push({ isTrending: filters.isTrending });
    }

    if (filters.hidden !== undefined) {
      searchCriteria.$and.push({ hidden: filters.hidden });
    }

    return this.buildQuery(searchCriteria, options).exec();
  }

  async getTrendingMovies(options: SearchOptions = {}): Promise<Movie[]> {
    return this.buildQuery({ isTrending: true }, options).exec();
  }

  async getMoviesByGenre(genre: string, options: SearchOptions = {}): Promise<Movie[]> {
    return this.buildQuery({ genres: genre }, options).exec();
  }
}