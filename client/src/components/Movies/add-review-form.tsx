'use client'

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Textarea } from "../../components/ui/textarea"
import { Star } from 'lucide-react'

export function AddReviewForm({ movieId }: { movieId: string }) {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the review to your backend
    console.log({ movieId, rating, review })
    // Reset form
    setRating(0)
    setReview("")
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Add Your Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Your Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${
                  star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400 hover:text-yellow-200"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="review" className="block mb-2">Your Review</label>
          <Textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            className="bg-neutral-800 text-white border-neutral-700 focus:border-neutral-500"
            rows={4}
          />
        </div>
        <Button type="submit" className="bg-green-500 text-white hover:bg-green-600 transition-colors duration-300">
          Submit Review
        </Button>
      </form>
    </div>
  )
}

