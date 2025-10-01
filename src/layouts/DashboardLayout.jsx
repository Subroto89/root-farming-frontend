import { useState } from "react";
import { Outlet } from "react-router";
import DashboardNavbar from "../components/Dashboard/Navbar/DashboardNavbar";
import DashboardSidebar from "../components/Dashboard/Sidebar/DashboardSidebar";

const DashboardLayout = () => {
   const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const toggleMenu = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <>
      <div className="relative flex flex-col min-h-screen bg-gray-100">
        {/* ------------------------------------------------------------
            Dashboard Navbar For Small Screen Only Section
            ------------------------------------------------------------ */}
        <div className="absolute md:hidden top-0 z-20 inset-x-0">
          <DashboardNavbar isSideBarOpen={isSideBarOpen} toggleMenu={toggleMenu}/>
        </div>

        <div className="flex-1 gap-2 w-full">
          {/* ------------------------------------------------------------
          Sidebar Section
          ------------------------------------------------------------ */}
          <div>
            <DashboardSidebar
              isSideBarOpen={isSideBarOpen}
              toggleMenu={toggleMenu}
            />
          </div>
          {/* ------------------------------------------------------------
          Outlet Section
          ------------------------------------------------------------ */}
          <div className="w-full md:pl-64">
            <Outlet />
          </div>
          {/* ------------------------------------------------------------ */}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
