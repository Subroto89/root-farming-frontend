import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';
import FinancialsAndCommissionsDropdown from './FinancialsAndCommissionsDropdown';

const FinancialAndCommissionsButton = () => {
    return (
        <>
            {/*  Financials and Commissions Button --------------*/}
            <div className='relative'>
                <NavButton
                    label="Financials & Commissions"
                />
            </div>

            {/* Financials and Commisions Dropdown ------------- */}
            <div className='absolute top-0 -right-2'>
                <FinancialsAndCommissionsDropdown/>
            </div>
        </>
    );
};

export default FinancialAndCommissionsButton;