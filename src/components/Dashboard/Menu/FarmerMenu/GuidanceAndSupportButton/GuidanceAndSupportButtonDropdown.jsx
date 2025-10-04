import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';

const GuidanceAndSupportButtonDropdown = () => {
    return (
        <>
            <div className='flex flex-col items-start px-1 rounded-lg bg-green-200 ml-8 border border-white'>
                <NavButton
                    label="Weather Alerts"
                    address="/dashboard/weather-alerts"
                />

                <NavButton
                    label="Instructional Guides"
                    address="/dashboard/instructional-guides"
                />

                <NavButton 
                    label="Live Chat"
                    address="/dashboard/live-chat"
                />

            </div>
        </>
    );
};

export default GuidanceAndSupportButtonDropdown;