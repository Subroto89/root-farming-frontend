import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Trash2, Plus, Minus } from "lucide-react";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import {useAuth} from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";
import { useTheme } from "../../../hooks/useTheme";

const CartPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { theme } = useTheme();
  const backgroundThemeClass = theme === "dark" ? "bg-dark" : "bg-light";
  const foregroundThemeClass = theme === "dark" ? "fg-dark" : "fg-light";
  const subForegroundThemeClass = theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";

  // ------------------ FETCH CART DATA ------------------
  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/cart/get-cart?email=${user.email}`);
      return res.data;
    },
  });

  // ------------------ UPDATE QUANTITY ------------------
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }) =>
      axiosSecure.patch(`/cart/update-cart/${id}`, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user?.email]);
      toast.success("Cart updated successfully!");
    },
    onError: () => toast.error("Failed to update quantity."),
  });

  const handleQuantityChange = (item, action) => {
    let newQuantity = item.quantity;
    if (action === "increase") newQuantity += 1;
    if (action === "decrease" && newQuantity > 1) newQuantity -= 1;

    updateQuantityMutation.mutate({ id: item._id, quantity: newQuantity });
  };

  // ------------------ DELETE ITEM ------------------
  const deleteItemMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/cart/delete-cart/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user?.email]);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Item removed from cart successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to remove item.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
  });

  // ------------------ HANDLE DELETE ------------------
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItemMutation.mutate(id);
      }
    });
  };

  // ------------------ LOADING & EMPTY STATES ------------------
  if (isLoading) return <LoadingSpinner />;

  if (!cartItems.length)
    return (
      <p className="text-center py-10 text-gray-600">Your cart is empty</p>
    );

  // ------------------ TOTAL PRICE ------------------
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={`${backgroundThemeClass}`}>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-black"> Your Shopping Cart</h2>

        <div className="space-y-5 max-h-[450px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {cartItems?.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between bg-green-300 shadow-md rounded-xl p-4"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full md:w-1/2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                  <p className="text-gray-400 text-sm">
                    Added:{new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {/* Shipping Address */}
              {item.shippingAddress ? (
                <div className="text-gray-700 text-sm mt-1">
                  <p><span className="font-semibold">Address:</span> {item.shippingAddress.addressLine1}, {item.shippingAddress.addressLine2 && `${item.shippingAddress.addressLine2},`} {item.shippingAddress.city}, {item.shippingAddress.stateProvince}, {item.shippingAddress.country} - {item.shippingAddress.zipCode}</p>
                </div>
              ) : (
                <p className="text-red-500 text-sm mt-1">No shipping address provided</p>
              )}

              {/* Phone */}
              {item.userPhone ? (
                <p className="text-gray-700 text-sm mt-1">
                  <span className="font-semibold">Phone:</span> {item.userPhone}
                </p>
              ) : (
                <p className="text-red-500 text-sm mt-1">No phone number provided</p>
              )}
              {/* Quantity & Remove */}
              <div className="flex items-center gap-4 mt-3 md:mt-0">
                <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                  <button
                    className="p-1 hover:bg-gray-100 rounded transition"
                    onClick={() => handleQuantityChange(item, "decrease")}
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    className="p-1 hover:bg-gray-100 rounded transition"
                    onClick={() => handleQuantityChange(item, "increase")}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL & CHECKOUT */}
        <div className="mt-8 text-right">
          <h3 className="text-xl font-bold">
            Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
          </h3>
          <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
