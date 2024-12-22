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
  const [categoryLoading, setCategoryLoading] = useState(false); // Category change loading state
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial page load
  const [selectedCategory, setSelectedCategory] = useState('ambitious'); // Default category set to 'ambitious'

  // Fetch books from the API when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`/api/v1/fetch-books/`);
        const jsonData = await response.json();
        setBooks(jsonData);
        setFilteredBooks(
          jsonData.filter((book) => book.category.tabs.includes('ambitious')) // Default filter
        );
        setIsInitialLoad(false); // Mark initial load as complete
      } catch (error) {
        console.log('An error occurred', error);
        setIsInitialLoad(false); // Ensure loader is removed even if fetch fails
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

  // Determine if loader should be shown
  const showLoader = isInitialLoad || categoryLoading;

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
        {showLoader ? (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredBooks
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