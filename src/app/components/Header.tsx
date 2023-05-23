'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [location, setLocation] = useState('');
  const router = useRouter();
  return (
    <div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2">
      <div className="text-center mt-10">
        <h1 className="text-white text-5xl font-bold mb-2">
          Find your table for any occasion
        </h1>
        {/* SEARCH BAR */}
        <div className="text-left py-3 m-auto flex justify-center">
          <input
            type="text"
            className="rounded text-lg mr-3 p-2 w-[450px]"
            placeholder="Location, Restaurant, or Cuisine"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            className="rounded bg-red-600 px-9 py-2 text-white"
            onClick={() => {
              if (location === 'banana') return;
              router.push(`/search?location=${location}`);
            }}
          >
            Let's go
          </button>
        </div>
        {/* SEARCH BAR */}
      </div>
    </div>
  );
}
