import React, { useState } from 'react';
import GuidanceAndSupportButtonDropdown from './GuidanceAndSupportButtonDropdown';
import NavButton from '../../../../shared/Buttons/NavButton';
import { ChevronDown, ChevronRight, Info } from 'lucide-react';

const GuidanceAndSupportButton = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleSidebar = () => {
        setIsMenuOpen(prev => !prev);
    }
    
    return (
        <>
            {/* Guidance & Support Button ----------- */}
            <div  onClick={toggleSidebar}  className="flex justify-between items-center space-x-1"> 
                <NavButton
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