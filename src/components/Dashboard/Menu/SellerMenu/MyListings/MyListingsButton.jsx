import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';
import MyListingsDropdown from './MyListingsDropdown';

const MyListingsButton = () => {
    return (
        <>
            {/* My Listings Button ----------------- */}
            <div className='relative'>
                <NavButton
                    label="My Listings"
                />
            </div>

            {/* My Listings Dropdown --------------- */}
            <div className='absolute top-0 -right-2'>
                <MyListingsDropdown/>
            </div>   
        </>
    );
};

export default MyListingsButton;