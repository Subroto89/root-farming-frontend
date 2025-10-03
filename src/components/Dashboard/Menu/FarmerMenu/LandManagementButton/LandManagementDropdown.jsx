import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';

const LandManagementDropdown = () => {
    return (
        <>
           <div className='flex flex-col items-start px-1 rounded-lg bg-green-200 ml-8 border border-white'>
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