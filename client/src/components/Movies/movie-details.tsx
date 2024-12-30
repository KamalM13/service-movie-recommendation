import { Badge } from "../../components/ui/badge";
import { Star } from "lucide-react";
import { Movie } from "../../pages/Movie/[id]/page";

export function MovieDetails({ movie }: { movie: Movie }) {

  return (
    <div className="flex flex-col md:flex-row gap-8 mb-12 animate-fade-in">
      <div className="w-full md:w-1/3">
        <div className="relative group">
          <img
            src={movie.imageUrl}
            alt={movie.title}
            width={500}
            height={600}
            className="rounded-[10px] shadow-lg object-cover h-auto transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-lg font-bold">Watch Now</span>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/3">
        <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
        <div className="flex items-center mb-4 text-gray-400">
          <span className="mr-4">{movie.releaseDate}</span>
          <span className="mr-4">{movie.duration}</span>
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
            <span>{movie.averageRating}/10</span>
          </div>
        </div>
        <p className="mb-4 text-gray-300">Directed by 
          {
            movie.directors.map((director, index) => (
              <span key={director}>
                {index > 0 && ", "}
                {director}
              </span>
            ))
          }
        </p>
        <p className="mb-6 text-gray-200 leading-relaxed">
          {movie.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genres.map((genre) => (
            <Badge
              key={genre}
              variant="secondary"
              className="bg-neutral-700 text-white hover:bg-neutral-600"
            >
              {genre}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
