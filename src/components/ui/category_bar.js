'use client';

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
    setSelectedCategory(categoryId); // Update the state in the parent component
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
            text-xs
            sm:text-sm
            md:text-base
            lg:text-lg
            font-serif
            text-white
            bg-gradient-to-r
            ${category.gradient}
            relative
            ${selectedCategory === category.id ? 'opacity-100' : 'opacity-90'}
            focus:outline-none
            transition-opacity
            duration-300
            ease-in-out
            whitespace-nowrap
            overflow-hidden
            ${
              selectedCategory !== category.id
                ? 'after:absolute after:inset-0 after:bg-black/60 after:z-10'
                : ''
            }
          `}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
