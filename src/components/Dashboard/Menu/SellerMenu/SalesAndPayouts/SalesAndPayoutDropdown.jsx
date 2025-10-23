import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';
import { useTheme } from '../../../../../hooks/useTheme';

const SalesAndPayoutDropdown = () => {
    const {theme} = useTheme();
     const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
    return (
        <>
         <div className={`${themeForegroundStyle} pl-6 flex flex-col items-start w-full border-t border-b border-gray-300`}>
            <NavButton
                label="Sales Report"
                address="view-sales-report"
                textSize="xs"

            />
            <NavButton
                label="Manage Payout Details"
                address="manage-payout-details"
                textSize="xs"
            />
            <NavButton
                label="Transaction Fees & Earnings"
                address="transaction-fees-earnings"
                textSize="xs"
            />
         </div>   
        </>
    );
};

export default SalesAndPayoutDropdown;