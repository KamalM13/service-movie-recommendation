import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Star } from 'lucide-react'

export interface Review {
  _id: string
  author: string
  avatar: string
  rating: number
  content: string
  date: string
}

const mockReviews: Review[] = [
  {
    _id: "1",
    author: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    content: "A mind-bending masterpiece that keeps you on the edge of your seat!",
    date: "2023-06-15"
  },
  {
    _id: "2",
    author: "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    content: "Incredible visuals and a complex plot. Nolan at his best.",
    date: "2023-06-10"
  },
  
]

export function PopularReviews({ movieId }: { movieId: string }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Popular Reviews</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {mockReviews.map((review) => (
          <Card key={review._id} className="bg-neutral-800 hover:bg-neutral-700 transition-colors duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={review.avatar} alt={review.author} />
                <AvatarFallback>{review.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg text-white">{review.author}</CardTitle>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">{review.date}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200">{review.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

