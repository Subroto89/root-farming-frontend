import React from 'react';

const BlogCategories = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogCategories;
