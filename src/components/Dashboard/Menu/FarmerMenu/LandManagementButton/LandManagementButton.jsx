import React, { useState } from 'react';
import LandManagementDropdown from './LandManagementDropdown';
import { ChevronDown, ChevronRight, LandPlot } from 'lucide-react';
import Button from '../../../../shared/Buttons/Button';

const LandManagementButton = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleSidebar = () => {
        setIsMenuOpen(prev => !prev)
    }
    return (
        <>
            <div onClick={toggleSidebar}  className="flex justify-between items-center space-x-1">
                <Button
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