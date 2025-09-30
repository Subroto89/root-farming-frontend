import React, { useState } from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';
import MyOrdersDropdown from './MyOrdersDropdown';

const MyOrdersButton = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev)
    }
    return (
        <>
        {/* My Orders Button -------------------------- */}
         <div onClick={toggleDropdown} className='relative'>
            <NavButton
                label="My Orders"
            />
        </div>


        {/* My Orders Dropdown ------------------------- */}
        <div className='absolute top-0 -right-2'>
           {
                isDropdownOpen && (
                    <MyOrdersDropdown/>
                )

           }
           
        </div>   
        </>
    );
};

export default MyOrdersButton;