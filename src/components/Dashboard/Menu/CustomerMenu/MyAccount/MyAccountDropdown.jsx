import React from "react";
import NavButton from "../../../../shared/Buttons/NavButton";
import { useTheme } from "../../../../../hooks/useTheme";

const MyAccountDropdown = () => {
  const {theme} = useTheme();
  const dropDownStyle = theme === 'dark' ? 'navbar-dark' : 'navbar-light';
  return (
    <>
      <div className={`${dropDownStyle} flex flex-col items-start border-t border-b border-gray-300`}>
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
