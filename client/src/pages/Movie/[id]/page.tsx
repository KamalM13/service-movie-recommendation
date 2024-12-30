import { useParams } from "react-router-dom";
import { AddReviewForm } from "../../../components/Movies/add-review-form";
import { MovieDetails } from "../../../components/Movies/movie-details";
import { MoviePlayer } from "../../../components/Movies/movie-player";
import {
  PopularReviews,
  Review,
} from "../../../components/Movies/popular-reviews";
import { useEffect, useState } from "react";
import axios from "axios";

export interface Movie {
  _id: string;
  title: string;
  releaseDate: number;
  directors: string[];
  writers: string[];
  cast: string[];
  description: string;
  genres: string[];
  views: number;
  videoUrl: string;
  imageUrl: string;
  duration: string;
  reviews: Review[];
  likedBy: string[];
  addedToWatchlistBy: string[];
  totalRatings: number;
  averageRating: number;
  ratingsBreakdown: number[];
  countries: string[];
  isTrending: boolean;
  hidden: boolean;
  createdAt: string;
}
export default function MoviePage() {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie>();
  if (!id) return null;

  useEffect(() => {
    const fetchMovie = async (id: string) => {
      try {
        const response = await axios.get(
          `/movie/single/${id}`
        );

        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie", error);
      }
    };

    fetchMovie(id);
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black text-white p-8 py-16">
      <main className="container mx-auto px-4 py-8">
        {movie && (
          <>
            <MovieDetails movie={movie} />
            <MoviePlayer videoUrl={movie.videoUrl} />
            <PopularReviews movieId={movie._id} />
            <AddReviewForm movieId={movie._id} />
          </>
        )}
      </main>
    </div>
  );
}
