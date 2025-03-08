'use client';
import { useEffect, useState } from 'react';
import HeroSection from '@/components/ui/HeroSection';
import BottomBar from '@/components/ui/bottom_bar';
import SelectRegion from '@/components/ui/select_region';
import ProductCard from '@/components/ui/products_card';
import TopBar from '@/components/ui/top_bar';
import CategoryBar from '@/components/ui/category_bar';
import userRegion from '@/utils/region';

const MainPage = () => {
  const region = userRegion((state) => state.region);
  const [books, setBooks] = useState([]); // Store all books
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [selectedCategory, setSelectedCategory] = useState('vault');

  // Fetch books from the API when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/v1/fetch-books/`);
        const jsonData = await response.json();
        setBooks(jsonData);
      } catch (error) {
        console.log('An error occurred', error);
      } finally {
        setIsLoading(false); // Ensure loader is removed even if fetch fails
      }
    };

    fetchBooks();
  }, [selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <TopBar />
      <HeroSection />
      <div className="h-[1px] bg-gray-600"></div>

      <CategoryBar onCategoryChange={setSelectedCategory} />

      {/* Main content */}
      <main className="flex-grow p-4 sm:p-6 md:p-8 bg-gray-900">
        {isLoading ? (
          <div className="flex justify-center items-center h-full w-full min-h-[30vh]">
            <div 
              className="w-12 h-12 border-4 rounded-full animate-spin" 
              style={{
                borderColor: '#ED155D transparent #ED155D transparent',
                borderWidth: '4px'
              }}
            ></div>
          </div>
        ) : (
          <div id='vault' className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {books
              ?.sort((a, b) => a.dynamic_serial - b.dynamic_serial)
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
