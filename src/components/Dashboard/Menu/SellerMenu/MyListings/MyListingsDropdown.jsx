import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';

const MyListingsDropdown = () => {
    return (
        <>
            <div className='flex flex-col items-start px-1 rounded-lg bg-green-200 ml-8 w-full border border-white'>
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