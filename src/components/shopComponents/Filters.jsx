import React from 'react';
import { Grid, List, Search, RefreshCcw } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const Filters = ({
  search,
  setSearch,
  category,
  setCategory,
  location,
  setLocation,
  viewMode,
  setViewMode,
  sort,
  setSort,
  categories,
  locations,
  onReset,
}) => {
  const {theme} = useTheme();
  
      const themeBackgroundStyle = theme === 'dark' ? "bg-dark" : "bg-light";
      const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
      const themeFgOfFgStyle = theme === 'dark' ? "fg-of-fg-dark" : "fg-of-fg-light";
     
  return (
    <div className={`${themeForegroundStyle} rounded-2xl shadow-lg p-6 mb-8`}>
      <div className="grid lg:grid-cols-6 gap-6 items-end">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Search Products
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products, farmers, or keywords..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`${themeFgOfFgStyle} w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className={`${themeFgOfFgStyle} w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            {categories?.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Location
          </label>
          <select
            value={location}
            onChange={e => setLocation(e.target.value)}
            className={`${themeFgOfFgStyle} w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode */}
        <div>
          <label className="block text-sm font-medium mb-2">
            View
          </label>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex-1 py-2 px-3 rounded-md transition-colors flex items-center justify-center ${
                viewMode === 'grid'
                  ? 'bg-white text-green-600 shadow'
                  : 'text-green-600'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 py-2 px-3 rounded-md transition-colors flex items-center justify-center ${
                viewMode === 'list'
                  ? 'bg-whtie text-green-600 shadow'
                  : 'text-gray-600'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 py-3 px-4 rounded-lg transition"
          >
            <RefreshCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Sort */}
      <div className="flex flex-col sm:flex-row justify-end items-center mt-6 pt-6 border-t border-gray-200">
        {/* <div className="text-gray-600 mb-4 sm:mb-0">
          Showing filtered products
        </div> */}
        <div className="flex items-center space-x-4 ">
          <span>Sort by:</span>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className={`${themeFgOfFgStyle} py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
