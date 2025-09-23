import React, { useState } from 'react';
import { NavLink} from 'react-router';
import { 
  Home, 
  MapPin, 
  Calendar, 
  Package, 
  Cloud, 
  MessageCircle, 
  Wheat, 
  User,
  Menu,
  X,
  Leaf
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/', icon: Home, label: 'Overview' },
    { path: 'field-registration', icon: MapPin, label: 'Field Registration' },
    { path: 'activity-scheduling', icon: Calendar, label: 'Activity Logging' },
    { path: 'resource-management', icon: Package, label: 'Resource Management' },
    { path: 'weather-forecast', icon: Cloud, label: 'Weather Forecast' },
    { path: 'chat-specialist', icon: MessageCircle, label: 'Chat Specialist' },
    { path: 'my-profile', icon: User, label: 'My Profile' },
  ];

  return (
    <>
      {/* Sidebar */}
      <div className={`lg:static inset-y-0 left-0 z-40 w-64  h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-8 border-b border-gray-200">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="ml-3  font-bold text-gray-800">Farmer Dashboard</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'} 
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-green-100 text-green-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <IconComponent className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* User info */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                alt="User"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Harun Mia</p>
                <p className="text-xs text-gray-500">Farmer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Sidebar;
