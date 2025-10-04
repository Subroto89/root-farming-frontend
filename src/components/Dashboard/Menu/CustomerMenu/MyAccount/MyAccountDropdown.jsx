import React from "react";
import NavButton from "../../../../shared/Buttons/NavButton";

const MyAccountDropdown = () => {
  return (
    <>
      <div className='flex flex-col items-start px-1 rounded-lg bg-green-200 ml-8 border border-white'>
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
