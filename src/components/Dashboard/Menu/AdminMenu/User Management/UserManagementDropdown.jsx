import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';

const UserManagementDropdown = () => {
    return (
        <>
            <div className='flex flex-col items-start gap-2 p-2 rounded-lg'>
                 <NavButton
                    label="Manage Farmers"
                    address="/dashboard/manage-farmers"
                 />   

                 <NavButton
                    label="Manage Sellers"
                    address="/dashboard/manage-sellers"
                 />   

                 <NavButton
                    label="Manage Customers"
                    address="/dashboard/manage-customers"
                 />   
                 
                 <NavButton
                    label="Manage Agri Specialists"
                    address="/dashboard/manage-agri-specialists"
                 />   
            </div>   
        </>
    );
};

export default UserManagementDropdown;