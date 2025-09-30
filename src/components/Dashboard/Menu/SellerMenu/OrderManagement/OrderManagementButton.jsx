import React from "react";
import NavButton from "../../../../shared/Buttons/NavButton";
import OrderManagementDropdown from "./OrderManagementDropdown";

const OrderManagementButton = () => {
  return (
    <>
       {/* Order Management Button -----------------  */}
      <div className="relative">
        <NavButton
            label="Order Management"
        />
      </div>

      {/* Order Management Dropdown ----------------- */}
      <div className="absolute top-0 -right-2">
        <OrderManagementDropdown/>
      </div>
    </>
  );
};

export default OrderManagementButton;
