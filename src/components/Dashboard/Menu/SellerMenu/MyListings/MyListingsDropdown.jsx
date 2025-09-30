import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';

const MyListingsDropdown = () => {
    return (
        <>
            <div className='flex flex-col items-start p-2 rounded-lg'>
                <NavButton
                    label="Add New Crop"
                    address="/dashboard/add-new-crop"
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