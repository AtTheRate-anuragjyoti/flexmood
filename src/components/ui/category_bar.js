'use client';

import localFont from "next/font/local";

const ebGaramond = localFont({ src: './EBGaramond.ttf' });

const CategoryBar = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    {
      id: 'ambitious',
      label: 'For Ambitious',
      gradient: 'from-red-900 via-red-800 to-red-700',
    },
    {
      id: 'developers',
      label: 'For Developers',
      gradient: 'from-purple-900 via-purple-800 to-purple-700',
    },
    {
      id: 'students',
      label: 'For Students',
      gradient: 'from-green-900 via-green-800 to-green-700',
    },
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="flex w-full">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`
            flex-1
            px-4
            py-3
            text-[15px]
            sm:text-sm
            md:text-base
            lg:text-xl
            font-serif
            text-white
            bg-gradient-to-r
            ${category.gradient}
            relative
            transition-all
            duration-500
            ease-in-out
            whitespace-nowrap
            overflow-hidden
            ${ebGaramond.className}
            ${selectedCategory === category.id 
              ? 'opacity-100 shadow-md shadow-black/30' 
              : 'opacity-40'}
          `}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;