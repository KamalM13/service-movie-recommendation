import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../../components/ui/carousel";
import { Image } from "../../types/image";


export default function CustomCarousel({
  images,
  width = 600,
  height = 400,
  withText = false,
}: {
  images: Image[];
  width?: number;
  height?: number;
  withText?: boolean;
}) {
  return (
    <Carousel
      className="rounded-md overflow-hidden "
      opts={{
        dragFree: true,
      }}
    >
      <CarouselContent className="flex">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="min-w-fit my-6 md:basis-1/3 lg:basis-1/6 basis-1/3  flex justify-center items-center relative cursor-pointer transition-opacity duration-300"
          >
            <Link
              to={image.link || "#"}
              className="flex flex-col rounded-lg"
            >
              <img
                src={image.src}
                width={width}
                height={height}
                alt={image.alt}
                className="object-cover aspect-square rounded-lg p-4"
              />
              {withText && (
                <h3 className="text-sm md:text-lg  flex justify-center mx-2">
                  {image.alt}
                </h3>
              )}
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && (
        <>
          <CarouselPrevious className="absolute bg-gray-200 border-gray-200 top-1/2 left-2 transform -translate-y-1/2 sm:left-2" />
          <CarouselNext className="absolute bg-gray-200 border-gray-200 top-1/2 right-2 transform -translate-y-1/2 sm:right-2" />
        </>
      )}
    </Carousel>
  );
}
