import React from "react";
import { Droplets, Wind, Eye } from "lucide-react";
import WeatherIcon from "./WeatherIcon";

const WeatherCard = ({ data, locationName }) => {
  if (!data) return null;

  return (
    <div className="flex-1 flex justify-center ">
      <div className="relative w-full max-w-sm bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-6 sm:p-10 text-center hover:scale-105 transition-transform duration-500 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/20 via-white/5 to-teal-200/10 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition"></div>
        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-full bg-white/40 flex items-center justify-center shadow-inner border border-gray-300/30 backdrop-blur-md">
          <WeatherIcon condition={data.condition} />
        </div>
        <p className="font-bold text-2xl sm:text-3xl text-gray-800 -mt-2 mb-2">
          {locationName}
        </p>
        <p className="font-semibold text-lg sm:text-xl text-gray-800">
          {data.day}
        </p>
        <p className="text-5xl sm:text-6xl font-extrabold text-gray-900 my-4 drop-shadow-lg">
          {data.temp}°C
        </p>
        <p className="text-md capitalize text-gray-700 tracking-wide mb-8 italic">
          {data.condition}
        </p>
        <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center">
          <div>
            <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-1" />
            <p className="text-sm font-medium text-gray-800">
              {data.humidity}%
            </p>
            <span className="text-xs text-gray-500">Humidity</span>
          </div>
          <div>
            <Wind className="h-6 w-6 text-green-500 mx-auto mb-1" />
            <p className="text-sm font-medium text-gray-800">
              {data.windSpeed} km/h
            </p>
            <span className="text-xs text-gray-500">Wind</span>
          </div>
          <div>
            <Eye className="h-6 w-6 text-indigo-500 mx-auto mb-1" />
            <p className="text-sm font-medium text-gray-800">
              {data.visibility} km
            </p>
            <span className="text-xs text-gray-500">Visibility</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
