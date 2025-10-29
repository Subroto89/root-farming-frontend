import React from 'react';
import { Sprout, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';

const StatsGrid = ({ stats }) => {
  const { theme } = useTheme();
  const themeCard =
    theme === 'dark'
      ? 'bg-gray-800 text-white border-gray-700'
      : 'bg-white text-gray-900 border-gray-200';

  const items = [
    {
      title: 'Total Fields',
      value: stats.totalFields,
      icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
    },
    {
      title: 'Active Crops',
      value: stats.activeCrops,
      icon: <Sprout className="w-6 h-6 text-green-500" />,
    },
    {
      title: 'Pending Activities',
      value: stats.pendingActivities,
      icon: <Calendar className="w-6 h-6 text-yellow-500" />,
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStockItems,
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, i) => (
        <div
          key={i}
          className={`p-6 border rounded-2xl shadow-md flex items-center gap-4 transition-transform hover:scale-105 ${themeCard}`}
        >
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            {item.icon}
          </div>
          <div>
            <p className="text-sm opacity-80">{item.title}</p>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;

