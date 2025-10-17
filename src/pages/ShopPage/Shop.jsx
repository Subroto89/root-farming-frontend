import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { useProducts } from '../../allProductsApi/UseProducts';
import { useCategories, useLocations } from '../../allProductsApi/UseFilters';
import Filters from '../../components/shopComponents/Filters';
import ProductCard from '../../components/shopComponents/ProductCard';

const Shop = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [sort, setSort] = useState('featured');

  const { data: products = [], refetch } = useProducts({
    search,
    category,
    location,
    sort,
  });

  const { data: categories = ['All'] } = useCategories();
  const { data: locations = ['All'] } = useLocations();

  // ✅ Reset filters
  const handleReset = () => {
    setSearch('');
    setCategory('All');
    setLocation('All');
    setSort('featured');
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-16">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 text-center sm:text-left px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Shop Now
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
          Fresh produce from trusted farmers — buy locally and grow sustainably.
        </p>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto mb-10 px-4 sm:px-6 lg:px-8">
        <Filters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          location={location}
          setLocation={setLocation}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sort={sort}
          setSort={setSort}
          categories={categories}
          locations={locations}
          onReset={handleReset}
        />
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {products.length ? (
          <div
            className={`${
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8'
                : 'space-y-6'
            }`}
          >
            {products.map(p => (
              <ProductCard key={p._id} product={p} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700">
            <Filter className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No products found for your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
