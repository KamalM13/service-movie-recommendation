import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { MovieService } from 'src/movie/movie.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RecommendationService {
  constructor(
    private readonly usersService: UserService,
    private readonly moviesService: MovieService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async generateRecommendations(userId: string): Promise<void> {
    const user = await this.usersService.findOne({ id: userId });

    if (!user) throw new Error('User not found.');

    const preferredGenres = user.preferences;

    const recommendedMovies = await this.moviesService.findMoviesByGenres(preferredGenres);

    if(recommendedMovies.length === 0) throw new Error('No movies found for the user preferences.');

    const supabase = this.supabaseService.getClient();

    const recommendations = recommendedMovies.map((movie) => ({
      user_id: userId,
      movie_id: movie._id.toString(),
      score: movie.averageRating,
    }));

    const { error } = await supabase.from('recommendations').insert(recommendations);

    if (error) throw new Error(`Failed to insert recommendations: ${error.message}`);
  }

  async getRecommendations(userId: string): Promise<any[]> {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('recommendations')
      .select('*')
      .eq('user_id', userId)
      .order('score', { ascending: false });

    if (error) throw new Error(`Failed to fetch recommendations: ${error.message}`);

    return data;
  }
}
