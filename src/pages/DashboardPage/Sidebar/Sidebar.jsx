// ===== Imports =====
import React, { useState } from "react";
import { NavLink, Link } from "react-router";
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
} from "react-icons/ai";
import { MdAddToPhotos, MdManageAccounts } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import {
  Settings,
  LogOut,
  Menu,
  X,
  User,
  MessageCircle,
  Cloud,
  Package,
  Calendar,
  MapPin,
  Home,
} from "lucide-react";
import logImage from "../../../assets/Logo/Rootfarming.png";

// Hooks
// import useUserRole from '@/hooks/useUserRole';
// import LoadingSpinner from '@/components/LoadingSpinner';

const Sidebar = () => {
  // const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: "/", icon: Home, label: "Overview" },
    { path: "field-registration", icon: MapPin, label: "Field Registration" },
    { path: "activity-scheduling", icon: Calendar, label: "Activity Logging" },
    {
      path: "resource-management",
      icon: Package,
      label: "Resource Management",
    },
    { path: "weather-forecast", icon: Cloud, label: "Weather Forecast" },
    { path: "chat-specialist", icon: MessageCircle, label: "Chat Specialist" },
    { path: "my-profile", icon: User, label: "My Profile" },
  ];

  // ===== Hooks =====
  // const { signOutUser } = useAuth(); // from your first code

  // const [role, isRoleLoading] = useUserRole();
  // if (isRoleLoading) return <LoadingSpinner />;

  // ===== State Management =====
  const [isOpen, setIsOpen] = useState(false); // mobile sidebar toggle
  const [collapsed, setCollapsed] = useState(false); // collapse/expand on desktop

  // ===== Handlers =====
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setCollapsed(!collapsed);

  // ===== NavLink Classes =====
  const activeClass =
    "bg-green-100 text-green-700 font-semibold rounded px-3 py-2 flex items-center gap-3";
  const normalClass =
    "hover:bg-gray-200 rounded px-3 py-2 flex items-center gap-3 text-gray-700";

  // Profile link path
  const profileLink = "/dashboard/my-profile";

  return (
    <>
      {/* ===== Mobile Header ===== */}
      <div className="bg-white  shadow-md md:hidden flex justify-between items-center p-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          {/* Logo Placeholder */}
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

      {/* ===== Sidebar Container ===== */}
      <div
        className={`fixed inset-y-0 left-0 z-40 ${
          collapsed ? "w-20" : "w-64"
        } bg-white  transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-all duration-300 ease-in-out flex flex-col justify-between`}
      >
        {/* ===== Logo & Collapse Button ===== */}
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
            {!collapsed && (
              <h2>
                Root <span className="text-yellow-300">Farming</span>
              </h2>
            )}
          </Link>
          <button
            onClick={toggleCollapse}
            className="hidden md:block text-gray-600 hover:text-green-600"
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* ===== Menu Section ===== */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* --- Dashboard Home --- */}
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? "Dashboard Home" : undefined}
          >
            <AiOutlineHome size={20} />
            {!collapsed && <span>Dashboard Home</span>}
          </NavLink>

          {/* ===== ADMIN LINKS ===== */}
          <NavLink
            to="/dashboard/manageUsers"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? "Manage Users" : undefined}
          >
            <AiOutlineTeam size={20} />
            {!collapsed && <span>Manage Users</span>}
          </NavLink>

          <NavLink
            to="/dashboard/adminNews"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? "Agri-News & Schemes" : undefined}
          >
            <AiOutlineFileSearch size={20} />
            {!collapsed && <span>Agri-News & Schemes</span>}
          </NavLink>

          <NavLink
            to="/dashboard/adminBalance"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? "Platform Balance" : undefined}
          >
            <FaMoneyBillWave size={20} />
            {!collapsed && <span>Platform Balance</span>}
          </NavLink>

          {/* ===== FARMER LINKS ===== */}
          <NavLink
            to="/dashboard/daily-todo-list"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? "Daily To-Do List" : undefined}
          >
            <AiOutlineFileSearch size={20} />{" "}
            {/* You can change the icon if you like */}
            {!collapsed && <span>Daily To-Do List</span>}
          </NavLink>

          <NavLink
            to="/dashboard/field-registration"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? "Field Registration" : undefined}
          >
            <MdAddToPhotos size={20} />
            {!collapsed && <span>Field Registration</span>}
          </NavLink>

          <NavLink
            to="/dashboard/activity-scheduling"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? "Activity Logging" : undefined}
          >
            <AiOutlineHistory size={20} />
            {!collapsed && <span>Activity Logging</span>}
          </NavLink>
          <NavLink
            to="/dashboard/weather-forecast"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? "Weather Forecast" : undefined}
          >
            <AiOutlineFileSearch size={20} />{" "}
            {/* You can choose another icon if needed */}
            {!collapsed && <span>Weather Forecast</span>}
          </NavLink>

          <NavLink
            to="/dashboard/activity-scheduling"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? "Activity Logging" : undefined}
          >
            <AiOutlineHistory size={20} />
            {!collapsed && <span>Activity Logging</span>}
          </NavLink>

          <NavLink
            to="/dashboard/resourceManagement"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? "Resource Management" : undefined}
          >
            <MdManageAccounts size={20} />
            {!collapsed && <span>Resource Management</span>}
          </NavLink>

          <NavLink
            to="/dashboard/cropsInventory"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? "Crops Inventory" : undefined}
          >
            <AiOutlinePlus size={20} />
            {!collapsed && <span>Crops Inventory</span>}
          </NavLink>

          <NavLink
            to="/dashboard/chatAgriSpecialist"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? "Chat with Agri-specialist" : undefined}
          >
            <AiOutlineUserSwitch size={20} />
            {!collapsed && <span>Chat with Agri-specialist</span>}
          </NavLink>

          {/* ===== CUSTOMER LINKS ===== */}
          <NavLink
            to="/dashboard/orderHistory"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? "Order History" : undefined}
          >
            <AiOutlineHistory size={20} />
            {!collapsed && <span>Order History</span>}
          </NavLink>

          <NavLink
            to="/dashboard/favorites"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? "Favorite Crops" : undefined}
          >
            <AiOutlinePieChart size={20} />
            {!collapsed && <span>Favorite Crops</span>}
          </NavLink>

          {/* ===== AGRI-SPECIALIST LINKS ===== */}
          <NavLink
            to="/dashboard/chatInbox"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? "Farmer Chats" : undefined}
          >
            <AiOutlineTeam size={20} />
            {!collapsed && <span>Farmer Chats</span>}
          </NavLink>

          <NavLink
            to="/dashboard/addBlog"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
            onClick={() => setIsOpen(false)}
            title={collapsed ? "Add Blog/Advice" : undefined}
          >
            <AiOutlinePlusCircle size={20} />
            {!collapsed && <span>Add Blog/Advice</span>}
          </NavLink>
        </nav>

        {/* ===== Footer Section ===== */}
        <div className="border-t p-4 space-y-2">
          {/* --- Profile Link --- */}
          <Link
            to={profileLink}
            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 rounded text-gray-700"
            onClick={() => setIsOpen(false)}
            title={collapsed ? "Profile" : undefined}
          >
            <Settings size={20} />
            {!collapsed && <span className="font-medium">Profile</span>}
          </Link>

          {/* --- Logout Button --- */}
          <button
            // onClick={signOutUser}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded"
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut size={20} />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
