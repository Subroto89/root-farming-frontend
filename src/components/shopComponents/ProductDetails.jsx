import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useProduct } from '../../allProductsApi/UseProducts';
import { useProductReviews } from '../../allProductsApi/UseReviews';
import WishlistButton from './WishlistButton';
import ReviewList from './ReviewList';
import ReviewModal from './ReviewModal';

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const { data: reviews = [] } = useProductReviews(id);

  const [showReviewModal, setShowReviewModal] = useState(false);

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

  return (
    <div className="max-w-7xl mx-auto py-30 px-4 space-y-16">
      {/* Product Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Product Images */}
        <div className="space-y-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-xl shadow-lg"
          />
          {/* Optional additional images */}
          {/* <div className="grid grid-cols-3 gap-2">
            {product.images?.map((img, idx) => (
              <img key={idx} src={img} alt={`image-${idx}`} className="w-full h-24 object-cover rounded-lg" />
            ))}
          </div> */}
        </div>

        {/* Right: Product Info + Wishlist */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
              {product.name}
            </h1>
            <WishlistButton product={product} />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-green-600 font-semibold text-lg">
              ${product.price} {product.unit}
            </span>
            {product.inStock ? (
              <span className="px-3 py-1 rounded-full bg-green-600 text-white text-sm">
                In Stock
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-red-600 text-white text-sm">
                Out of Stock
              </span>
            )}
            <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-sm">
              {product.quality}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-200 text-purple-800 text-sm">
              {product.category}
            </span>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="flex gap-4 mt-4">
            <button
              disabled={!product.inStock}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                product.inStock
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Add to Cart
            </button>
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-6 py-3 rounded-xl font-semibold border border-green-600 text-green-600 hover:bg-green-50 transition-all"
            >
              Add a Review
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewList
        reviews={reviews}
        onAddReview={() => setShowReviewModal(true)}
      />

      {/* Review Modal */}
      {showReviewModal && (
        <ReviewModal productId={id} onClose={() => setShowReviewModal(false)} />
      )}
    </div>
  );
};

export default ProductDetails;
