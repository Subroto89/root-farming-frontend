import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useProduct } from '../../allProductsApi/UseProducts';
import { useProductReviews } from '../../allProductsApi/UseReviews';
import WishlistButton from './WishlistButton';
import ReviewList from './ReviewList';
import ReviewModal from './ReviewModal';
import { useTheme } from '../../hooks/useTheme';

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const { data: reviews = [] } = useProductReviews(id);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const { theme } = useTheme();
  const themeBackgroundStyle = theme === 'dark' ? "bg-dark" : "bg-light";
  const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
  const themeFgOfFgStyle = theme === 'dark' ? "fg-of-fg-dark" : "fg-of-fg-light"

  if (isLoading)
    return (
      <div className="text-center py-12 text-gray-600 animate-pulse">
        Loading product details...
      </div>
    );

  if (!product)
    return (
      <div className="text-center py-12 text-red-600">Product not found</div>
    );

  const inStock = product?.quantity > 0 || product?.productStatus === "In stock";

  return (
    <div className={`${themeBackgroundStyle} min-h-screen py-16`}>
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${themeForegroundStyle}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="space-y-4">
          <img
            src={product.productPhoto}
            alt={product?.variant?.variantName}
            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
              {product?.variant?.variantName}
            </h1>
            <WishlistButton product={product} />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-green-600 font-semibold text-lg sm:text-xl">
              ${product.price} {product.unit}
            </span>
            {inStock ? (
              <span className="px-3 py-1 rounded-full bg-green-600 text-white text-xs sm:text-sm">
                In Stock
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs sm:text-sm">
                Out of Stock
              </span>
            )}
            <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-xs sm:text-sm">
              {product.quality}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-200 text-purple-800 text-xs sm:text-sm">
              {product?.category?.categoryName}
            </span>
          </div>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            {product.shortDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2 sm:mt-4">
            <button
              disabled={!inStock}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-all text-sm sm:text-base ${inStock
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              Add to Cart
            </button>
            <button
              onClick={() => setShowReviewModal(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold border border-green-600 text-green-600 hover:bg-green-50 transition-all text-sm sm:text-base"
            >
              Add a Review
            </button>
          </div>
        </div>
      </div>

      <ReviewList
        reviews={reviews}
        onAddReview={() => setShowReviewModal(true)}
      />

      {showReviewModal && (
        <ReviewModal productId={id} onClose={() => setShowReviewModal(false)} />
      )}
    </div>
    </div>
  );
};

export default ProductDetails;
