import React, { useState } from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';
import CropManagementDropdown from './CropManagementDropdown';
import { ChevronDown, ChevronRight, Vegan } from 'lucide-react';

const CropManagementButton = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleSidebar = () => {
        setIsMenuOpen(prev => !prev);
    }

    return (
        <>
          <div onClick={toggleSidebar}  className="flex justify-between items-center space-x-1">
            <NavButton
                label="Crop Management"
                icon={ Vegan }
            />
            {!isMenuOpen ? <ChevronRight size={18}/> : <ChevronDown size={18}/>}
          </div>  

          <div>
            {
                isMenuOpen && (
                    <CropManagementDropdown/>
                )
            }
          </div>
        </>
    );
};

export default CropManagementButton;