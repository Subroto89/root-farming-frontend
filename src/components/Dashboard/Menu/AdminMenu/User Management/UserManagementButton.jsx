import React from 'react';
import UserManagementDropdown from './UserManagementDropdown';
import NavButton from '../../../../shared/Buttons/NavButton';

const UserManagementButton = () => {
    return (
        <>
            {/* User Management Button ----------------------- */}
            <div className='relative'>
                <NavButton
                    label="User Management"
                />
            </div>

            {/* User Management Dropdown --------------------  */}
            <div className='absolute right-0 top-0'>
                <UserManagementDropdown/>
            </div>   
        </>
    );
};

export default UserManagementButton;