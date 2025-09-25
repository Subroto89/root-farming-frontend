import React from "react";
import WeatherIcon from "./WeatherIcon";

const ForecastItem = ({ day }) => {
  return (
    <div className="relative bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-xl border border-gray-300/20 rounded-2xl shadow-md p-4 sm:p-6 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-100/20 via-white/10 to-emerald-100/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-80 transition"></div>
      <div className="relative">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full bg-white/40 flex items-center justify-center shadow-inner border border-gray-300/30 backdrop-blur-md">
          <WeatherIcon condition={day.condition} />
        </div>
        <p className="font-semibold text-base sm:text-lg text-gray-800">
          {day.day}
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
          {day.temp}°C
        </p>
        <p className="text-sm capitalize text-gray-600">{day.condition}</p>
      </div>
    </div>
  );
};

export default ForecastItem;
