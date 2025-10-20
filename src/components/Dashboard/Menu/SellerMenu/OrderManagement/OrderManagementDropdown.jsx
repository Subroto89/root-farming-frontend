import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';
import { useTheme } from '../../../../../hooks/useTheme';

const OrderManagementDropdown = () => {
    const {theme} = useTheme();
     const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
    return (
        <>
            <div className={`${themeForegroundStyle} pl-6 flex flex-col items-start w-60 border-t border-b border-gray-300`}>
                <NavButton
                    label="View New Orders"
                    address="view-new-orders"
                    textSize="xs"
                />    
                <NavButton
                    label="Process Orders"
                    address="process-orders"
                    textSize="xs"
                />    
                <NavButton
                    label="View Order History"
                    address="view-order-history"
                    textSize="xs"
                />        
            </div>   
        </>
    );
};

export default OrderManagementDropdown;