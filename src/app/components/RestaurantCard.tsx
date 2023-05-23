import Link from 'next/link';

export default function RestaurantCard() {
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href="/restaurant/milestone-grill">
        <img src="" alt="" className="w-full h-36" />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">Miltstone Grill</h3>
          <div className="flex items-start">
            <div className="flex mb-2">****</div>
            <p className="ml-2">77 reviews</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">Maxican</p>
            <p className="mr-3">$$$</p>
            <p className="">Toronto</p>
          </div>
          <p className="text-sm mt-1 font-bold">Book 3 times today</p>
        </div>
      </Link>
    </div>
  );
}
