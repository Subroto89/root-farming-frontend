import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../pages/DashboardPage/Sidebar/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-gray-50 dark:bg-gray-900">
      {/* Left Side: Sidebar Component */}
      <Sidebar />

      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1 md:ml-64">
        <div className="p-5">
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
