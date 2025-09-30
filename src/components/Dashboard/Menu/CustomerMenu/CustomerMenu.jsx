import React from "react";
import NavButton from "../../../shared/Buttons/NavButton";
import MyOrdersButton from "./MyOrders/MyOrdersButton";
import MyAccountButton from "./MyAccount/MyAccountButton";

const CustomerMenu = () => {
  return (
    <>
      <div>
        <NavButton
          label="Dashboard Home"
          address="/dashboard/customer-dashboard-home"
        />

        <NavButton
          label="Advanced Search & Filter"
          address="advanced-search-filter"
        />

        <NavButton label="My Cart" address="my-cart" />

        <MyOrdersButton />

        <MyAccountButton />
      </div>
    </>
  );
};

export default CustomerMenu;
