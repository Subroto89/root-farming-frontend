import React from 'react';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Trash } from 'lucide-react';
import {
  useDeleteReview,
  useUserReviews,
} from '../../../allProductsApi/UseReviews';
import useAuth from '../../../hooks/useAuth';

const MyReviews = () => {
  const { user } = useAuth();
  const { data: reviews = [], isLoading } = useUserReviews(user?.email);
  const deleteMutation = useDeleteReview();

  if (isLoading) return <p>Loading your reviews...</p>;

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This review will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire('Deleted!', 'Your review has been removed.', 'success');
          },
          onError: () => {
            Swal.fire('Error', 'Failed to delete review. Try again.', 'error');
          },
        });
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>

      {reviews.length === 0 ? (
        <p>You haven't added any reviews yet.</p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">Image</th>
              <th className="p-3 border-b">Product</th>
              <th className="p-3 border-b">Farmer</th>
              <th className="p-3 border-b">Rating</th>
              <th className="p-3 border-b">Message</th>
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r, i) => (
              <tr
                key={r._id}
                className={`hover:bg-gray-50 transition ${
                  i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                {/* Product Image */}
                <td className="p-3 border-b">
                  <img
                    src={r.productImg}
                    alt={r.productTitle}
                    className="w-14 h-14 rounded-lg object-cover border"
                  />
                </td>

                {/* Product Name */}
                <td className="p-3 border-b font-medium text-gray-800">
                  {r.productTitle}
                </td>

                {/* Farmer */}
                <td className="p-3 border-b text-gray-600">{r.farmerName}</td>

                {/* Rating */}
                <td className="p-3 border-b text-yellow-500 font-semibold">
                  {r.rating} ⭐
                </td>

                {/* Message */}
                <td className="p-3 border-b text-gray-700 max-w-xs truncate">
                  {r.message}
                </td>

                {/* Date */}
                <td className="p-3 border-b text-gray-500">
                  {moment(r.createdAt).fromNow()}
                </td>

                {/* Delete Action */}
                <td className="p-3 border-b text-center">
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="text-red-500 hover:text-red-700 transition p-1"
                    title="Delete review"
                  >
                    <Trash className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyReviews;
