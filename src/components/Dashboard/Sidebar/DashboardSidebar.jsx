import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useTheme } from "../../../hooks/useTheme";
// import LoadingSpinner from "../../shared/LoadingSpinner";

// import useUserRole from "../../../hooks/useUserRole";
import { FaSignOutAlt } from "react-icons/fa";
import RFLogo from "../../NavbarComponents/RFLogo";
import LoadingSpinner from "../../shared/LoadingSpinner";
import AdminMenu from "../Menu/AdminMenu/AdminMenu";
import SellerMenu from "../Menu/SellerMenu/SellerMenu";
import CustomerMenu from "../Menu/CustomerMenu/CustomerMenu";
import FarmerMenu from "../Menu/FarmerMenu/FarmerMenu";
import { Moon, Sun, UserRoundPen } from "lucide-react";

const DashboardSidebar = ({ isSideBarOpen, toggleMenu }) => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();

  const { loading: authLoading } = useAuth();
  //   const { userRole, userRoleLoading } = useUserRole();

  const userRole = "farmer";

  //   if (authLoading || userRoleLoading) return <LoadingSpinner />;
  if (authLoading) return <LoadingSpinner />;
  //   console.log(userRole);

  return (
    <>
      <nav
        className={`absolute w-56 md:w-64  inset-y-0 shadow-xl flex flex-col gap-20 md:fixed   md:translate-x-0 transform ${
          !isSideBarOpen && "-translate-x-full"
        }  transition duration-200 ease-in-out z-10`}
      >
        {/*---------------------------------------------------------------
        Sidebar Logo - For Large Screen Only 
        ---------------------------------------------------------------*/}
        <div className="hidden md:block w-full">
          <Link to="/">
            <RFLogo />
          </Link>
        </div>

        {/* ---------------------------------------------------------------
            Sidebar Menu
        ---------------------------------------------------------------- */}
        <div
          className=" w-full mt-24 md:mt-1 flex flex-col"
          onClick={toggleMenu}
        >
          <Link to="/dashboard">
            <div className="w-16 h-16 rounded-full overflow-hidden ml-24 ring ring-blue-500 hover:ring-blue-700 hover:shadow-md hover:scale-104">
              <img
                src={user?.photoURL}
                className="w-full h-full object-cover"
                title={user?.displayName}
              />
            </div>
          </Link>

          {/* User Wise Menu In The Middle Part ---------------------  */}
          <div className="flex-1">
            {userRole === "admin" ? (
              <AdminMenu />
            ) : userRole === "seller" ? (
              <SellerMenu />
            ) : userRole === "customer" ? (
              <CustomerMenu />
            ) : userRole === "farmer" ? (
              <FarmerMenu />
            ) : (
              <h2>No menu</h2>
            )}
          </div>

          <hr className="w-3/4 "/>

          <div
            className={`flex flex-col items-center mt-6  ${
              theme === "dark" ? "text-white" : "text-gray-800  "
            }`}
          >
            <Link
              to={`/update-profile/${user?.email}`}
              className="flex items-center justify-center gap-2 py-1 border-t border-b border-gray-400 hover:bg-green-500 hover:text-white cursor-pointer w-full mb-3  "
            >
              <UserRoundPen />
              Update Profile
            </Link>
            <div className="flex items-center gap-4">
              {/* -----------------------------------------------------------------------
                          Theme Toggler Icon
              ----------------------------------------------------------------------- */}
              <div onClick={() => toggleTheme()}>
                {theme === "dark" ? <Sun /> : <Moon />}
              </div>

              <button
                onClick={() => {
                  logOutUser(), navigate("/");
                }}
                className="flex items-center gap-2 border border-gray-400 rounded-md px-2 hover:bg-green-500 hover:text-white cursor-pointer"
              >
                Logout <FaSignOutAlt />{" "}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default DashboardSidebar;
