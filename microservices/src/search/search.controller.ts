import {
    Controller,
    Get,
    Query,
    Param,
    ValidationPipe,
  } from '@nestjs/common';
  import { SearchService, SearchOptions, FilterOptions } from './search.service';
  import { IsOptional, IsNumber, IsString, IsArray, IsBoolean } from 'class-validator';
  import { Transform } from 'class-transformer';
  
  // Base DTO for common properties
  class BaseQueryDto {
    @IsOptional()
    @IsString()
    sortBy?: string;
  
    @IsOptional()
    @IsString()
    sortOrder?: 'asc' | 'desc';
  }
  
  // DTO for text search
  class SearchQueryDto extends BaseQueryDto {
    @IsString()
    query: string;
  }
  
  // DTO for filtering
  class FilterQueryDto extends BaseQueryDto {
    @IsOptional()
    @IsString()
    query?: string;
  
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
    genres?: string[];
  
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value ? Number(value) : undefined)
    minRating?: number;
  
    @IsOptional()
    @IsString()
    language?: string;
  
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
    countries?: string[];
  
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
    cast?: string[];
  
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
    directors?: string[];
  
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    isTrending?: boolean;
  }
  
  @Controller('search')
  export class SearchController {
    constructor(private readonly searchService: SearchService) {}
  
    @Get('movies')
    async searchMovies(@Query(ValidationPipe) query: FilterQueryDto) {
      const { sortBy, sortOrder, query: searchQuery, ...filters } = query;
      const searchOptions: SearchOptions = { sortBy, sortOrder };
      const filterOptions: FilterOptions = filters;
  
      return this.searchService.searchMovies(searchQuery || '', searchOptions, filterOptions);
    }
  
    @Get('movies/trending')
    async getTrendingMovies(@Query(ValidationPipe) options: BaseQueryDto) {
      return this.searchService.getTrendingMovies(options);
    }
  
    @Get('movies/genre/:genre')
    async getMoviesByGenre(
      @Param('genre') genre: string,
      @Query(ValidationPipe) options: BaseQueryDto,
    ) {
      return this.searchService.getMoviesByGenre(genre, options);
    }
  }