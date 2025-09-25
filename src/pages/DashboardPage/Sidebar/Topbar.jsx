import React from 'react';
import { Sun, Bell, Settings, User, Search } from 'lucide-react';

const Topbar = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white shadow">
      {/* SEARCH BAR */}
      <div className="flex items-center w-full sm:w-auto bg-gray-100 rounded-md px-2">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none px-2 py-1 w-full sm:w-64 text-gray-700 placeholder-gray-500"
        />
        <button className="p-2 text-gray-600 hover:text-blue-500">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* ICONS */}
      <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto space-x-4 text-gray-700">
        <button className="p-2 rounded-full hover:bg-gray-200">
          <Sun className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200">
          <User className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
