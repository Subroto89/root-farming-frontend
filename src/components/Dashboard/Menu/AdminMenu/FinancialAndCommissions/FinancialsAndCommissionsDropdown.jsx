import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';
import { useTheme } from '../../../../../hooks/useTheme';

const FinancialsAndCommissionsDropdown = () => {
    const {theme} = useTheme();
     const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
    return (
        <>
            <div className={`${themeForegroundStyle} pl-6 flex flex-col items-start border-t border-b border-gray-300`}>
                <NavButton
                    label="Specialist's Salary"
                    address="/dashboard/specialist's-salary"
                    textSize="xs"
                />    

                <NavButton
                    label="Transaction & Revenue Report"
                    address="/dashboard/transaction-history"
                    textSize="xs"
                />

                <NavButton
                    label="Manage Payment Setting"
                    address="/dashboard/manage-payment-setting"
                    textSize="xs"
                />


            </div>   
        </>
    );
};

export default FinancialsAndCommissionsDropdown;