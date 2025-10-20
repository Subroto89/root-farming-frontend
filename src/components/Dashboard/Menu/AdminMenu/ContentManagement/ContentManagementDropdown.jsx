import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';
import { useTheme } from '../../../../../hooks/useTheme';

const ContentManagementDropdown = () => {
    const {theme} = useTheme();
   const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
    return (
        <>
          <div className={`${themeForegroundStyle} pl-6 flex flex-col items-start border-t border-b border-gray-300`}>
            <NavButton
                label="Govt News & Facilities"
                address="/dashboard/govt-news-facilites"
                textSize="xs"
            />

            <NavButton
                label="Management Instructions"
                address="/dashboard/management-instructional-guides"
                textSize="xs"
            />

            <NavButton
                label="Manage System Alerts"
                address="manage-system-alerts"
                textSize="xs"
            />

             
          </div>  
        </>
    );
};

export default ContentManagementDropdown;