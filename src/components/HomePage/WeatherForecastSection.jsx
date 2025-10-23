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
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTheme } from '../../hooks/useTheme';

const API_KEY = 'e83583dbada9b16da8972d6d26726e7a';

const WeatherForecastSection = () => {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState('');

  // 🔹 Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-in-out' });
  }, []);

  // 🔹 Fetch weather data
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
          <Sun className="h-15 w-15 text-yellow-400 animate-bounce-slow" />
        ) : (
          <Moon className="h-20 w-20 text-gray-200 animate-bounce-slow" />
        );
      case 'Clouds':
        return <Cloud className="h-20 w-20 text-gray-400 animate-float" />;
      case 'Rain':
        return <CloudRain className="h-20 w-20 text-blue-500 animate-float" />;
      case 'Snow':
        return <Snowflake className="h-20 w-20 text-blue-300 animate-float" />;
      case 'Thunderstorm':
        return (
          <CloudLightning className="h-20 w-20 text-purple-600 animate-flash" />
        );
      default:
        return (
          <Sun className="h-20 w-20 text-yellow-400 animate-bounce-slow" />
        );
    }
  };

  // 🌗 Theme Styles
  const bgStyle =
    theme === 'dark'
      ? 'bg-gradient-to-b from-gray-900 via-green-950 to-[#1A202C]'
      : 'bg-gradient-to-b from-green-50 to-green-100';
  const textPrimary = theme === 'dark' ? 'text-gray-100' : 'text-green-900';
  const textSecondary = theme === 'dark' ? 'text-gray-300' : 'text-green-800';
  const cardBg =
    theme === 'dark'
      ? 'bg-white/10 border border-white/10 hover:bg-white/20'
      : 'bg-white/70 border border-green-100 hover:bg-white/90';
  const inputBg =
    theme === 'dark'
      ? 'bg-white/10 border border-white/20 text-gray-100 placeholder-gray-400'
      : 'bg-white/70 border border-gray-300 text-gray-800 placeholder-gray-500';

  return (
    <div
      className={`w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center transition-colors duration-500 ${bgStyle}`}
    >
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div data-aos="fade-down" className="mb-8">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-2 ${textPrimary}`}
          >
            Today's Weather
          </h2>
          {locationName && (
            <p className={`text-base mb-1 ${textSecondary}`}>{locationName}</p>
          )}
          <p className={`text-sm ${textSecondary}`}>
            Real-time weather updates by city & country
          </p>
        </div>

        {/* Search Bar */}
        <form
          data-aos="zoom-in"
          onSubmit={handleSearchSubmit}
          className="relative flex flex-col sm:flex-row justify-center gap-3 mb-10 w-full"
        >
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search city or country..."
            className={`w-full sm:w-2/3 md:w-1/2 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-700 transition text-base ${inputBg}`}
          />
          <button
            type="submit"
            data-aos="fade-left"
            className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition flex items-center justify-center"
          >
            <Search className="h-5 w-5 mr-2" /> Search
          </button>

          {suggestions.length > 0 && (
            <ul
              className={`absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto rounded-xl shadow-lg z-20 text-left ${
                theme === 'dark'
                  ? 'bg-[#1E293B] border border-white/10 text-gray-100'
                  : 'bg-white border border-green-200 text-gray-800'
              }`}
            >
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-green-100 dark:hover:bg-[#2D3B4F] cursor-pointer transition"
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
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
          >
            {/* Temperature */}
            <div
              data-aos="flip-left"
              className={`${cardBg} rounded-2xl p-6 shadow-sm hover:shadow-md transition`}
            >
              <div className="flex justify-center mt-2">
                {getWeatherIcon(
                  weather.weather[0].main,
                  weather.weather[0].icon
                )}
              </div>
              <h3 className={`font-semibold mt-3 text-lg ${textPrimary}`}>
                Temperature
              </h3>
              <p className={`text-4xl font-bold ${textSecondary}`}>
                {weather.main.temp}°C
              </p>
              <p className={`text-sm ${textSecondary}`}>
                {weather.weather[0].main}
              </p>
            </div>

            {/* Humidity */}
            <div
              data-aos="flip-right"
              data-aos-delay="100"
              className={`${cardBg} rounded-2xl p-6 shadow-sm hover:shadow-md transition`}
            >
              <Droplets className="h-16 w-16 text-blue-500 mx-auto mb-2 animate-float" />
              <h3 className={`font-semibold text-lg ${textPrimary}`}>
                Humidity
              </h3>
              <p className={`text-4xl font-bold ${textSecondary}`}>
                {weather.main.humidity}%
              </p>
              <p className={`text-sm ${textSecondary}`}>Air moisture</p>
            </div>

            {/* Feels Like */}
            <div
              data-aos="flip-left"
              data-aos-delay="200"
              className={`${cardBg} rounded-2xl p-6 shadow-sm hover:shadow-md transition`}
            >
              <Thermometer className="h-16 w-16 text-red-500 mx-auto mb-2 animate-float" />
              <h3 className={`font-semibold text-lg ${textPrimary}`}>
                Feels Like
              </h3>
              <p className={`text-4xl font-bold ${textSecondary}`}>
                {weather.main.feels_like}°C
              </p>
              <p className={`text-sm ${textSecondary}`}>
                Perceived temperature
              </p>
            </div>

            {/* Wind Speed */}
            <div
              data-aos="flip-right"
              data-aos-delay="300"
              className={`${cardBg} rounded-2xl p-6 shadow-sm hover:shadow-md transition`}
            >
              <Wind className="h-16 w-16 text-green-600 mx-auto mb-2 animate-float" />
              <h3 className={`font-semibold text-lg ${textPrimary}`}>
                Wind Speed
              </h3>
              <p className={`text-4xl font-bold ${textSecondary}`}>
                {weather.wind.speed} m/s
              </p>
              <p className={`text-sm ${textSecondary}`}>Wind flow</p>
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
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
