import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useTheme } from '../../hooks/useTheme';
import {useAuth} from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/UseAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ product, viewMode }) => {
  const { theme } = useTheme();
  const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Add-to-cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post('/cart/add-to-cart', data);
     return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user?.email]);
    },
    onError: () => {
      toast.error("Failed to add product to cart!");
    }
  });

  const handleAddToCart = async () => {
  if (!user) {
    toast.error("Please log in to add items to your cart.");
    navigate("/auth");
    return;
  }

  let userData;
  try {
    const res = await axiosSecure.get(`/users/get-user-profile/${user.email}`);
    userData = res.data;
  } catch {
    toast.error("Unable to fetch user info. Try again later.");
    return;
  }

  const address = userData?.shippingAddress;
  const validAddress = address?.addressLine1 && address?.city && address?.country && address?.zipCode ? address : null;
  const validPhone = userData?.userPhone?.trim() ? userData.userPhone : null;

  // Prevent adding to cart if address or phone missing
  if (!validAddress || !validPhone) {
    toast.warn("Please update your address and phone number before adding to cart.");
    navigate(`/update-profile/${user.email}`);
    return;
  }

  const cartItem = {
    productId: product._id,
    name: product?.variant?.variantName,
    price: product?.price,
    image: product?.productPhoto,
    userEmail: user?.email,
    shippingAddress: validAddress,
    userPhone: validPhone,
  };

  try {
    await toast.promise(addToCartMutation.mutateAsync(cartItem), {
      loading: "Adding item to your cart...",
      success: `"${product?.variant?.variantName}" has been added!`,
      error: "Oops! Something went wrong.",
    });
    
  } catch (error) {
    console.error("Add to cart failed:", error);
  }
};


  // Stock logic
  const inStock = product?.quantity > 0 && product?.productStatus === "In stock";

  return (
    <div
      className={`${themeForegroundStyle} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden 
        ${viewMode === 'list' ? 'flex items-stretch' : 'flex flex-col h-full'}
      `}
    >
      <ToastContainer />
      
      {/* Image */}
      <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0 h-auto' : 'w-full h-56'}`}>
        <img
          src={product?.productPhoto}
          alt={product?.variant?.variantName}
          className="object-cover w-full h-[200px]"
        />
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${inStock ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-between p-4 ${viewMode === 'list' ? 'flex-1' : 'h-full'}`}>
        <div>
          <div className="mb-1">
            <div className="flex items-center justify-between">
              <h3 className={`text-[18px] font-bold mb-1 line-clamp-1`}>
                {product?.variant?.variantName}
              </h3>
              <div className="flex items-center text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm ml-1">{product.rating}</span>
              </div>
            </div>

            <p className="font-medium">{product.sellerDetails?.sellerName}</p>
            <p className="text-sm text-gray-500">
              {product?.category?.categoryName} - {product?.type?.typeName}
            </p>
          </div>
        </div>

        {/* Price & Quantity */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-xl font-bold">${product.price}</span>
            <span className="text-sm ml-1">{product.unit}</span>
          </div>
          <span className="text-sm">{product.quantity} {product.unit} left</span>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center gap-3 mt-3">
          <button
            onClick={() => navigate(`/shop/${product._id}`)}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            View Details
          </button>
          <button
            disabled={!inStock}
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center text-sm ${inStock ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
