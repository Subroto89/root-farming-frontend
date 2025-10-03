import React, { useState } from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';
import LandManagementDropdown from './LandManagementDropdown';
import { ChevronDown, ChevronRight, LandPlot } from 'lucide-react';

const LandManagementButton = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleSidebar = () => {
        setIsMenuOpen(prev => !prev)
    }
    return (
        <>
            <div onClick={toggleSidebar}  className="flex justify-between items-center space-x-1">
                <NavButton
                    label="Land Management"
                    icon={ LandPlot }
                />
                {!isMenuOpen ? <ChevronRight size={18}/> : <ChevronDown size={18}/>}
            </div>   

            <div>
                {
                    isMenuOpen && (
                        <LandManagementDropdown/>
                    )

                }
            </div>
        </>
    );
};

export default LandManagementButton;