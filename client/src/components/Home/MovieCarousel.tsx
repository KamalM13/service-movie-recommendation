import { Eye, Heart } from 'lucide-react'
import { Card, CardContent } from "../../components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel"
import { Link } from 'react-router-dom'
import { Movie } from '../../pages/Movie/[id]/page'



interface MovieCarouselProps {
  title: string
  movies: Movie[]
}

export function MovieCarousel({ title, movies }: MovieCarouselProps) {
  return (
    <section className="p-8 bg-neutral-900">
      <div className="container">
        <h2 className="mb-6 text-2xl font-bold">{title}</h2>
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {movies.map((movie) => (
              <CarouselItem key={movie._id} className="pl-2 md:pl-4 md:basis-1/4 lg:basis-1/5">
                <Card className="border-0 rounded-[10px]">
                  <CardContent className="p-0">
                    <Link to={`/movie/${movie._id}`}>
                      <div className="group relative overflow-hidden ">
                        <img
                          src={movie.imageUrl}
                          alt={movie.title}
                          width={300}
                          height={450}
                          className="aspect-[2/3] h-auto w-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 opacity-0 transition-opacity group-hover:opacity-100">
                          <h3 className="text-center text-lg font-bold text-white">{movie.title}</h3>
                          <div className="flex items-center space-x-4 text-white">
                            <span className="flex items-center">
                              <Eye className="mr-1 h-4 w-4" />
                              {movie.views || 0}
                            </span>
                            <span className="flex items-center">
                              <Heart className="mr-1 h-4 w-4" />
                              {movie.likedBy.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute bg-neutral-800 border-gray-200 top-1/2 left-2 transform -translate-y-1/2 sm:left-2" />
          <CarouselNext className="absolute bg-neutral-800 border-gray-200 top-1/2 right-2 transform -translate-y-1/2 sm:right-2" />
        </Carousel>
      </div>
    </section>
  )
}

