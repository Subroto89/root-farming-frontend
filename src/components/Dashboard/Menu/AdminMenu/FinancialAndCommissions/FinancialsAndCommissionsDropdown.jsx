import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';

const FinancialsAndCommissionsDropdown = () => {
    return (
        <>
            <div className='flex flex-col items-start px-1 rounded-lg bg-green-200 ml-8 w-full border border-white'>
                <NavButton
                    label="Specialist's Salary"
                    address="/dashboard/specialist's-salary"
                />    

                <NavButton
                    label="Transaction History & Revenue Report"
                    address="/dashboard/transaction-history"
                />

                <NavButton
                    label="Manage Payment Setting"
                    address="/dashboard/manage-payment-setting"
                />


            </div>   
        </>
    );
};

export default FinancialsAndCommissionsDropdown;