import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';
import { useTheme } from '../../../../../hooks/useTheme';

const CategoryManagementDropdown = () => {
    const {theme} = useTheme();
     const dropDownStyle = theme === 'dark' ? 'navbar-dark' : 'navbar-light';
    return (
        <>
         <div  className={`${dropDownStyle} flex flex-col items-start border-t border-b border-gray-300`}>
            <NavButton
                label="Manage Product Type"
                address="/dashboard/manage-product-type"
            />

            <NavButton
                label="Manage Product Category"
                address="/dashboard/management-product-category"
            />

            <NavButton
                label="Manage Product SubCategory"
                address="/dashboard/manage-product-subCategory"
            />

            <NavButton
                label="Manage Product Variant"
                address="/dashboard/manage-product-variant"
            />
         </div>   
        </>
    );
};

export default CategoryManagementDropdown;