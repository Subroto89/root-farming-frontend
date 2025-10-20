import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';
import { useTheme } from '../../../../../hooks/useTheme';

const LandManagementDropdown = () => {
    const {theme} = useTheme();
     const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
    return (
        <>
           <div className={`${themeForegroundStyle} pl-6 flex flex-col items-start px-1 rounded-lg bg-green-200`}>
                <NavButton
                    label="Land Registration"
                    address="/dashboard/field-registration"
                    textSize="xs"
                />
                <NavButton
                    label="View Registered Lands"
                    address="/dashboard/view-registered-lands"
                    textSize="xs"
                />
            </div> 
        </>
    );
};

export default LandManagementDropdown;