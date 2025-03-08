'use client';

import localFont from "next/font/local";
import { useRouter } from "next/navigation";

const ebGaramond = localFont({ src: './EBGaramond.ttf' });

const CategoryBar = ({ onCategoryChange }) => {
  const router = useRouter();

  const categories = [
    {
      id: 'vault',
      label: 'Flexmood Vault',
      gradient: 'from-red-900 via-red-800 to-red-700',
    },
    {
      id: 'courses',
      label: 'Courses',
      gradient: 'from-purple-900 via-purple-800 to-purple-700',
    },
    {
      id: 'merchandise',
      label: 'Merchandise',
      gradient: 'from-green-900 via-green-800 to-green-700',
    },
  ];

  const handleCategoryClick = (categoryId) => {
    onCategoryChange(categoryId);
  };

  return (
    <div className="flex w-full gap-2 p-2 bg-[#181e2c]">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`
            flex-1
            flex
            items-center
            justify-center
            px-6
            py-2
            text-[15px]
            sm:text-sm
            md:text-base
            lg:text-xl
            font-serif
            rounded-full
            relative
            transition-all
            duration-500
            ease-in-out
            bg-gradient-to-r
            ${category.gradient}
            whitespace-nowrap
            overflow-hidden
            ${ebGaramond.className}
            text-white
          `}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
