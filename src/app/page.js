'use client';

import SelectRegion from '@/components/ui/select_region';
import ProductCard from '@/components/ui/products_card';
import { useEffect, useState } from 'react';
import userRegion from '@/utils/region';

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
      <header className="bg-gray-900 w-full p-3 border-b border-gray-700 flex items-center min-h-[60px]">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-pink-500 ml-4 sm:ml-6">FlexMood</h1>
      </header>

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

      <footer className="bg-gray-900 border-t border-gray-700 p-3 min-h-[40px] flex items-center justify-center">
        <p className="text-gray-400 text-sm">&copy; 2024 Flexmood. All rights reserved.</p>
        <SelectRegion />
      </footer>
    </div>
  );
};

export default MainPage;
