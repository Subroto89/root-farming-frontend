import React from "react";
import NavButton from "../../../../shared/Buttons/NavButton";

const MyOrdersDropdown = () => {
  return (
    <>
      <div className='flex flex-col items-start p-2 rounded-lg'>
        <NavButton
            label="Track Current Orders"
            address="track-current-orders"
        />

        <NavButton
            label="View Order History & Receipts"
            address="view-order-hisotry-receipts"
        />

        <NavButton
            label="Initiate Returns"
            address="initiate-returns"
        />
      </div>
    </>
  );
};

export default MyOrdersDropdown;
