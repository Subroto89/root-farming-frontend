import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';

const ContentManagementDropdown = () => {
    return (
        <>
          <div className='flex flex-col items-start px-1 rounded-lg bg-green-200 ml-8 w-full border border-white'>
            <NavButton
                label="Govt News & Facilities"
                address="/dashboard/govt-news-facilites"
            />

            <NavButton
                label="Management Instructional Guides"
                address="/dashboard/management-instructional-guides"
            />

            <NavButton
                label="Manage System Alerts"
                address="manage-system-alerts"
            />

             
          </div>  
        </>
    );
};

export default ContentManagementDropdown;