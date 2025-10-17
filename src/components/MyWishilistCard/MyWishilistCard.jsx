import React from 'react';
import { House, MapPin, Tractor, Trash2 } from 'lucide-react';

const MyWishilistCard = ({ item, handleRemove }) => {
  const product = item.product || item; // ✅ handles both item.product.name and item.name

  return (
    <div className="flex flex-col justify-between bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
      <div>
        {/* Left: Image + Info */}
        <div className="flex items-center w-full sm:w-auto">
          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-lg mr-5"
          />

          {/* Info */}
          <div>
            <h2 className="text-[16px] line-clamp-1 font-semibold text-gray-900 dark:text-white">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-1 flex items-center gap-0.5 dark:text-gray-400 text-[12px]">
              <MapPin size={15} />
              {product.location}
            </p>
            <p className="text-gray-600 flex items-center gap-0.5 dark:text-gray-400 text-[12px]">
              <Tractor size={15} /> {product.farmer}
            </p>

            {product.verified && (
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                ✅ Verified
              </span>
            )}

            <p className="mt-2 mb-4 text-[14px] font-bold text-green-600 dark:text-green-400">
              ${product.price} {product.unit}
            </p>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handleRemove(item)}
          className="w-10 h-10 flex items-center justify-center rounded-full  text-red-700 hover:bg-red-700 hover:text-white transition-all duration-300"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default MyWishilistCard;
