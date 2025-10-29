import useUserRole from '../../../hooks/useUserRole';
import AdminMenu from '../Menu/AdminMenu/AdminMenu';
import AgriSpecialistMenu from '../Menu/AgriSpecialistMenu/AgriSpecialistMenu';
import CustomerMenu from '../Menu/CustomerMenu/CustomerMenu';
import FarmerMenu from '../Menu/FarmerMenu/FarmerMenu';
import SellerMenu from '../Menu/SellerMenu/SellerMenu';

const UserWiseMenu = () => {
  // const { userRole } = useUserRole();
  const userRole = "admin"; //hardcoded for testing purpose

  return (
    <>
      <div>
        {userRole === 'admin' ? (
          <AdminMenu />
       ) : userRole === 'seller' ? (
          <SellerMenu />
        ) : userRole === 'customer' ? (
          <CustomerMenu />
        ) : userRole === 'farmer' ? (
          <FarmerMenu />
        ) : userRole === 'agri-specialist' ? (
          <AgriSpecialistMenu />
        ) : (
          <h2>No menu</h2>
        )}
      </div>
    </>
  );
};
export default UserWiseMenu;
