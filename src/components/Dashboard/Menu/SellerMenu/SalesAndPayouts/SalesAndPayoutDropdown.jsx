import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';

const SalesAndPayoutDropdown = () => {
    return (
        <>
         <div className='flex flex-col items-start w-full border-t border-b border-gray-300'>
            <NavButton
                label="Sales Report"
                address="view-sales-report"
            />
            <NavButton
                label="Manage Payout Details"
                address="manage-payout-details"
            />
            <NavButton
                label="Transaction Fees & Earnings"
                address="transaction-fees-earnings"
            />
         </div>   
        </>
    );
};

export default SalesAndPayoutDropdown;