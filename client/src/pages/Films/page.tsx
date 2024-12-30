import { useEffect, useState } from "react";
import { BrowseBySection } from "../../components/Films/browse-by-section";
import { SearchSection } from "../../components/Films/search-section";
import { MovieCarousel } from "../../components/Home/MovieCarousel";
import { Movie } from "../Movie/[id]/page";
import axios from "axios";

// Mock data for movies
export default function FilmsPage() {
  const [films, setFilms] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get("/movie");
        setFilms(response.data);

        const horrorMovies = response.data.filter((movie: Movie) =>
          movie.genres.includes("Horror")
        );

        setHorrorMovies(horrorMovies);

        const comedyMovies = response.data.filter((movie: Movie) =>
          movie.genres.includes("Comedy")
        );

        setComedyMovies(comedyMovies);
      } catch (error) {
        console.error("Error fetching films", error);
      }
    };

    fetchFilms();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black text-white py-12">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Films</h1>
        <BrowseBySection />
        <SearchSection />
        <MovieCarousel title="Popular Movies" movies={films} />
        <MovieCarousel title="Horror Movies" movies={horrorMovies} />
        <MovieCarousel title="Comedy Movies" movies={comedyMovies} />
      </main>
    </div>
  );
}
