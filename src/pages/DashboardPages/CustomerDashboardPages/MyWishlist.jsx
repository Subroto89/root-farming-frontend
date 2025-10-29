import React from 'react';
import Swal from 'sweetalert2';
import MyWishilistCard from '../../../components/MyWishilistCard/MyWishilistCard';
import {useAuth} from '../../../hooks/useAuth';
import {
  useDeleteWishlist,
  useWishlist,
} from '../../../allProductsApi/UseWishlist';

const MyWishlist = () => {
  const { user } = useAuth();
  const { data: wishlist = [], isLoading } = useWishlist(user?.email);
  const deleteMutation = useDeleteWishlist();

  const handleRemove = item => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Remove ${item.product.name} from your wishlist?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        deleteMutation.mutate({
          userEmail: user.email,
          productId: item.product._id,
        });
        Swal.fire(
          'Removed!',
          `${item.product.name} has been removed.`,
          'success'
        );
      }
    });
  };

  if (isLoading)
    return (
      <div className="text-center py-12 text-gray-600 animate-pulse">
        Loading your wishlist...
      </div>
    );

  if (!wishlist.length)
    return (
      <div className="text-center py-12 text-gray-600">
        Your wishlist is empty.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {wishlist.map(item => (
          <MyWishilistCard
            key={item._id}
            item={item}
            handleRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default MyWishlist;
