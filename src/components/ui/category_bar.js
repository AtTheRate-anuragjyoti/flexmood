'use client';
import React, { useState } from 'react';

const CategoryBar = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    {
      id: 'all',
      label: 'All',
      gradient: 'from-red-900 via-red-800 to-red-700'
    },
    {
      id: 'students',
      label: 'For Students',
      gradient: 'from-purple-900 via-purple-800 to-purple-700'
    },
    {
      id: 'ambitious',
      label: 'For Ambitious',
      gradient: 'from-green-900 via-green-800 to-green-700'
    }
  ];

  return (
    <div className="flex w-full">
      {categories.map((category) => (
        <button 
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`
            w-1/3 
            px-4 
            py-3 
            text-sm 
            md:text-base 
            font-semibold 
            text-white 
            bg-gradient-to-r 
            ${category.gradient}
            ${activeCategory === category.id ? 'opacity-100' : 'opacity-40'}
            focus:outline-none 
            transition 
            duration-300 
          `}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;