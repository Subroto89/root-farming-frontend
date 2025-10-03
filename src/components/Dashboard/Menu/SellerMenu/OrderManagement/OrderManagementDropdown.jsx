import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';

const OrderManagementDropdown = () => {
    return (
        <>
            <div className='flex flex-col items-start px-1 rounded-lg bg-green-200 ml-8 w-full border border-white'>
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