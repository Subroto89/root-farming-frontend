import React from "react";
import { Grid, List, Search, RefreshCcw } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const Filters = ({
  search,
  setSearch,
  category,
  setCategory,
  viewMode,
  setViewMode,
  sort,
  setSort,
  categories,
  onReset,
}) => {
  const { theme } = useTheme();
  
  const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
  const themeFgOfFgStyle =
    theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";

  return (
    <div
      className={`${themeForegroundStyle} rounded-2xl shadow-lg p-6 mb-8 transition-all duration-300`}
    >
      {/* Filters Row */}
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-6 items-end">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Search Products
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, farmers, or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${themeFgOfFgStyle} w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${themeFgOfFgStyle} w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium mb-2">Sort By</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={`${themeFgOfFgStyle} w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>

        {/* View Mode */}
        <div>
          <label className="block text-sm font-medium mb-2">View</label>
          <div className="flex bg-gray-100 rounded-lg py-2 px-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex-1 py-2 px-3 rounded-md transition-colors flex items-center justify-center ${
                viewMode === "grid"
                  ? "bg-white text-green-600 shadow"
                  : "text-gray-600"
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex-1 py-2 px-3 rounded-md transition-colors flex items-center justify-center ${
                viewMode === "list"
                  ? "bg-white text-green-600 shadow"
                  : "text-gray-600"
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
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition"
          >
            <RefreshCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
