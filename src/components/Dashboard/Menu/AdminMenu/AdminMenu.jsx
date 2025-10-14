import { ChartScatter, House, Rss, Shapes, ShieldCheck } from 'lucide-react';
import NavButton from '../../../shared/Buttons/NavButton';
import ContentManagementButton from './ContentManagement/ContentManagementButton';
import FinancialAndCommissionsButton from './FinancialAndCommissions/FinancialAndCommissionsButton';
import UserManagementButton from './User Management/UserManagementButton';
import CategoryManagementButton from './CategoryManagement/CategoryManagementButton';

const AdminMenu = () => {
    return (
        <>
            <div>

                <NavButton
                    label="Dashboard Home"
                    address="/dashboard"
                    icon={House}
                />

                <UserManagementButton/>

                <ContentManagementButton/>

                <FinancialAndCommissionsButton/>
                
                <NavButton 
                    label="Product Moderation"
                    address="/dashboard/product-moderation"
                    icon={ ShieldCheck }
                />

                <NavButton 
                    label="Reports & Analytics"
                    address="/dashboard/reports-and-analytics"
                    icon={ ChartScatter }
                />        
                
          
                 {/* <NavButton
                    label="Manage Banner Advertises"
                    address="/dashboard/manage-banner-advertises"/> */}
          
                 <NavButton
                    label="Blogs Management"
                    address="/dashboard/blogs-management"
                    icon={ Rss }    
                />

                <CategoryManagementButton/>
                
            </div>
        </>
    );
};

export default AdminMenu;