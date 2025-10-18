import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';
import { useTheme } from '../../../../../hooks/useTheme';

const ContentManagementDropdown = () => {
    const {theme} = useTheme();
  const dropDownStyle = theme === 'dark' ? 'navbar-dark' : 'navbar-light';
    return (
        <>
          <div className={`${dropDownStyle} flex flex-col items-start border-t border-b border-gray-300`}>
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