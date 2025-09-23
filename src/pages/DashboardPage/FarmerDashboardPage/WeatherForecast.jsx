import React, { useState } from 'react';
import { Cloud, Sun, CloudRain, Droplets, Wind, Eye } from 'lucide-react';

const WeatherForecast = () => {
  const [weeklyForecast] = useState([
    {
      day: 'Mon',
      temp: 24,
      condition: 'sunny',
      humidity: 65,
      windSpeed: 12,
      visibility: 10,
    },
    {
      day: 'Tue',
      temp: 22,
      condition: 'cloudy',
      humidity: 60,
      windSpeed: 10,
      visibility: 12,
    },
    {
      day: 'Wed',
      temp: 26,
      condition: 'rainy',
      humidity: 70,
      windSpeed: 15,
      visibility: 8,
    },
    {
      day: 'Thu',
      temp: 25,
      condition: 'sunny',
      humidity: 65,
      windSpeed: 12,
      visibility: 10,
    },
    {
      day: 'Fri',
      temp: 28,
      condition: 'cloudy',
      humidity: 60,
      windSpeed: 14,
      visibility: 9,
    },
    {
      day: 'Sat',
      temp: 30,
      condition: 'sunny',
      humidity: 55,
      windSpeed: 13,
      visibility: 10,
    },
    {
      day: 'Sun',
      temp: 27,
      condition: 'rainy',
      humidity: 72,
      windSpeed: 16,
      visibility: 7,
    },
  ]);

  const getWeatherIcon = condition => {
    switch (condition) {
      case 'sunny':
        return (
          <Sun className="h-16 w-16 text-yellow-500 drop-shadow-md animate-pulse" />
        );
      case 'cloudy':
        return (
          <Cloud className="h-16 w-16 text-gray-500 drop-shadow-md animate-pulse" />
        );
      case 'rainy':
        return (
          <CloudRain className="h-16 w-16 text-blue-500 drop-shadow-md animate-pulse" />
        );
      default:
        return <Sun className="h-16 w-16 text-yellow-500" />;
    }
  };

  return (
    <div className="py-20 px-6 bg-gradient-to-br from-sky-50 via-teal-50 to-emerald-100 rounded-3xl mt-16 shadow-2xl border border-gray-200/40">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-vibes  font-bold text-green-700 mb-4 drop-shadow-sm">
          Weather Forecast
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Stay updated with real-time forecasts and make smarter farming
          decisions with confidence.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Current Weather Card */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-sm bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-10 text-center hover:scale-105 transition-transform duration-500 overflow-hidden group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/20 via-white/5 to-teal-200/10 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition"></div>

            {/* Weather Icon */}
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/40 flex items-center justify-center shadow-inner border border-gray-300/30 backdrop-blur-md">
              {getWeatherIcon(weeklyForecast[0].condition)}
            </div>

            {/* Day */}
            <p className="font-semibold text-2xl text-gray-800">
              {weeklyForecast[0].day}
            </p>

            {/* Temperature */}
            <p className="text-6xl font-extrabold text-gray-900 my-4 drop-shadow-lg">
              {weeklyForecast[0].temp}°C
            </p>

            {/* Condition */}
            <p className="text-md capitalize text-gray-700 tracking-wide mb-8 italic">
              {weeklyForecast[0].condition}
            </p>

            {/* Weather Stats */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-800">
                  {weeklyForecast[0].humidity}%
                </p>
                <span className="text-xs text-gray-500">Humidity</span>
              </div>
              <div>
                <Wind className="h-6 w-6 text-green-500 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-800">
                  {weeklyForecast[0].windSpeed} km/h
                </p>
                <span className="text-xs text-gray-500">Wind</span>
              </div>
              <div>
                <Eye className="h-6 w-6 text-indigo-500 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-800">
                  {weeklyForecast[0].visibility} km
                </p>
                <span className="text-xs text-gray-500">Visibility</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next 6 Days */}
        <div className="flex-[2] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {weeklyForecast.slice(1).map((day, i) => (
            <div
              key={i}
              className="relative bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-xl border border-gray-300/20 rounded-2xl shadow-md p-6 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden group"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-100/20 via-white/10 to-emerald-100/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-80 transition"></div>

              <div className="relative">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/40 flex items-center justify-center shadow-inner border border-gray-300/30 backdrop-blur-md">
                  {getWeatherIcon(day.condition)}
                </div>
                <p className="font-semibold text-lg text-gray-800">{day.day}</p>
                <p className="text-3xl font-bold text-gray-900">{day.temp}°C</p>
                <p className="text-sm capitalize text-gray-600 mb-4">
                  {day.condition}
                </p>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <Droplets className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                    <p className="text-xs font-medium text-gray-700">
                      {day.humidity}%
                    </p>
                  </div>
                  <div>
                    <Wind className="h-5 w-5 text-green-500 mx-auto mb-1" />
                    <p className="text-xs font-medium text-gray-700">
                      {day.windSpeed} km/h
                    </p>
                  </div>
                  <div>
                    <Eye className="h-5 w-5 text-indigo-500 mx-auto mb-1" />
                    <p className="text-xs font-medium text-gray-700">
                      {day.visibility} km
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
