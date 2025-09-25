import React from "react";
import { Cloud, Sun, CloudRain } from "lucide-react";

const iconMap = {
  sunny: (
    <Sun className="h-16 w-16 text-yellow-500 drop-shadow-md animate-pulse" />
  ),
  cloudy: <Cloud className="h-16 w-16 text-gray-500 drop-shadow-md" />,
  rainy: (
    <CloudRain className="h-16 w-16 text-blue-500 drop-shadow-md animate-pulse" />
  ),
};

const WeatherIcon = ({ condition }) => {
  return iconMap[condition] || iconMap.sunny; // Default to sunny icon
};

export default WeatherIcon;
