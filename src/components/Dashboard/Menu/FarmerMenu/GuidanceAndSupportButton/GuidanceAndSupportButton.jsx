import React, { useState } from 'react';
import GuidanceAndSupportButtonDropdown from './GuidanceAndSupportButtonDropdown';
import NavButton from '../../../../shared/Buttons/NavButton';

const GuidanceAndSupportButton = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    }
    
    return (
        <>
            {/* Guidance & Support Button ----------- */}
            <div  onClick={toggleSidebar}> 
                <NavButton
                    label="Guidance & Support"
                />
            </div>

            {/* Dropdown ---------------------------- */}
            <div className='absolute top-0 -right-2'>
                {
                    isSidebarOpen && (
                        <GuidanceAndSupportButtonDropdown/>
                    )
                }
            </div>
        </>
    );
};

export default GuidanceAndSupportButton;