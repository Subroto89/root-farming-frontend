import React from 'react';
import { Star } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const Reviewscard = ({ r }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`w-60 mx-5 h-[22rem] relative group flex-shrink-0 rounded-2xl overflow-hidden 
      transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl
      ${
        isDark
          ? 'bg-[#1b1c1e] text-gray-100 border border-neutral-800'
          : 'bg-white text-gray-800 border border-gray-100'
      }`}
    >
      {/* User Info (default visible) */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-5 
  transition-opacity duration-700 group-hover:opacity-0
  ${
    isDark
      ? 'bg-gradient-to-b from-emerald-900 via-green-900 to-green-950 text-gray-100'
      : 'bg-gradient-to-b from-green-600 via-green-700 to-green-800 text-white'
  }`}
      >
        <img
          src={r.user?.photo}
          alt={r.user?.name}
          className="w-16 h-16 rounded-full border-2 border-white shadow-md mb-3 object-cover"
        />
        <h3 className="font-semibold text-lg tracking-wide">{r.user?.name}</h3>

        {/* Rating */}
        <div className="flex items-center justify-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${
                i < Math.round(r.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-white opacity-90">
            ({r.rating.toFixed(1)})
          </span>
        </div>

        {/* Review Message */}
        <p className="italic mt-3 text-sm leading-relaxed line-clamp-3 text-gray-100">
          “{r.message}”
        </p>
      </div>

      {/* Product Image (shows only on hover) */}
      <img
        src={
          r.productImg ||
          'https://via.placeholder.com/300x300.png?text=Product+Image'
        }
        alt="Product"
        className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-110"
      />
    </div>
  );
};

export default Reviewscard;
