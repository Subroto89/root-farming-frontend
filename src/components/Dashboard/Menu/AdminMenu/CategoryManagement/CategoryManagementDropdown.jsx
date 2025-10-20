import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';
import { useTheme } from '../../../../../hooks/useTheme';

const CategoryManagementDropdown = () => {
    const {theme} = useTheme();
    const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
    return (
        <>
         <div  className={`${themeForegroundStyle} pl-6 flex flex-col items-start border-t border-b border-gray-300`}>
            <NavButton
                label="Manage Product Type"
                address="/dashboard/manage-product-type"
                textSize="xs"
            />

            <NavButton
                label="Manage Product Category"
                address="/dashboard/management-product-category"
                textSize="xs"
            />

            <NavButton
                label="Manage Product SubCategory"
                address="/dashboard/manage-product-subCategory"
                textSize="xs"
            />

            <NavButton
                label="Manage Product Variant"
                address="/dashboard/manage-product-variant"
                textSize="xs"
            />
         </div>   
        </>
    );
};

export default CategoryManagementDropdown;