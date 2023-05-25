import Stars from '@/app/components/Stars';
import { Review } from '@prisma/client';
import { calculateRivewRating } from 'utils/calculateReviewRating';

export default function Rating({ reviews }: { reviews: Review[] }) {
  return (
    <div className="flex items-end">
      <div className="rating mt-2 flex items-center">
        <Stars reviews={reviews} />
        <p className="text-reg ml-3">
          {calculateRivewRating(reviews).toFixed(1)}
        </p>
      </div>
      <div className="text-reg ml-4">
        {reviews.length} Review{reviews.length === 1 ? '' : 's'}
      </div>
    </div>
  );
}
