import React, { useEffect, useState } from 'react';
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Search,
  Eye,
  Gauge,
} from 'lucide-react';

// Helper: Tailwind color based on weather condition
const getWeatherColor = condition => {
  switch (condition) {
    case 'Clear':
      return 'text-yellow-400';
    case 'Clouds':
      return 'text-gray-400';
    case 'Rain':
      return 'text-blue-500';
    case 'Thunderstorm':
      return 'text-purple-600';
    case 'Snow':
      return 'text-cyan-300';
    case 'Mist':
    case 'Fog':
    case 'Haze':
      return 'text-gray-300';
    default:
      return 'text-blue-400';
  }
};

const WeatherForecastSection = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Dhaka,BD');
  const [query, setQuery] = useState('');
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);

  const API_KEY = 'e83583dbada9b16da8972d6d26726e7a';

  // Fetch by city name
  const fetchWeather = async cityName => {
    try {
      setLoading(true);
      setIsCurrentLocation(false);

      const resCurrent = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const dataCurrent = await resCurrent.json();

      if (dataCurrent.cod !== 200) {
        if (cityName !== 'Dhaka,BD') fetchWeather('Dhaka,BD');
        else {
          setWeather(null);
          setForecast([]);
          setLoading(false);
        }
        return;
      }

      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const dataForecast = await resForecast.json();

      const daily = [];
      const usedDays = new Set();
      for (let item of dataForecast.list) {
        const date = new Date(item.dt_txt).toLocaleDateString('en-IN', {
          weekday: 'long',
        });
        if (!usedDays.has(date) && daily.length < 5) {
          usedDays.add(date);
          daily.push(item);
        }
      }

      setWeather(dataCurrent);
      setForecast(daily);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setLoading(false);
    }
  };

  // Fetch by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setIsCurrentLocation(true);

      const resCurrent = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const dataCurrent = await resCurrent.json();

      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const dataForecast = await resForecast.json();

      const daily = [];
      const usedDays = new Set();
      for (let item of dataForecast.list) {
        const date = new Date(item.dt_txt).toLocaleDateString('en-IN', {
          weekday: 'long',
        });
        if (!usedDays.has(date) && daily.length < 5) {
          usedDays.add(date);
          daily.push(item);
        }
      }

      setWeather(dataCurrent);
      setForecast(daily);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        () => {
          fetchWeather(city);
        }
      );
    } else {
      fetchWeather(city);
    }
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeather(query.trim());
      setQuery('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg sm:text-xl font-bold text-green-700">
        Loading Weather...
      </div>
    );
  }

  const farmingTips = [
    {
      title: 'Irrigation Recommendation',
      description:
        'With 65% humidity and partly cloudy conditions, reduce watering frequency for most crops.',
      priority: 'medium',
    },
    {
      title: 'Pest Alert',
      description:
        'High humidity levels may increase fungal disease risk. Monitor crops closely.',
      priority: 'high',
    },
    {
      title: 'Planting Conditions',
      description:
        'Current soil temperature is ideal for planting summer vegetables.',
      priority: 'low',
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-10 overflow-x-hidden">
      {/* Background blobs */}
      <div className="absolute top-10 left-4 sm:left-10 w-60 sm:w-80 h-60 sm:h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-4 sm:right-10 w-72 sm:w-96 h-72 sm:h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-8 sm:gap-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 drop-shadow-md">
            Weather Forecast
          </h1>
          <p className="text-gray-600 mt-2 text-base sm:text-lg md:text-xl">
            Real-time weather updates for smarter decisions
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search city..."
            className="flex-1 px-4 py-2 sm:px-5 sm:py-3 bg-white/50 backdrop-blur-md border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700 transition text-sm sm:text-base"
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:bg-green-800 transition flex items-center justify-center text-sm sm:text-base"
          >
            <Search className="h-4 w-4 mr-1 sm:mr-2" />
            Search
          </button>
        </form>

        {/* Current Weather */}
        {weather && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Temperature Card */}
            <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 md:p-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-2xl hover:scale-105 transform transition duration-300">
              <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                {Math.round(weather.main.temp)}°C
              </div>
              {(() => {
                const IconComponent =
                  weather.weather[0].main === 'Rain'
                    ? CloudRain
                    : weather.weather[0].main === 'Clear'
                    ? Sun
                    : Cloud;
                return (
                  <IconComponent
                    className={`h-16 sm:h-20 w-16 sm:w-20 mb-2 drop-shadow-xl ${getWeatherColor(
                      weather.weather[0].main
                    )}`}
                  />
                );
              })()}
              <p className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-700 capitalize">
                {weather.weather[0].description}
              </p>
              <p className="mt-2 text-gray-600 text-base sm:text-lg font-medium">
                {weather.name}, {weather.sys.country}{' '}
                {isCurrentLocation && (
                  <span className="text-blue-600 font-semibold">
                    (Current Location)
                  </span>
                )}
              </p>
              <p className="mt-3 sm:mt-4 text-gray-600 text-base sm:text-lg">
                Feels like{' '}
                <span className="font-semibold text-gray-900">
                  {Math.round(weather.main.feels_like)}°C
                </span>
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  icon: (
                    <Droplets className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  ),
                  label: 'Humidity',
                  value: `${weather.main.humidity}%`,
                  bg: 'from-blue-50 to-blue-100',
                },
                {
                  icon: (
                    <Wind className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  ),
                  label: 'Wind',
                  value: `${weather.wind.speed} km/h`,
                  bg: 'from-green-50 to-green-100',
                },
                {
                  icon: (
                    <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
                  ),
                  label: 'Visibility',
                  value: `${Math.round(weather.visibility / 1000)} km`,
                  bg: 'from-yellow-50 to-yellow-100',
                },
                {
                  icon: (
                    <Gauge className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  ),
                  label: 'Pressure',
                  value: `${weather.main.pressure} mb`,
                  bg: 'from-purple-50 to-purple-100',
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`p-4 sm:p-6 rounded-2xl bg-gradient-to-br ${stat.bg} shadow-lg hover:scale-105 transform transition duration-300 flex flex-col items-center`}
                >
                  {stat.icon}
                  <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm">
                    {stat.label}
                  </p>
                  <p className="text-gray-900 font-bold text-lg sm:text-xl mt-1">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5-Day Forecast */}
        {forecast.length > 0 && (
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              5-Day Forecast
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
              {forecast.map((day, idx) => {
                const date = new Date(day?.dt_txt).toLocaleDateString('en-IN', {
                  weekday: 'short',
                });
                const IconComponent =
                  day?.weather[0].main === 'Rain'
                    ? CloudRain
                    : day.weather[0].main === 'Clear'
                    ? Sun
                    : Cloud;
                return (
                  <div
                    key={idx}
                    className="text-center p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-lg hover:scale-105 transform transition duration-300"
                  >
                    <p className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                      {date}
                    </p>
                    <IconComponent
                      className={`h-10 sm:h-12 w-10 sm:w-12 mx-auto mb-1 sm:mb-2 drop-shadow ${getWeatherColor(
                        day?.weather[0].main
                      )}`}
                    />
                    <p className="text-gray-600 mb-1 sm:mb-2 text-xs sm:text-sm">
                      {day?.weather[0].main}
                    </p>
                    <p className="font-bold text-gray-900 text-sm sm:text-base">
                      {Math.round(day?.main.temp_max)}° /{' '}
                      <span className="text-gray-500">
                        {Math.round(day?.main.temp_min)}°
                      </span>
                    </p>
                    <div className="flex items-center justify-center mt-1 sm:mt-2 text-[10px] sm:text-xs text-gray-600">
                      <Droplets className="h-3 w-3 text-blue-500 mr-1" />
                      Precip {day?.pop ? day?.pop * 100 : 10}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Farming Tips */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-left">
            Farming Recommendations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {farmingTips.map((tip, index) => (
              <div
                key={index}
                className={`p-4 sm:p-6 rounded-lg border-l-4 transition-transform transform hover:scale-105 hover:shadow-2xl hover:translate-y-1 duration-300 cursor-pointer ${
                  tip.priority === 'high'
                    ? 'bg-red-50 border-red-500'
                    : tip.priority === 'medium'
                    ? 'bg-yellow-50 border-yellow-500'
                    : 'bg-green-50 border-green-500'
                }`}
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-left">
                  {tip.title}
                </h3>
                <p className="text-gray-700 text-left">{tip.description}</p>
                <span
                  className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                    tip.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : tip.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {tip.priority.charAt(0).toUpperCase() + tip.priority.slice(1)}{' '}
                  Priority
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecastSection;
