import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';

const MyListingsDropdown = () => {
    return (
        <>
            <div className='flex flex-col items-start w-60 border-t border-b border-gray-300'>
                <NavButton
                    label="Add New Item"
                    address="/dashboard/add-new-item"
                />    

                <NavButton
                    label="Manage Existing Listings"
                    address="manage-existing-listings"
                />

                <NavButton
                    label="View Listing Status"
                    address="view-listing-status"
                />
            </div>   
        </>
    );
};

export default MyListingsDropdown;