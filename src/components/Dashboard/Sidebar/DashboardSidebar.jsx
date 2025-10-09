import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
// import { useTheme } from "../../../hooks/useTheme";
import LoadingSpinner from "../../shared/LoadingSpinner";

import useUserRole from "../../../hooks/useUserRole";
import RFLogo from "../../shared/RFLogo";
import UserPhoto from "./UserPhoto";
import UserWiseMenu from "./UserWiseMenu";
import ThemeSwitcher from "../../shared/ThemeSwitcher";
import LogoutButton from "./LogoutButton";
import UpdateProfileButton from "./UpdateProfileButton";

const DashboardSidebar = ({ isSideBarOpen, toggleMenu }) => {
  const { user, loading: authLoading } = useAuth();
  const { userRole, userRoleLoading } = useUserRole();

  if (authLoading || userRoleLoading) return <LoadingSpinner />;
  if (authLoading) return <LoadingSpinner />;

  return (
    <>
      <nav
        className={`fixed top-0 w-56 md:w-68 h-screen bg-green-300 shadow-xl flex flex-col justify-between
             md:fixed md:translate-x-0 transform ${
               !isSideBarOpen && "-translate-x-full"
             }  transition duration-200 ease-in-out z-10`}
      >
        {/*---------------------------------------------------------------
        Sidebar Logo - For Large Screen Only 
        ---------------------------------------------------------------*/}
        <div className="hidden md:block text-center mt-4">
          <RFLogo />
        </div>

        {/* ---------------------------------------------------------------
            User Photo
        ---------------------------------------------------------------- */}
        <div className="flex flex-col justify-center items-center">
          <Link to="/dashboard" className="mb-2">
            <UserPhoto />
          </Link>
          <h2 className="text-md">{user && user?.email}</h2>
          <h3 className="text-sm font-semibold">{userRole}</h3>
        </div>
        {/* ---------------------------------------------------------------
            User Role Wise Menu
        ---------------------------------------------------------------- */}
        <div className="flex-1 overflow-y-auto">
          <UserWiseMenu />
        </div>

        {/* ---------------------------------------------------------------
            Bottom Section(Update Profile, Theme Switcher, and Logout Sec)
        ---------------------------------------------------------------- */}

        <div className="flex flex-col items-center mb-6 mt-6">
          <UpdateProfileButton />
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <LogoutButton />
          </div>
        </div>
      </nav>
    </>
  );
};

export default DashboardSidebar;
