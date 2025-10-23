import React from "react";
import NavButton from "../../../../shared/Buttons/NavButton";
import { useTheme } from "../../../../../hooks/useTheme";

const MyAccountDropdown = () => {
  const {theme} = useTheme();
  const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
  return (
    <>
      <div className={`${themeForegroundStyle} pl-6 flex flex-col items-start border-t border-b border-gray-300`}>
        <NavButton
            label="Manage Shipping Addresses"
            address="manage-shipping-addresses"
            textSize="xs"
        />
        
        <NavButton
            label="Manage Payment Methods"
            address="manage-payment-methods"
            textSize="xs"
        />
      </div>
    </>
  );
};

export default MyAccountDropdown;
