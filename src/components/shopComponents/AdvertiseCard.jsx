import React from 'react';
import { ShoppingCart, Star, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';

const AdvertiseCard = ({ product, themeForegroundStyle }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${themeForegroundStyle}  rounded-xl shadow-lg hover:shadow-xl 
      transition-all duration-300 overflow-hidden group flex flex-col h-full`}
      data-aos="zoom-in"
      data-aos-duration="900"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden w-full h-56">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />

        {/* Labels */}
        <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          Advertised
        </div>

        <div className="absolute top-3 right-3 bg-white text-green-600 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
          {product.quality}
        </div>

        <div
          className={`absolute bottom-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${
            product.inStock ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-4 flex-grow">
        {/* Top Content */}
        <div className="flex-grow">
          {/* Title + Rating */}
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[18px] font-bold line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm ml-1">{product.rating}</span>
            </div>
          </div>

          <p className="text-green-600 font-medium mb-0.5">{product.farmer}</p>

          {/* Location */}
          <div className="flex items-center text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1 text-green-500" />
            <span>{product.location}</span>
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="text-xl font-bold text-green-600">
                ${product.price}
              </span>
              <span className="text-sm ml-1">{product.unit}</span>
            </div>
            <span className="text-sm">{product.quantity}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center gap-3 mb-2 mt-auto">
          <button
            onClick={() => navigate(`/shop/${product._id}`)}
            className="bg-gray-100 text-gray-700 px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm flex-grow"
          >
            View Details
          </button>
          <button
            disabled={!product.inStock}
            className={`px-2 py-2 rounded-lg font-medium transition-colors flex items-center text-sm flex-grow ${
              product.inStock
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseCard;
