import Link from 'next/link';
import { RestaurantCardType } from '@/app/page';
import Price from '@/app/components/Price';
import { calculateRivewRating } from '@/utils/calculateReviewRating';
import Stars from '@/app/components/Stars';

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: RestaurantCardType;
}) {
  const renderRatingText = () => {
    const rating = calculateRivewRating(restaurant.reviews);
    if (rating > 4) return 'Awesome';
    else if (rating <= 4 && rating > 3) return 'Excellent';
    else if (rating <= 3 && rating > 2) return 'Average';
    else if (rating <= 2 && restaurant.reviews.length) return 'Poor';
    else return 'No reviews';
  };

  return (
    <div className="border-b flex pb-5 ml-5">
      <img src={restaurant.main_image} alt="" className="w-44 h-36 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Stars reviews={restaurant.reviews} />
          </div>
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
}
