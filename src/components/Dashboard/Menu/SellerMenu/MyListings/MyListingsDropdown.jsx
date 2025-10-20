import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';
import { useTheme } from '../../../../../hooks/useTheme';

const MyListingsDropdown = () => {
    const {theme} = useTheme();
     const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";

    return (
        <>
            <div className={`${themeForegroundStyle} pl-6 flex flex-col items-start w-60 border-t border-b border-gray-300`}>
                <NavButton
                    label="Add New Item"
                    address="/dashboard/add-new-item"
                    textSize="xs"
                />    

                <NavButton
                    label="Manage Existing Listings"
                    address="manage-existing-listings"
                    textSize="xs"
                />

                <NavButton
                    label="View Listing Status"
                    address="view-listing-status"
                    textSize="xs"
                />
            </div>   
        </>
    );
};

export default MyListingsDropdown;