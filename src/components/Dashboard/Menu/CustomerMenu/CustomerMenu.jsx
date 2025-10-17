import React from "react";
import NavButton from "../../../shared/Buttons/NavButton";
import MyOrdersButton from "./MyOrders/MyOrdersButton";
import MyAccountButton from "./MyAccount/MyAccountButton";
import { Handbag, Heart, House, Search, ShoppingCart, Star } from "lucide-react";

const CustomerMenu = () => {
  return (
    <>
      <div>
        <NavButton
          label="Dashboard Home"
          address="/dashboard"
          icon={House}
        />

        <NavButton
          label="Shop Now"
          address="/shop"
          icon={Handbag}
        />

      

        <NavButton
          label="Shopping Cart"
          address="/cart"
          icon={ShoppingCart}
        />

        <NavButton
          label="Wishlist"
          address="/wishlist"
          icon={Heart}
        />


        <NavButton
          label="Review & Rating"
          address="review-rating"
          icon={Star}
        />

        

        <MyOrdersButton />

        <MyAccountButton />
      </div>
    </>
  );
};

export default CustomerMenu;
