// ===== Imports =====
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineFileSearch,
  AiOutlinePlus,
  AiOutlinePlusCircle,
  AiOutlineHistory,
  AiOutlineUserSwitch,
  AiOutlinePieChart,
} from 'react-icons/ai';
import { MdAddToPhotos, MdManageAccounts } from 'react-icons/md';
import { FaMoneyBillWave } from 'react-icons/fa';
import { Settings, LogOut, Menu, X } from 'lucide-react';
import logImage from '../../../assets/Logo/Rootfarming.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile sidebar toggle
  const [collapsed, setCollapsed] = useState(false); // collapse/expand on desktop

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setCollapsed(!collapsed);

  const activeClass =
    'bg-green-100 text-green-700 font-semibold rounded px-3 py-2 flex items-center gap-3';
  const normalClass =
    'hover:bg-gray-200 rounded px-3 py-2 flex items-center gap-3 text-gray-700';

  const profileLink = '/dashboard/my-profile';

  return (
    <>
      {/* Mobile Header */}
      <div className="bg-white border-b shadow-md md:hidden flex justify-between items-center p-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <img
            src={logImage}
            alt="Logo"
            className="h-12 w-12 rounded-full shadow"
          />
          <h2>
            Root <span className="text-yellow-300">Farming</span>
          </h2>
        </Link>
        <button onClick={toggleMenu} className="text-gray-700">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 ${collapsed ? 'w-20' : 'w-64'
          } bg-white  transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-all duration-300 ease-in-out flex flex-col justify-between`}
      >
        {/* Logo + Collapse */}
        <div className="p-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl overflow-hidden"
          >
            <img
              src={logImage}
              alt="Logo"
              className="h-12 w-12 rounded-full shadow"
            />
            {(!collapsed || isOpen) && (
              <h2>
                Root <span className="text-yellow-300">Farming</span>
              </h2>
            )}
          </Link>
          <button
            onClick={toggleCollapse}
            className="hidden md:block text-gray-600 hover:text-green-600"
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? 'Dashboard Home' : undefined}
          >
            <AiOutlineHome size={20} />
            {(!collapsed || isOpen) && <span>Dashboard Home</span>}
          </NavLink>

          {/* ADMIN LINKS */}
          <NavLink
            to="/dashboard/manageUsers"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? 'Manage Users' : undefined}
          >
            <AiOutlineTeam size={20} />
            {(!collapsed || isOpen) && <span>Manage Users</span>}
          </NavLink>

          <NavLink
            to="/dashboard/adminNews"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? 'Agri-News & Schemes' : undefined}
          >
            <AiOutlineFileSearch size={20} />
            {(!collapsed || isOpen) && <span>Agri-News & Schemes</span>}
          </NavLink>

          <NavLink
            to="/dashboard/adminBalance"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? 'Platform Balance' : undefined}
          >
            <FaMoneyBillWave size={20} />
            {(!collapsed || isOpen) && <span>Platform Balance</span>}
          </NavLink>

          {/* FARMER LINKS */}
          <NavLink
            to="/dashboard/daily-todo-list"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? 'Daily To-Do List' : undefined}
          >
            <AiOutlineFileSearch size={20} />
            {(!collapsed || isOpen) && <span>Daily To-Do List</span>}
          </NavLink>

          <NavLink
            to="/dashboard/field-registration"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? 'Field Registration' : undefined}
          >
            <MdAddToPhotos size={20} />
            {(!collapsed || isOpen) && <span>Field Registration</span>}
          </NavLink>

          <NavLink
            to="/dashboard/activity-scheduling"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? 'Activity Logging' : undefined}
          >
            <AiOutlineHistory size={20} />
            {(!collapsed || isOpen) && <span>Activity Logging</span>}
          </NavLink>

          <NavLink
            to="/dashboard/weather-forecast"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? 'Weather Forecast' : undefined}
          >
            <AiOutlineFileSearch size={20} />
            {(!collapsed || isOpen) && <span>Weather Forecast</span>}
          </NavLink>

          <NavLink
            to="/dashboard/resourceManagement"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? 'Resource Management' : undefined}
          >
            <MdManageAccounts size={20} />
            {(!collapsed || isOpen) && <span>Resource Management</span>}
          </NavLink>

          <NavLink
            to="/dashboard/cropsInventory"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? 'Crops Inventory' : undefined}
          >
            <AiOutlinePlus size={20} />
            {(!collapsed || isOpen) && <span>Crops Inventory</span>}
          </NavLink>

          <NavLink
            to="/dashboard/chatAgriSpecialist"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? 'Chat with Agri-specialist' : undefined}
          >
            <AiOutlineUserSwitch size={20} />
            {(!collapsed || isOpen) && <span>Chat with Agri-specialist</span>}
          </NavLink>

          {/* CUSTOMER LINKS */}
          <NavLink
            to="/dashboard/orderHistory"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? 'Order History' : undefined}
          >
            <AiOutlineHistory size={20} />
            {(!collapsed || isOpen) && <span>Order History</span>}
          </NavLink>

          <NavLink
            to="/dashboard/favorites"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? 'Favorite Crops' : undefined}
          >
            <AiOutlinePieChart size={20} />
            {(!collapsed || isOpen) && <span>Favorite Crops</span>}
          </NavLink>

          {/* AGRI-SPECIALIST LINKS */}
          <NavLink
            to="/dashboard/chatInbox"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? 'Farmer Chats' : undefined}
          >
            <AiOutlineTeam size={20} />
            {(!collapsed || isOpen) && <span>Farmer Chats</span>}
          </NavLink>

          <NavLink
            to="/dashboard/addBlog"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? 'Add Blog/Advice' : undefined}
          >
            <AiOutlinePlusCircle size={20} />
            {(!collapsed || isOpen) && <span>Add Blog/Advice</span>}
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="border-t p-4 space-y-2">
          <Link
            to={profileLink}
            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 rounded text-gray-700"
            onClick={() => setIsOpen(false)}
            title={collapsed ? 'Profile' : undefined}
          >
            <Settings size={20} />
            {(!collapsed || isOpen) && <span className="font-medium">Profile</span>}
          </Link>

          <button
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded"
            title={collapsed ? 'Logout' : undefined}
          >
            <LogOut size={20} />
            {(!collapsed || isOpen) && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
