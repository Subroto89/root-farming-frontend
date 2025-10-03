import React from "react";
import NavButton from "../../../shared/Buttons/NavButton";
import MyListingsButton from "./MyListings/MyListingsButton";
import OrderManagementButton from "./OrderManagement/OrderManagementButton";
import SalesAndPayoutsButton from "./SalesAndPayouts/SalesAndPayoutsButton";
import { Boxes, House } from "lucide-react";

const SellerMenu = () => {
  return (
    <>
      <div className="flex flex-col items-start">
        <NavButton 
          label="Dashboard Home" 
          address="seller-dashboard-home" 
          icon = {House}  
        />

        <MyListingsButton />

        <OrderManagementButton />

        <SalesAndPayoutsButton />

        <NavButton
          label="Inventory Management"
          address="inventory-management"
          icon={Boxes }
        />
      </div>
    </>
  );
};

export default SellerMenu;
