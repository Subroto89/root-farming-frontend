import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';
import { useTheme } from '../../../../../hooks/useTheme';

const FinancialsAndCommissionsDropdown = () => {
    const {theme} = useTheme();
  const dropDownStyle = theme === 'dark' ? 'navbar-dark' : 'navbar-light';
    return (
        <>
            <div className={`${dropDownStyle} flex flex-col items-start border-t border-b border-gray-300`}>
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