import React from 'react';
import { Heart } from 'lucide-react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { useAddToWishlist } from '../../allProductsApi/UseWishlist';

const WishlistButton = ({ product }) => {
  const { user } = useAuth();
  const addWishlist = useAddToWishlist();
  const navigate = useNavigate();

  const handleAddWishlist = () => {
    if (!user?.email) {
      return Swal.fire(
        'Login Required',
        'Please log in to add to wishlist.',
        'info'
      );
    }

    addWishlist.mutate(
      {
        userEmail: user.email,
        product: product, // send the full product object
      },
      {
        onSuccess: () => {
          Swal.fire({
            icon: 'success',
            title: 'Added to Wishlist',
            text: `${product.name} has been added!`,
            timer: 1500,
            showConfirmButton: false,
          });
          navigate('/dashboard/wishlist'); // optional redirect
        },
        onError: err => {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response?.data?.message || 'Could not add to wishlist.',
          });
        },
      }
    );
  };

  return (
    <button
      onClick={handleAddWishlist}
      className="flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition"
    >
      <Heart className="h-5 w-5" /> Add to Wishlist
    </button>
  );
};

export default WishlistButton;
