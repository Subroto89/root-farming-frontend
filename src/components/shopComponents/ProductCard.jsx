import React from 'react';
import { ShoppingCart, Star, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useTheme } from '../../hooks/useTheme';

const ProductCard = ({ product, viewMode }) => {
   const {theme} = useTheme();
  
      const themeBackgroundStyle = theme === 'dark' ? "bg-dark" : "bg-light";
      const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
  const navigate = useNavigate();
  return (
    <div
      className={`${themeForegroundStyle} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden 
        ${viewMode === 'list' ? 'flex items-stretch' : 'flex flex-col h-full'}
      `}
    >
      {/* Image Section */}
      <div
        className={`relative ${
          viewMode === 'list' ? 'w-64 flex-shrink-0 h-auto' : 'w-full h-56'
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-[200px]"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {product.badges?.map((badge, i) => (
            <span
              key={i}
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                badge === 'Organic'
                  ? 'bg-green-500 text-white'
                  : badge === 'Best Seller'
                  ? 'bg-red-500 text-white'
                  : 'bg-purple-500 text-white'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Stock Label */}
        <div
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${
            product.inStock
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>

      {/* Content Section */}
      <div
        className={`flex flex-col justify-between p-4 ${
          viewMode === 'list' ? 'flex-1' : 'h-full'
        }`}
      >
        <div>
          {/* Product Title & Rating */}
          <div className="mb-1">
            <div className="flex items-center justify-between">
              <h3 className={`text-[18px] font-bold mb-1 line-clamp-1`}>
                {product.name}
              </h3>
              <div className="flex items-center text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm ml-1">
                  {product.rating}
                </span>
              </div>
            </div>

          <p className="font-medium">{product.farmer}</p>
          </div>

          {/* Location */}
          {/* <div className="flex items-center text-gray-600 text-sm mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{product.location}</span>
          </div> */}

          {/* Description */}
          {/* <p className="text-gray-700 mb-4 line-clamp-2">
            {product.description}
          </p> */}
        </div>

        {/* Price & Quantity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold">
              ${product.price}
            </span>
            <span className="text-sm">{product.unit}</span>
          </div>
          <span className="text-sm">{product.quantity}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center gap-3 mb-2">
          <button
            onClick={() => navigate(`/shop/${product._id}`)}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            View Details
          </button>
          <button
            disabled={!product.inStock}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center text-sm ${
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

export default ProductCard;
