import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import AdminDashboardHome from '../../pages/DashboardPages/AdminDashboardPages/AdminDashboardHome';
import FarmerDashboardHome from '../../pages/DashboardPages/FarmerDashboardPages/FarmerDashboardHome';
import SellerDashboardHome from '../../pages/DashboardPages/SellerDashboardPages/SellerDashboardHome';
import CustomerDashboardHome from '../../pages/DashboardPages/CustomerDashboardPages/CustomerDashboardHome';
import AgriSpecialistDashboardHome from '../../pages/DashboardPages/AgriSpecialistDashboardPages/AgriSpecialistDashboardHome';
import useUserRole from '../../hooks/useUserRole';


const DashboardHome = () => {
  const { user, loading } = useAuth();
  const {userRole, userRoleLoading} = useUserRole(); 

  if (loading || userRoleLoading) {
    return <LoadingSpinner />;
  }
  console.log(userRole);
  if (!user) {
    return <div className="text-center py-20">Please log in to view your dashboard.</div>;
  }

  // Conditionally render the appropriate role-specific home page
  switch (userRole) {
    case 'admin':
      return <AdminDashboardHome />;
    case 'farmer':
        return <FarmerDashboardHome />;
    case 'agri-specialist':
        return <AgriSpecialistDashboardHome/>;
    case 'seller': 
      return <SellerDashboardHome />; 
    case 'customer':
      return <CustomerDashboardHome />;
    default:
      return <div className="text-center py-20">Welcome to your Dashboard! Role not recognized.</div>;
  }
};

export default DashboardHome;