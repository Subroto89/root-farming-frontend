import React, { useState } from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';

const OrderManagementDropdown = () => {
    const {theme} = useState();
    const dropDownStyle = theme === 'dark' ? "navbar-dark" : "navbar-light";
    return (
        <>
            <div className={`flex flex-col items-start w-60 border-t border-b border-gray-300`}>
                <NavButton
                    label="View New Orders"
                    address="view-new-orders"
                />    
                <NavButton
                    label="Process Orders"
                    address="process-orders"
                />    
                <NavButton
                    label="View Order History"
                    address="view-order-history"
                />        
            </div>   
        </>
    );
};

export default OrderManagementDropdown;