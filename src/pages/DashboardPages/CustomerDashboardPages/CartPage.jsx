import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Trash2, Plus, Minus, ShoppingCart, CheckSquare, Square } from "lucide-react";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";
import { useTheme } from "../../../hooks/useTheme";
import { Link, useNavigate } from "react-router";

const CartPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { theme } = useTheme();
  const backgroundThemeClass = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800";
  const cardThemeClass = theme === "dark" ? "bg-gray-800" : "bg-white";
  const headingThemeClass = theme === "dark" ? "text-white" : "text-gray-900";

  // Fetch cart items
  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/cart/get-cart?email=${user.email}`);
      return res.data;
    },
  });

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

  // --- Selection Handlers ---
  const handleToggleSelect = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item._id));
    }
  };

  const isAllSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

  // --- Checkout Handler ---
  const handleCheckout = (type) => {
    let itemsToCheckout = [];

    if (type === "all") {
      itemsToCheckout = cartItems;
    } else if (type === "selected") {
      itemsToCheckout = cartItems.filter((item) => selectedItems.includes(item._id));
    }

    if (itemsToCheckout.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No items selected",
        text: "Please select items before proceeding to checkout.",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    navigate("/checkout", {
      state: { items: itemsToCheckout, checkoutType: type },
    });
  };

  if (isLoading) return <LoadingSpinner />;

    
 const totalPrice =
  selectedItems.length === 0
    ? 0
    : cartItems
        .filter((item) => selectedItems.includes(item._id))
        .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);


  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${backgroundThemeClass}`}>
      <div className="max-w-7xl mx-auto mt-10">
        <h1 className={`text-4xl font-extrabold text-center mb-12 ${headingThemeClass}`}>
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <ShoppingCart className="mx-auto h-24 w-24 text-gray-400" />
            <h2 className="mt-6 text-2xl font-semibold text-gray-500">Your cart is empty</h2>
            <p className="mt-2 text-gray-400">
              Looks like you haven't added anything to your cart yet.
            </p>
            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* -------------------- Cart List Section -------------------- */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between px-2">
                <h2 className={`text-xl font-bold ${headingThemeClass}`}>Items ({cartItems.length})</h2>
                <button
                  onClick={handleToggleSelectAll}
                  className="flex items-center gap-2 text-sm font-medium text-blue-500 hover:underline"
                >
                  {isAllSelected ? (
                    <>
                      <CheckSquare size={18} /> Deselect All
                    </>
                  ) : (
                    <>
                      <Square size={18} /> Select All
                    </>
                  )}
                </button>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className={`p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative ${cardThemeClass}`}
                >
                  {/* Selection Checkbox */}
                  <div className="absolute top-3 left-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => handleToggleSelect(item._id)}
                      className="w-5 h-5 accent-blue-600"
                    />
                  </div>

                  <div className="flex items-center gap-6 pl-8">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-28 h-28 object-cover rounded-lg shadow-md"
                    />
                    <div>
                      <h3 className={`text-xl font-bold ${headingThemeClass}`}>{item.name}</h3>
                      <p className="text-gray-400 mt-1">
                        Price: ${parseFloat(item.price).toFixed(2)}
                      </p>
                      <p className="text-gray-500 text-sm mt-2">
                        Added: {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="flex items-center gap-2 border border-gray-600 rounded-full px-3 py-1">
                      <button
                        onClick={() => handleQuantityChange(item, "decrease")}
                        disabled={item.quantity <= 1}
                        className="p-1 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item, "increase")}
                        className="p-1 rounded-full hover:bg-gray-700"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-gray-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* -------------------- Order Summary -------------------- */}
            <div className={`lg:col-span-1`}>
              <div className={`p-6 rounded-xl shadow-lg sticky top-24 ${cardThemeClass}`}>
                <h2 className={`text-2xl font-bold border-b pb-4 mb-6 ${headingThemeClass} border-gray-700`}>
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="border-t border-gray-700 my-4"></div>
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Buttons */}
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => handleCheckout("selected")}
                    className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                    disabled={selectedItems.length === 0}
                  >
                    <ShoppingCart size={20} /> Checkout Selected ({selectedItems.length})
                  </button>

                  <button
                    onClick={() => handleCheckout("all")}
                    className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-gray-800"
                    disabled={cartItems.length === 0}
                  >
                    Checkout All
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <Link to="/shop" className="text-green-500 hover:underline">
                    or Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
