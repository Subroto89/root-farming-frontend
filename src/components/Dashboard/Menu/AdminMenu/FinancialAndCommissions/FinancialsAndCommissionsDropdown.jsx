import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';

const FinancialsAndCommissionsDropdown = () => {
    return (
        <>
            <div className='flex flex-col p-2 rounded-lg'>
                <NavButton
                    label="Specialists' Salary"
                    address="/dashboard/specialists'-salary"
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