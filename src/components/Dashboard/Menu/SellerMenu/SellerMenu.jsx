import React from "react";
import NavButton from "../../../shared/Buttons/NavButton";
import MyListingsButton from "./MyListings/MyListingsButton";
import OrderManagementButton from "./OrderManagement/OrderManagementButton";
import SalesAndPayoutsButton from "./SalesAndPayouts/SalesAndPayoutsButton";

const SellerMenu = () => {
  return (
    <>
      <div>
        <NavButton label="Dashboard Home" address="seller-dashboard-home" />

        <MyListingsButton />

        <OrderManagementButton />

        <SalesAndPayoutsButton />

        <NavButton
          label="Inventory Management"
          address="inventory-management"
        />
      </div>
    </>
  );
};

export default SellerMenu;
