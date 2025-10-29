import { Link } from "react-router";
import RFLogo from "../../shared/RFLogo";
import { Menu, X } from "lucide-react";
import NavbarContent from "./NavbarContent";


const DashboardNavbar = ({isSideBarOpen, toggleMenu}) => {
  return (
    <>
      <nav className="h-14 relative flex items-center justify-between gap-4 bg-gray-600 text-xl bg-gradient-to-b from-teal-50 to-gray-400 p-4 shadow-lg">
        {/* Logo Section */}
        <div className="w-40 rounded-lg overflow-hidden">
            <RFLogo />
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Dashboard Navigation Content */}
          <div className="hidden md:block">
            <NavbarContent />
          </div>

          {/* Dashboard Small Screen - Hamburger Icon*/}
          <div
            onClick={toggleMenu}
            className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-full md:hidden"
          >
            {isSideBarOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default DashboardNavbar;
