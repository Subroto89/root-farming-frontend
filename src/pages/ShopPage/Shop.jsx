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
    <div className="min-h-screen py-8 max-w-7xl mx-auto">
      <div className="">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Marketplace</h1>
        <p className="text-xl text-gray-600 mb-6">
          Fresh produce from trusted farmers.
        </p>

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

        <div
          className={
            viewMode === 'grid'
              ? 'grid md:grid-cols-2 lg:grid-cols-4 gap-8'
              : 'space-y-6'
          }
        >
          {products.length ? (
            products.map(p => (
              <ProductCard key={p._id} product={p} viewMode={viewMode} />
            ))
          ) : (
            <div className="text-center py-12">
              <Filter className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p>No products found for your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
