import React from "react";
import NavButton from "../../../../shared/Buttons/NavButton";

const MyAccountDropdown = () => {
  return (
    <>
      <div className="flex flex-col items-start p-2 rounded-lg">
        <NavButton
            label="Manage Shipping Addresses"
            address="manage-shipping-addresses"
        />

        <NavButton
            label="Manage Payment Methods"
            address="manage-payment-methods"
        />
      </div>
    </>
  );
};

export default MyAccountDropdown;
