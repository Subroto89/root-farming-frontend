import { useAuth } from '../../../hooks/useAuth';
import TaskNotifications from '../../Farmer/Calendar/TaskNotifications';
import useUserRole from '../../../hooks/useUserRole';

const NavbarContent = () => {
  const { user } = useAuth();
  const { role } = useUserRole();

  return (
    <div className="flex items-center space-x-4">
      {/* Show notifications for farmers */}
      {role === 'farmer' && <TaskNotifications />}
      
      {/* User Profile Section */}
      <div className="flex items-center space-x-3">
        <div className="hidden md:block">
          <p className="text-sm font-medium text-gray-700">{user?.displayName}</p>
          <p className="text-xs text-gray-500 capitalize">{role}</p>
        </div>
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <img
            src={user?.photoURL || '/default-avatar.png'}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarContent;