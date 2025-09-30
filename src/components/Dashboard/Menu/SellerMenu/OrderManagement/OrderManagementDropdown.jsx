import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';

const OrderManagementDropdown = () => {
    return (
        <>
            <div className='flex flex-col items-start p-2 rounded-lg'>
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