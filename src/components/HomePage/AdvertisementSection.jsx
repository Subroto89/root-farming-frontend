import React from 'react';
import { useProducts } from '../../allProductsApi/UseProducts';
import AdvertiseCard from '../shopComponents/AdvertiseCard';

const AdvertisementSection = () => {
  const { data: products = [], isLoading } = useProducts({});
  const featured = products.slice(0, 4);

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-32">
        <p className="text-lg text-gray-600 animate-pulse">Loading ads...</p>
      </div>
    );

  return (
    <div className="bg-gray-50 md:py-24 flex items-center overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Advertisement — Featured Products
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our top-rated agricultural products that make farming
            smarter, easier, and more profitable.
          </p>
        </div>

        {/* Grid Layout */}
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {featured.map(product => (
              <AdvertiseCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 text-lg mt-10">
            No advertisements available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertisementSection;
