import React, { useState } from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';
import LandManagementDropdown from './LandManagementDropdown';

const LandManagementButton = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }
    return (
        <>
            <div className="relative" onClick={toggleSidebar}>
                <NavButton
                    label="Land Management"
                />
            </div>   

            <div className="absolute top-0 -right-2">
                {
                    isSidebarOpen && (
                        <LandManagementDropdown/>
                    )

                }
            </div>
        </>
    );
};

export default LandManagementButton;