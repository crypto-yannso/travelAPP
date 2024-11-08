import React from 'react';
import { Star } from 'lucide-react';

interface RatingInputProps {
  rating: number;
  onChange: (rating: number) => void;
}

export default function RatingInput({ rating, onChange }: RatingInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        <Star className="inline-block w-4 h-4 mr-2" />
        Note globale
      </label>
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className={`p-2 rounded-full transition-colors ${
              rating >= value ? 'text-yellow-400' : 'text-gray-400'
            }`}
          >
            <Star className="w-6 h-6" fill={rating >= value ? 'currentColor' : 'none'} />
          </button>
        ))}
      </div>
    </div>
  );
}