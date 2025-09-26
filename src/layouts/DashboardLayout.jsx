import React from "react";
import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import Sidebar from '../pages/DashboardPage/Sidebar/Sidebar';
import Topbar from '../pages/DashboardPage/Sidebar/Topbar';



const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-gray-50 dark:bg-gray-900">
      {/* Left Side: Sidebar Component */}
      <div >
        <Sidebar />
      </div>

      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1">
        {/* <Topbar /> */}
        <div className="p-5 md:ml-64">
          {/* Outlet for dynamic contents */}
          <Outlet />
          <Toaster
            position="top-right"
            toastOptions={{
              className:
                "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
