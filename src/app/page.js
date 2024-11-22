'use client';

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
    <div className="flex flex-col h-screen bg-gray-900 text-white">

      <TopBar />

      <main className="p-7 bg-gray-900 h-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-400 text-lg">Loading books...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books
              ?.sort((a, b) => b.serial - a.serial)
              ?.map((book) => (
                <div key={book.serial} className="flex items-center justify-center">
                  <ProductCard
                    coverImage={book.cover_img}
                    title={book.title}
                    price={region === 'India' ? book.price?.INR : book.price?.USD}
                    purchaseLink={book.purchase_link}
                    serial={book.serial}
                  />
                </div>
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
