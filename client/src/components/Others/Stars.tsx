import React from 'react';
import { Star } from 'lucide-react'; // Importing the Star icon

interface StarsProps {
  rating: number; // Current rating
  onRatingChange: (rating: number) => void; // Function to handle rating change
}

const Stars: React.FC<StarsProps> = ({ rating, onRatingChange }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className={`w-8 h-8 flex items-center justify-center cursor-pointer ${
            star <= rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
        >
          <Star size={24} />
        </button>
      ))}
    </div>
  );
};

export default Stars;
