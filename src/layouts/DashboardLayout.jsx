import { Outlet } from 'react-router';
import Sidebar from '../pages/DashboardPage/Sidebar/Sidebar';
import { Toaster } from 'react-hot-toast';
import Topbar from '../pages/DashboardPage/Sidebar/Topbar';

const DashboardLayout = () => {
  return (
    <div className="relative flex  min-h-screen ">
      {/* Left Side: Sidebar Component */}
      <div className="bg-white h-screen sticky top-0">
        <Sidebar />
      </div>

      <div className="flex-1 overflow-y-auto">
        <Topbar />
        <div className="p-5 ">
          <div className="p-5 md:ml-64">
            {/* Outlet for dynamic contents */}
            <Outlet />
          </div>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default DashboardLayout;
