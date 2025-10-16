import React from 'react';
import { Star } from 'lucide-react';

const ReviewList = ({ reviews = [], onAddReview }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
        <button
          onClick={onAddReview}
          className="px-4 py-2 border rounded-xl hover:bg-green-100 text-green-700 border-green-400 transition font-medium"
        >
          Add Review
        </button>
      </div>

      {/* Review List */}
      {reviews.length > 0 ? (
        reviews.map((r, i) => (
          <div
            key={i}
            className="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition"
          >
            {/* User Info */}
            <div className="flex items-center gap-3 mb-2">
              {r.user?.photo ? (
                <img
                  src={r.user.photo}
                  alt={r.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  {r.user?.name?.[0]?.toUpperCase() || '?'}
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900">{r.user?.name}</p>
                <div className="flex items-center">
                  {/* ⭐ Render stars */}
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        r.rating >= star
                          ? 'text-yellow-400 fill-yellow-400'
                          : r.rating >= star - 0.5
                          ? 'text-yellow-300 fill-yellow-300'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {r.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{r.message}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">
          No reviews yet. Be the first to review!
        </p>
      )}
    </div>
  );
};

export default ReviewList;
