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
          label="Advanced Search & Filter"
          address="advanced-search-filter"
          icon={Search}
        />

        <NavButton label="My Cart" address="my-cart" icon={ShoppingCart}/>

        <MyOrdersButton />

        <MyAccountButton />
      </div>
    </>
  );
};

export default CustomerMenu;
