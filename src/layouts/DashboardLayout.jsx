import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import DashboardNavbar from "../components/Dashboard/Navbar/DashboardNavbar";
import DashboardSidebar from "../components/Dashboard/Sidebar/DashboardSidebar";
import CustomChatbot from "../components/CustomChatbot/CustomChatbot";

const DashboardLayout = () => {
   const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const toggleMenu = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const {pathname}=useLocation()
  useEffect(()=>{
   window.scrollTo({ top: 0, behavior: "smooth" });
  },[pathname])

  return (
    <>
      <div className="relative flex flex-col min-h-screen bg-gray-100">
        <CustomChatbot defaultOpen={false} />
        {/* ------------------------------------------------------------
            Dashboard Navbar For Small Screen Only Section
            ------------------------------------------------------------ */}
        <div className="fixed md:hidden top-0 z-20 inset-x-0">
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
          <div className="w-full md:pl-68 pt-24 md:pt-0">
            <Outlet />
          </div>
          {/* ------------------------------------------------------------ */}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
