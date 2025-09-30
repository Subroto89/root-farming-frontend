import React, { useState } from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';
import CropManagementDropdown from './CropManagementDropdown';

const CropManagementButton = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    }

    return (
        <>
          <div onClick={toggleSidebar} className='relative'>
            <NavButton
                label="Crop Management"
            />
          </div>  

          <div className='absolute top-0 -right-2'>
            {
                isSidebarOpen && (
                    <CropManagementDropdown/>
                )
            }
          </div>
        </>
    );
};

export default CropManagementButton;