import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';

const CropManagementDropdown = () => {
    return (
        <>
            <div className='flex flex-col items-start px-1 rounded-lg bg-green-200 ml-8 border border-white'>
                <NavButton
                    label="Start New Crop"
                    address="/dashboard/new-crop"
                />    

                <NavButton
                    label="Active Crops Progress"
                    address="/dashboard/active-crops-progress"
                />

                <NavButton
                    label="Log Crop Activities"
                    address="/dashboard/log-crop-activities"
                />

                <NavButton
                    label="Set Upcoming Activities"
                    address="/dashboard/set-upcoming-activities"
                />

            </div>   
        </>
    );
};

export default CropManagementDropdown;