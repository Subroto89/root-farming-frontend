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
        return <Sun className="h-10 w-10 text-yellow-500 drop-shadow-lg" />;
      case 'cloudy':
        return <Cloud className="h-10 w-10 text-gray-500 drop-shadow-lg" />;
      case 'rainy':
        return <CloudRain className="h-10 w-10 text-blue-500 drop-shadow-lg" />;
      default:
        return <Sun className="h-10 w-10 text-yellow-500" />;
    }
  };

  return (
    <div className=" max-w-11/12 mx-auto py-20 bg-gradient-to-br from-blue-50 via-green-50 to-teal-100 rounded-xl mt-16">
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Weather Forecast
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Stay updated with real-time forecasts and make smarter farming
          decisions with confidence.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 px-6 lg:px-12">
        {/* Current weather */}
        <div className="flex-1">
          <div
            className="bg-gradient-to-br from-blue-400/90 to-green-400/90 backdrop-blur-lg 
                          rounded-3xl shadow-2xl p-8 text-center transform hover:scale-105 
                          transition-all duration-300"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/40 flex items-center justify-center shadow-lg">
              {getWeatherIcon(weeklyForecast[0].condition)}
            </div>
            <p className="font-bold text-2xl text-gray-900">
              {weeklyForecast[0].day}
            </p>
            <p className="text-5xl font-extrabold text-gray-800 my-3">
              {weeklyForecast[0].temp}°C
            </p>
            <p className="text-base capitalize text-gray-700 tracking-wide mb-6">
              {weeklyForecast[0].condition}
            </p>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Droplets className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                <p className="text-sm text-gray-800">
                  {weeklyForecast[0].humidity}%
                </p>
              </div>
              <div>
                <Wind className="h-6 w-6 text-green-600 mx-auto mb-1" />
                <p className="text-sm text-gray-800">
                  {weeklyForecast[0].windSpeed} km/h
                </p>
              </div>
              <div>
                <Eye className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                <p className="text-sm text-gray-800">
                  {weeklyForecast[0].visibility} km
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next 6 days */}
        <div className="flex-[2] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {weeklyForecast.slice(1).map((day, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl 
                         shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 
                         transition-all duration-300"
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-blue-100 to-green-100 
                              flex items-center justify-center shadow"
              >
                {getWeatherIcon(day.condition)}
              </div>
              <p className="font-semibold text-gray-900">{day.day}</p>
              <p className="text-2xl font-bold text-gray-800">{day.temp}°C</p>
              <p className="text-sm capitalize text-gray-500 mb-4">
                {day.condition}
              </p>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <Droplets className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">{day.humidity}%</p>
                </div>
                <div>
                  <Wind className="h-5 w-5 text-green-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">{day.windSpeed} km/h</p>
                </div>
                <div>
                  <Eye className="h-5 w-5 text-purple-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">{day.visibility} km</p>
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
