import Header from './components/Header';
import SearchSideBar from './components/SearchSideBar';
import RestaurantCard from './components/RestaurantCard';
import { PRICE, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export interface Region {
  name: string;
}
export interface Cuisine {
  name: string;
}
interface SearchParams {
  location?: string;
  cuisine?: string;
  price?: PRICE;
}

const fetchRestaurantByLocation = (searchParams: SearchParams) => {
  const where: any = {};

  if (searchParams.location) {
    const location = {
      name: {
        equals: searchParams.location.toLowerCase(),
      },
    };
    where.location = location;
  }
  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    };
    where.cuisine = cuisine;
  }
  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
    reviews: true,
  };

  return prisma.restaurant.findMany({
    where,
    select,
  });
};

const fetchRegion = async (): Promise<Region[]> => {
  const regions = await prisma.location.findMany({
    select: {
      name: true,
    },
  });
  return regions;
};

const fetchCuisine = async (): Promise<Cuisine[]> => {
  const cuisines = await prisma.cuisine.findMany({
    select: {
      name: true,
    },
  });
  return cuisines;
};

export default async function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const restaurants = await fetchRestaurantByLocation(searchParams);
  console.log(searchParams);
  const regions = await fetchRegion();
  const cuisines = await fetchCuisine();
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        {/** SEARCH SIDE BAR */}
        <SearchSideBar
          regions={regions}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        {/** SEARCH SIDE BAR */}
        <div className="w-5/6">
          {/** RESTAURANT CARD */}
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <p className="test-light font-bold text-2xl">
              Sorry, No restaurants found in this area
            </p>
          )}
          {/** RESTAURANT CARD */}
        </div>
      </div>
    </>
  );
}
