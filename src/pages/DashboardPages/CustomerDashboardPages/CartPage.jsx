//cart page
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Trash2, Plus, Minus } from "lucide-react";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";
import { useTheme } from "../../../hooks/useTheme";

const CartPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { theme } = useTheme();

  const backgroundThemeClass = theme === "dark" ? "bg-dark" : "bg-light";

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

  if (isLoading) return <LoadingSpinner />;
  if (!cartItems.length)
    return (
      <p className="text-center py-10 text-gray-600">Your cart is empty</p>
    );


  return (
    <div className={`${backgroundThemeClass}`}>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          Your Shopping Cart
        </h2>
        <p className="text-center text-gray-500">
          Cart content will appear here...
        </p>
      </div>
    </div>
  );
};

export default CartPage;
