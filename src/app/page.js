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
  const [filteredBooks, setFilteredBooks] = useState([]); // Store filtered books
  const [isLoading, setIsLoading] = useState(true); // Overall loading state
  const [categoryLoading, setCategoryLoading] = useState(false); // Category change loading state
  const [selectedCategory, setSelectedCategory] = useState('ambitious'); // Default category set to 'ambitious'

  // Fetch books from the API when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/v1/fetch-books/?t=${new Date().getTime()}`);
        const jsonData = await response.json();
        setBooks(jsonData);
        setFilteredBooks(
          jsonData.filter((book) => book.category.tabs.includes('ambitious')) // Default filter
        );
      } catch (error) {
        console.log('An error occurred', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on the selected category
  useEffect(() => {
    if (selectedCategory) {
      setCategoryLoading(true); // Start category loading animation
      const timeout = setTimeout(() => {
        const filtered = books.filter((book) =>
          book.category.tabs.includes(selectedCategory) // Filter based on category
        );
        setFilteredBooks(filtered);
        setCategoryLoading(false); // Stop category loading animation
      }, 500); // Delay to show the loader smoothly

      return () => clearTimeout(timeout); // Cleanup timeout on component unmount
    }
  }, [selectedCategory, books]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <TopBar />
      <HeroSection />
      <div className="h-[1px] bg-gray-600"></div>

      {/* Pass selectedCategory and setSelectedCategory to CategoryBar */}
      <CategoryBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main content */}
      <main className="flex-grow p-4 sm:p-6 md:p-8 bg-gray-900">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <span className="text-gray-500 inline-block animate-pulse">
                Loading Books...
              </span>
            </div>
          </div>
        ) : categoryLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center justify-center">
              <div className="w-7 h-7 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-400 animate-pulse">Showing Up...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredBooks
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
