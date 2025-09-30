import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';

const GuidanceAndSupportButtonDropdown = () => {
    return (
        <>
            <div className='flex flex-col items-start gap-2 p-2 rounded-lg'>
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