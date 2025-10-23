import React, { useState } from 'react';
import GuidanceAndSupportButtonDropdown from './GuidanceAndSupportButtonDropdown';
import { ChevronDown, ChevronRight, Info } from 'lucide-react';
import Button from '../../../../shared/Buttons/Button';

const GuidanceAndSupportButton = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleSidebar = () => {
        setIsMenuOpen(prev => !prev);
    }
    
    return (
        <>
            {/* Guidance & Support Button ----------- */}
            <div  onClick={toggleSidebar}  className="flex justify-between items-center space-x-1"> 
                <Button
                    label="Guidance & Support"
                    icon={ Info }
                />
                {!isMenuOpen ? <ChevronRight size={18}/> : <ChevronDown size={18}/>}
            </div>

            {/* Dropdown ---------------------------- */}
            <div>
                {
                    isMenuOpen && (
                        <GuidanceAndSupportButtonDropdown/>
                    )
                }
            </div>
        </>
    );
};

export default GuidanceAndSupportButton;