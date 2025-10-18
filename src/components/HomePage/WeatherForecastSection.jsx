import React, { useEffect, useState } from 'react';
import {
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Snowflake,
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  Search,
} from 'lucide-react';

const API_KEY = 'e83583dbada9b16da8972d6d26726e7a';

const WeatherForecastSection = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState('');

  const fetchWeather = async city => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        setLocationName(`${data.name}, ${data.sys.country}`);
      } else {
        setWeather(null);
        setLocationName('');
      }
    } catch (err) {
      console.error('Error fetching weather:', err);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        setLocationName(`${data.name}, ${data.sys.country}`);
      }
    } catch (err) {
      console.error('Error fetching weather by coords:', err);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather('Dhaka')
      );
    } else {
      fetchWeather('Dhaka');
    }
  }, []);

  const handleInputChange = async e => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error(err);
      }
    } else setSuggestions([]);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeather(query.trim());
      setQuery('');
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = city => {
    fetchWeather(city);
    setQuery('');
    setSuggestions([]);
  };

  const getWeatherIcon = (condition, iconCode) => {
    const isDay = iconCode?.includes('d');
    switch (condition) {
      case 'Clear':
        return isDay ? (
          <Sun className="h-16 sm:h-20 md:h-24 w-16 sm:w-20 md:w-24 text-yellow-400 animate-bounce-slow" />
        ) : (
          <Moon className="h-16 sm:h-20 md:h-24 w-16 sm:w-20 md:w-24 text-gray-200 animate-bounce-slow" />
        );
      case 'Clouds':
        return (
          <Cloud className="h-16 sm:h-20 md:h-24 w-16 sm:w-20 md:w-24 text-gray-400 animate-float" />
        );
      case 'Rain':
        return (
          <CloudRain className="h-16 sm:h-20 md:h-24 w-16 sm:w-20 md:w-24 text-blue-500 animate-float" />
        );
      case 'Snow':
        return (
          <Snowflake className="h-16 sm:h-20 md:h-24 w-16 sm:w-20 md:w-24 text-blue-300 animate-float" />
        );
      case 'Thunderstorm':
        return (
          <CloudLightning className="h-16 sm:h-20 md:h-24 w-16 sm:w-20 md:w-24 text-purple-600 animate-flash" />
        );
      default:
        return (
          <Sun className="h-16 sm:h-20 md:h-24 w-16 sm:w-20 md:w-24 text-yellow-400 animate-bounce-slow" />
        );
    }
  };

  return (
    <div className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center text-center">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-2">
            Today's Weather
          </h2>
          {locationName && (
            <p className="text-sm sm:text-base md:text-lg text-green-800 mb-1">
              {locationName}
            </p>
          )}
          <p className="text-xs sm:text-sm md:text-base text-green-700">
            Real-time weather updates by city & country
          </p>
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex flex-col sm:flex-row justify-center gap-3 mb-10 w-full"
        >
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search city or country..."
            className="w-full sm:w-2/3 md:w-1/2 px-4 py-2 sm:px-5 sm:py-3 bg-white/70 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700 transition text-sm sm:text-base md:text-lg"
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:bg-green-800 transition flex items-center justify-center text-sm sm:text-base md:text-lg"
          >
            <Search className="h-4 w-4 mr-1 sm:mr-2" /> Search
          </button>

          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-green-200 rounded-xl mt-2 max-h-60 overflow-y-auto shadow-lg z-20 text-left text-sm sm:text-base">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-green-100 cursor-pointer transition"
                  onClick={() =>
                    handleSelectSuggestion(`${s.name}, ${s.country}`)
                  }
                >
                  {s.name}, {s.country}
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* Weather Info */}
        {weather && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full">
            {/* Temperature */}
            <div className="bg-white/70 rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition">
              <div className="flex justify-center mb-2">
                {getWeatherIcon(
                  weather.weather[0].main,
                  weather.weather[0].icon
                )}
              </div>
              <h3 className="font-semibold text-green-900 mt-3 text-sm sm:text-base md:text-lg">
                Temperature
              </h3>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800">
                {weather.main.temp}°C
              </p>
              <p className="text-xs sm:text-sm md:text-base text-green-700">
                {weather.weather[0].main}
              </p>
            </div>

            {/* Humidity */}
            <div className="bg-white/70 rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition">
              <Droplets className="h-12 sm:h-14 md:h-16 w-12 sm:w-14 md:w-16 text-blue-500 mx-auto mb-2 animate-float" />
              <h3 className="font-semibold text-green-900 text-sm sm:text-base md:text-lg">
                Humidity
              </h3>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800">
                {weather.main.humidity}%
              </p>
              <p className="text-xs sm:text-sm md:text-base text-green-700">
                Air moisture
              </p>
            </div>

            {/* Feels Like */}
            <div className="bg-white/70 rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition">
              <Thermometer className="h-12 sm:h-14 md:h-16 w-12 sm:w-14 md:w-16 text-red-500 mx-auto mb-2 animate-float" />
              <h3 className="font-semibold text-green-900 text-sm sm:text-base md:text-lg">
                Feels Like
              </h3>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800">
                {weather.main.feels_like}°C
              </p>
              <p className="text-xs sm:text-sm md:text-base text-green-700">
                Perceived temperature
              </p>
            </div>

            {/* Wind Speed */}
            <div className="bg-white/70 rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition">
              <Wind className="h-12 sm:h-14 md:h-16 w-12 sm:w-14 md:w-16 text-green-600 mx-auto mb-2 animate-float" />
              <h3 className="font-semibold text-green-900 text-sm sm:text-base md:text-lg">
                Wind Speed
              </h3>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800">
                {weather.wind.speed} m/s
              </p>
              <p className="text-xs sm:text-sm md:text-base text-green-700">
                Wind flow
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }

        @keyframes flash {
          0%,
          50%,
          100% {
            opacity: 1;
          }
          25%,
          75% {
            opacity: 0.3;
          }
        }
        .animate-flash {
          animation: flash 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WeatherForecastSection;
