import React, { useState } from 'react';
import Button from '../../../../shared/Buttons/Button';
import { Shapes } from 'lucide-react';
import CategoryManagementDropdown from './CategoryManagementDropdown';

const CategoryManagementButton = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalToggle = () => {
        setIsModalOpen(prev => !prev);
    }
    return (
        <>
            {/* Category Management Button ---------------------------------- */}
            <Button
                icon={Shapes}
                label="Category Management"
                onClick={handleModalToggle}
                address="/dashboard/category-management"
            />


            {/* Category Management Dropdown --------------------------------- */}
            <div>
                {isModalOpen && (
                    <CategoryManagementDropdown/>
                )}
            </div>
        </>
    );
};

export default CategoryManagementButton;