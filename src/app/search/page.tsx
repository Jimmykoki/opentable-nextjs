import Link from 'next/link';
import NavBar from '@/app/components/NavBar';
import Header from './components/Header';
import SearchSideBar from './components/SearchSideBar';
import RestaurantCard from './components/RestaurantCard';

export default function Search() {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl mx-auto bg-white">
        <NavBar />
        <Header />
        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          {/** SEARCH SIDE BAR */}
          <SearchSideBar />
          {/** SEARCH SIDE BAR */}
          <div className="w-5/6">
            {/** RESTAURANT CARD */}
            <RestaurantCard />
            {/** RESTAURANT CARD */}
          </div>
        </div>
      </main>
    </main>
  );
}
