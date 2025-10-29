import React from 'react';
import StatsGrid from '../../../components/FarmarDashboardComponents/OverViewComponents/StatsGrid';
import CropGrowthChart from '../../../components/FarmarDashboardComponents/OverViewComponents/CropGrowthChart';
import InventoryChart from '../../../components/FarmarDashboardComponents/OverViewComponents/InventoryChart';
import WeatherChart from '../../../components/FarmarDashboardComponents/OverViewComponents/WeatherChart';
import { useTheme } from '../../../hooks/useTheme';

const FarmerDashboardHome = () => {
  const { theme } = useTheme();
  const themeBackground =
    theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-light text-gray-900';

  // Demo static data
  const stats = {
    totalFields: 12,
    activeCrops: 7,
    pendingActivities: 3,
    lowStockItems: 2,
  };

  const cropGrowthData = [
    { name: 'Tomato', progress: 70, health: 90 },
    { name: 'Corn', progress: 50, health: 80 },
    { name: 'Potato', progress: 30, health: 70 },
  ];

  const inventoryData = [
    { name: 'Fertilizer', quantity: 20, reorderLevel: 5 },
    { name: 'Seeds', quantity: 50, reorderLevel: 10 },
    { name: 'Pesticide', quantity: 10, reorderLevel: 5 },
  ];

  const weatherData = [
    { name: 'Sunny', value: 3 },
    { name: 'Rainy', value: 2 },
    { name: 'Cloudy', value: 1 },
  ];

  return (
    <div
      className={`min-h-screen py-12 px-6 transition-colors duration-500 ${themeBackground}`}
    >
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Farmer Dashboard</h1>
        <p className="mt-2 text-lg opacity-80">Smart overview for your farm</p>
      </div>

      {/* Stats */}
      <StatsGrid stats={stats} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <CropGrowthChart data={cropGrowthData} />
        <InventoryChart data={inventoryData} />
        <WeatherChart data={weatherData} />
      </div>
    </div>
  );
};

export default FarmerDashboardHome;
