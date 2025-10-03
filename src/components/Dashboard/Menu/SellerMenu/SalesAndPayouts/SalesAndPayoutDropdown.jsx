import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';

const SalesAndPayoutDropdown = () => {
    return (
        <>
         <div className='flex flex-col items-start px-1 rounded-lg bg-green-200 ml-8 w-full border border-white'>
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