import React, { useState } from 'react';
import CropManagementDropdown from './CropManagementDropdown';
import { ChevronDown, ChevronRight, Vegan } from 'lucide-react';
import Button from '../../../../shared/Buttons/Button';

const CropManagementButton = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleSidebar = () => {
        setIsMenuOpen(prev => !prev);
    }

    return (
        <>
          <div onClick={toggleSidebar}  className="flex justify-between items-center space-x-1">
            <Button
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