import React from 'react';
import StatsCounter from './StatsCounter';

const FeaturedShowcase = ({ marketplaceImage, farmersImage }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      {/* Marketplace Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <img
          src={marketplaceImage}
          alt="Agricultural Marketplace"
          className="w-full h-[480px] object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-green-800/70 via-transparent to-transparent"></div>
        <div className="absolute bottom-6 left-6 text-white">
          <h3 className="text-2xl font-bold mb-2">Smart Marketplace</h3>
          <p className="text-white/90 mb-3">
            Connect directly with consumers and businesses through our
            intelligent marketplace.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              Real-time Pricing
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              Quality Ratings
            </span>
          </div>
        </div>
      </div>

      {/* Farmer Success Section */}
      <div className="space-y-10">
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <img
            src={farmersImage}
            alt="Successful Farmers"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-700/80 to-transparent"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Success Stories</h3>
              <p className="text-white/90 text-sm">
                Meet farmers who transformed their lives with our platform.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-10">
          <StatsCounter />
        </div>
      </div>
    </div>
  );
};

export default FeaturedShowcase;
