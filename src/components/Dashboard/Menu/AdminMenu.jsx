import React from 'react';
import NavButton from '../../shared/Buttons/NavButton';

const AdminMenu = () => {
    return (
        <>
            <div>
                <NavButton
                    label="Dashboard Home"
                    address="/dashboard/dashboard-home"/>
                    
                <NavButton 
                    label="User Management"
                    address="/dashboard/users-management"/>

                <NavButton 
                    label="Content Management"
                    address="/dashboard/content-management"/>

                <NavButton 
                    label="Financial & Commission"
                    address="/dashboard/financial-and-commission"/>

                <NavButton 
                    label="Product Moderation"
                    address="/dashboard/product-moderation"/>

                <NavButton 
                    label="Reports & Analytics"
                    address="/dashboard/reports-and-analytics"/>

                <NavButton 
                    label="Payment Management"
                    address="/dashboard/payment-management"/>

                <NavButton
                    label="Sales Report"
                    address="/dashboard/sales-report"/>
                
                <NavButton
                    label="Category Management"
                    address="/dashboard/manage-categories"/>
          
                 <NavButton
                    label="Manage Banner Advertises"
                    address="/dashboard/manage-banner-advertises"/>

                <NavButton
                    label="Crops Management"
                    address="/dashboard/crops-management"/>
          
                 <NavButton
                    label="Blogs Management"
                    address="/dashboard/blogs-management"/>
                
            </div>
        </>
    );
};

export default AdminMenu;