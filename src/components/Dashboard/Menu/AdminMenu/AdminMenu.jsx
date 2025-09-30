import NavButton from '../../../shared/Buttons/NavButton';
import ContentManagementButton from './ContentManagement/ContentManagementButton';
import FinancialAndCommissionsButton from './FinancialAndCommissions/FinancialAndCommissionsButton';
import UserManagementButton from './User Management/UserManagementButton';

const AdminMenu = () => {
    return (
        <>
            <div>

                <NavButton
                    label="Dashboard Home"
                    address="/dashboard"
                />

                <UserManagementButton/>

                <ContentManagementButton/>

                <FinancialAndCommissionsButton/>
                
                <NavButton 
                    label="Product Moderation"
                    address="/dashboard/product-moderation"/>

                <NavButton 
                    label="Reports & Analytics"
                    address="/dashboard/reports-and-analytics"/>        
                
                <NavButton
                    label="Category Management"
                    address="/dashboard/manage-categories"/>
          
                 <NavButton
                    label="Manage Banner Advertises"
                    address="/dashboard/manage-banner-advertises"/>
          
                 <NavButton
                    label="Blogs Management"
                    address="/dashboard/blogs-management"/>
                
            </div>
        </>
    );
};

export default AdminMenu;