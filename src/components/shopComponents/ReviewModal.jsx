import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { useProduct } from '../../allProductsApi/UseProducts';
import {
  useAddReview,
  useProductReviews,
} from '../../allProductsApi/UseReviews';

const ReviewModal = ({ productId, onClose }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');

  // 🔹 Product details
  const { data: product } = useProduct(productId);
  const productImg = product?.image || product?.productImg || '';
  const { data: reviews = [] } = useProductReviews(productId);
  const { mutateAsync, isPending } = useAddReview();

  const alreadyReviewed = reviews?.some(r => r.user?.email === user?.email);
  const displayRating = hoverRating || rating;

  const getStarFill = starIndex => {
    if (displayRating >= starIndex) return 'full';
    if (displayRating >= starIndex - 0.5) return 'half';
    return 'empty';
  };

  // 🟢 Submit handler
  const handleSubmit = async e => {
    e.preventDefault();

    if (!user) {
      Swal.fire('Login Required', 'Please log in to leave a review.', 'info');
      return;
    }

    if (!rating || !message.trim()) {
      Swal.fire(
        'Missing Info',
        'Please provide both rating and feedback.',
        'warning'
      );
      return;
    }

    if (alreadyReviewed) {
      Swal.fire({
        icon: 'info',
        title: 'Already Reviewed!',
        text: 'You can only leave one review per product.',
      });
      return;
    }

    try {
      await mutateAsync({
        productId,
        productImg,
        rating,
        message,
        user: {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Thanks!',
        text: 'Your review has been added successfully.',
        timer: 1500,
        showConfirmButton: false,
      });

      setRating(0);
      setMessage('');
      onClose();
    } catch (err) {
      console.error('Review error:', err);
      Swal.fire('Error', 'Failed to submit review. Try again later.', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl p-8 rounded-2xl shadow-2xl bg-white text-gray-900 z-10 animate-fadeIn">
        <h2 className="text-3xl font-semibold text-center mb-2">
          Your opinion matters!
        </h2>
        <p className="text-gray-600 text-center mb-6">
          How was your experience with this product?
        </p>

        {/* 🖼️ Product Preview */}
        {product && (
          <div className="flex items-center gap-4 mb-6">
            <img
              src={productImg}
              alt={product?.productTitle || 'Product'}
              className="w-16 h-16 rounded-lg object-cover border"
            />
            <div>
              <h3 className="text-lg font-semibold">
                {product?.name || product?.name || 'Untitled Product'}
              </h3>
              <p className="text-sm text-gray-500">
                Farmer: {product?.farmer || product?.seller || 'Unknown'}
              </p>
            </div>
          </div>
        )}

        {/* ⭐ Star Rating */}
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map(star => {
            const fillType = getStarFill(star);
            return (
              <div
                key={star}
                className="relative w-10 h-10 cursor-pointer"
                onMouseLeave={() => setHoverRating(0)}
              >
                {/* Left half */}
                <div
                  onMouseEnter={() => setHoverRating(star - 0.5)}
                  onClick={() => setRating(star - 0.5)}
                  className="absolute left-0 top-0 w-1/2 h-full z-10"
                />
                {/* Right half */}
                <div
                  onMouseEnter={() => setHoverRating(star)}
                  onClick={() => setRating(star)}
                  className="absolute right-0 top-0 w-1/2 h-full z-10"
                />
                {/* Star Icon */}
                <Star
                  className={`absolute inset-0 w-10 h-10 transition-all duration-200 ${
                    fillType === 'full'
                      ? 'text-yellow-400'
                      : fillType === 'half'
                      ? 'text-yellow-300'
                      : 'text-gray-300'
                  }`}
                  fill={fillType === 'empty' ? 'none' : 'currentColor'}
                />
                {fillType === 'half' && (
                  <div className="absolute left-0 top-0 w-1/2 h-full bg-yellow-300 rounded-l-sm pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>

        <p className="text-sm text-gray-600 mb-4 text-center">
          Selected Rating: <strong>{rating.toFixed(1)}</strong> ⭐
        </p>

        {/* 📝 Review Form */}
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <textarea
            rows="4"
            placeholder="Write your feedback..."
            className="p-4 rounded-md resize-none border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />

          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-600 hover:underline"
            >
              Maybe later
            </button>

            <button
              type="submit"
              disabled={isPending || alreadyReviewed}
              className={`py-3 px-6 font-semibold rounded-md transition ${
                alreadyReviewed
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {alreadyReviewed
                ? 'Already Reviewed'
                : isPending
                ? 'Submitting...'
                : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
