import React from "react";
import NavButton from "../../../shared/Buttons/NavButton";
import MyOrdersButton from "./MyOrders/MyOrdersButton";
import MyAccountButton from "./MyAccount/MyAccountButton";
import { House, Search, ShoppingCart } from "lucide-react";

const CustomerMenu = () => {
  return (
    <>
      <div>
        <NavButton
          label="Dashboard Home"
          address="/dashboard/customer-dashboard-home"
          icon={House}
        />

        <NavButton
          label="Shop Now"
          address="/shop"
          icon={House}
        />

        <NavButton
          label="My Orders"
          address="/my-orders"
          icon={House}
        />

        <NavButton
          label="Track Order"
          address="/track-order"
          icon={House}
        />

        <NavButton
          label="Shopping Cart"
          address="/cart"
          icon={ShoppingCart}
        />

        <NavButton
          label="Payment Method"
          address="/payment-method"
          icon={House}
        />


        <NavButton
          label="Wishlist"
          address="/wishlist"
          icon={House}
        />


        <NavButton
          label="Advanced Search & Filter"
          address="advanced-search-filter"
          icon={Search}
        />

        

        <MyOrdersButton />

        <MyAccountButton />
      </div>
    </>
  );
};

export default CustomerMenu;
