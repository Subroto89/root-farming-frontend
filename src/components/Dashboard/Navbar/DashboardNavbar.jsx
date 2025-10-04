import { Link } from "react-router";
import RFLogo from "../../shared/RFLogo";
import { Menu, UserRound, X } from "lucide-react";


const DashboardNavbar = ({isSideBarOpen, toggleMenu}) => {

 
  return (
    <>
      <nav className="h-14 relative flex items-center justify-between gap-4 bg-gray-600 text-xl bg-gradient-to-b from-teal-50 to-gray-400 p-4 shadow-lg">
        {/* Logo Section */}
        <div className="w-40 rounded-lg overflow-hidden">
          <Link to="/">
            <RFLogo />
          </Link>
        </div>

        <div className="flex items-center justify-between gap-10">
          {/* Dashboard Small Screen - Hamburger Icon*/}
          <div
            onClick={toggleMenu}
            className="flex items-center justify-around w-24 border border-gray-200 p-2 rounded-full md:hidden"
          >
            {isSideBarOpen ? <X size={24} /> : <Menu size={24} />}

            <UserRound size={24} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default DashboardNavbar;
