import axios from "axios";
import { useState, useEffect } from "react";
import { FeaturesSection } from "../components/Home/FeaturesSection";
import { HeroSection } from "../components/Home/HeroSection";
import { MovieCarousel } from "../components/Home/MovieCarousel";
import { Movie } from "./Movie/[id]/page";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get("/movie");

        const popularMovies = response.data.filter(
          (movie: Movie) => movie.isTrending
        );

        setPopularMovies(popularMovies);
      } catch (error) {
        console.error("Error fetching films", error);
      }
    };

    fetchFilms();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <FeaturesSection />
        <MovieCarousel
          title="Popular Reviews This Week"
          movies={popularMovies}
        />
        <MovieCarousel title="Recommended For You" movies={popularMovies} />
      </main>
    </div>
  );
}
