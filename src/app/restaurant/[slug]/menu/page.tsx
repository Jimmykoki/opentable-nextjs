import { Item, PrismaClient } from '@prisma/client';
import Header from '../components/Header';
import Menu from '../components/Menu';
import RestaurantNavBar from '../components/RestaurantNavBar';

const prisma = new PrismaClient(); // instantiate the PrismaClient

const fectchRestaurantMenu = async (slug: string): Promise<Item[]> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });
  if (!restaurant) {
    throw new Error('Restaurant not found');
  }
  return restaurant.items;
};

export default async function RestaurantMenu({
  params,
}: {
  params: { slug: string };
}) {
  const menu = await fectchRestaurantMenu(params.slug);
  console.log({ menu });
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavBar slug={params.slug} />
        <Menu menu={menu} />
      </div>
    </>
  );
}
