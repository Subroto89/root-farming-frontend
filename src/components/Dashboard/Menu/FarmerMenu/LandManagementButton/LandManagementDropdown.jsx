import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';

const LandManagementDropdown = () => {
    return (
        <>
           <div className='flex flex-col items-start gap-2 p-2 rounded-lg'>
                <NavButton
                    label="Land Registration"
                    address="/"
                />
                <NavButton
                    label="View Registered Lands"
                    address="/dashboard/view-registered-lands"
                />
            </div> 
        </>
    );
};

export default LandManagementDropdown;