import { PRICE } from '@prisma/client';
import Link from 'next/link';
import { Region, Cuisine } from '../page';

export default function SearchSideBar({
  regions,
  cuisines,
  searchParams,
}: {
  regions: Region[];
  cuisines: Cuisine[];
  searchParams: { location?: string; cuisine?: string; price?: PRICE };
}) {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: '$$',
      className: 'border w-full text-reg text-center font-light rounded-l p-2',
    },
    {
      price: PRICE.REGULAR,
      label: '$$$',
      className: 'border w-full text-reg text-center font-light p-2',
    },
    {
      price: PRICE.EXPENSIVE,
      label: '$$$$',
      className: 'border w-full text-reg text-center font-light rounded-r p-2',
    },
  ];
  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {regions.map((region) => (
          <Link
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                location: region.name,
              },
            }}
            className="font-light text-reg capitalize"
          >
            {region.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                cuisine: cuisine.name,
              },
            }}
            className="font-light text-reg capitalize"
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({ price, label, className }) => (
            <Link
              href={{
                pathname: '/search',
                query: {
                  ...searchParams,
                  price,
                },
              }}
              className={className}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
