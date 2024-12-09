'use client';

import HeroSection from '@/components/ui/HeroSection';
import BottomBar from '@/components/ui/bottom_bar';
import SelectRegion from '@/components/ui/select_region';
import ProductCard from '@/components/ui/products_card';
import { useEffect, useState } from 'react';
import userRegion from '@/utils/region';
import TopBar from '@/components/ui/top_bar';


const MainPage = () => {
  const region = userRegion((state) => state.region);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/v1/fetch-books/');
        const jsonData = await response.json();
        setBooks(jsonData);
      } catch (error) {
        console.log('An error occurred', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <TopBar />
      <HeroSection />
      <div className='h-[1px] bg-gray-600'></div>

      
      {/* Main content with flex-grow to prevent overlap */}
      <main className="flex-grow p-4 sm:p-6 md:p-8 bg-gray-900">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <span className="text-gray-500 inline-block animate-pulse">
                Loading Books...
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {books
              ?.sort((a, b) => b.serial - a.serial)
              ?.map((book) => (
                <ProductCard
                  key={book.serial}
                  coverImage={book.cover_img}
                  title={book.title}
                  price={region === 'India' ? book.price?.INR : book.price?.USD}
                  serial={book.serial}
                />
              ))}
          </div>
        )}
      </main>

      <SelectRegion />
      <BottomBar />
    </div>
  );
};

export default MainPage;

