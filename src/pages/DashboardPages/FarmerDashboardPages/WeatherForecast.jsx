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
  Eye,
  Gauge,
  Search,
} from 'lucide-react';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { useTheme } from '../../../hooks/useTheme'; // Theme hook

const API_KEY = 'e83583dbada9b16da8972d6d26726e7a';

const WeatherForecast = () => {
  const { theme } = useTheme(); // 'light' or 'dark'

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(true);

  // Theme classes
  const themeBackground =
    theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-light text-gray-900';
  const themeCard =
    theme === 'dark' ? 'bg-gray-800 text-white' : 'fg-light text-gray-900';
  const themeCardHover =
    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100';
  const themeInput =
    theme === 'dark'
      ? 'bg-gray-800 text-white border-gray-600 placeholder-gray-400 focus:ring-green-500'
      : 'bg-white text-gray-900 border-gray-300 placeholder-gray-500 focus:ring-green-700';
  const themeDropdown =
    theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';

  // -------------------- Weather Fetch Functions --------------------
  const fetchWeather = async city => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        setLocationName(`${data.name}, ${data.sys.country}`);
        await fetchForecast(city);
      } else {
        setWeather(null);
        setForecast([]);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const fetchForecast = async city => {
    try {
      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      const dataForecast = await resForecast.json();
      const daily = [];
      const usedDays = new Set();
      for (let item of dataForecast.list) {
        const date = new Date(item.dt_txt).toLocaleDateString('en-IN', {
          weekday: 'short',
        });
        if (!usedDays.has(date) && daily.length < 5) {
          usedDays.add(date);
          daily.push(item);
        }
      }
      setForecast(daily);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        setLocationName(`${data.name}, ${data.sys.country}`);
        await fetchForecast(data.name);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // -------------------- Auto-load weather --------------------
  useEffect(() => {
    const fetchByIP = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data && data.city) await fetchWeather(data.city);
        else await fetchWeather('Dhaka');
      } catch {
        await fetchWeather('Dhaka');
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
        fetchByIP,
        { timeout: 5000 }
      );
    } else fetchByIP();
  }, []);

  // -------------------- Search --------------------
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

  // -------------------- Weather icon --------------------
  const getWeatherIcon = (condition, iconCode) => {
    const isDay = iconCode?.includes('d');
    switch (condition) {
      case 'Clear':
        return isDay ? (
          <Sun className="h-20 w-20 text-yellow-400 animate-bounce-slow" />
        ) : (
          <Moon className="h-20 w-20 text-gray-400 animate-bounce-slow" />
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

  // -------------------- Farming Tips --------------------
  const getFarmingTips = () => {
    if (!weather) return [];
    const { humidity, temp } = weather.main;
    const condition = weather.weather[0].main.toLowerCase();
    const wind = weather.wind.speed;
    const tips = [];

    if (temp > 32)
      tips.push({
        title: 'High Temperature',
        description: 'Ensure irrigation and shade for sensitive crops.',
        priority: 'high',
      });
    else if (temp < 15)
      tips.push({
        title: 'Low Temperature',
        description: 'Protect seedlings from frost.',
        priority: 'medium',
      });
    if (condition.includes('rain'))
      tips.push({
        title: 'Rain Alert',
        description: 'Delay fertilizer/pesticide application.',
        priority: 'medium',
      });
    if (humidity > 80)
      tips.push({
        title: 'High Humidity',
        description: 'Risk of fungal infection. Monitor crops.',
        priority: 'high',
      });
    if (wind > 10)
      tips.push({
        title: 'Strong Winds',
        description: 'Secure structures and support plants.',
        priority: 'medium',
      });

    if (tips.length === 0)
      tips.push({
        title: 'Optimal Conditions',
        description: 'Weather is favorable for all crops.',
        priority: 'low',
      });

    return tips
      .sort(
        (a, b) =>
          ({ high: 1, medium: 2, low: 3 }[a.priority] -
          { high: 1, medium: 2, low: 3 }[b.priority])
      )
      .slice(0, 3);
  };

  const farmingTips = getFarmingTips();

  if (loading) return <LoadingSpinner />;

  // -------------------- Render --------------------
  return (
    <div
      className={`min-h-screen py-16 px-6 transition-colors duration-500 ${themeBackground}`}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold drop-shadow-md">
          Weather Forecast
        </h1>
        <p className="mt-2 text-lg opacity-80">
          Real-time updates for smarter farming
        </p>
        {locationName && (
          <p className="mt-1 text-sm opacity-70">{locationName}</p>
        )}
      </div>

      {/* Search */}
      <form
        onSubmit={handleSearchSubmit}
        className="relative flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-12"
      >
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search city..."
          className={`flex-1 px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 ${themeInput}`}
        />
        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 flex items-center justify-center"
        >
          <Search className="h-4 w-4 mr-2" /> Search
        </button>
        {suggestions.length > 0 && (
          <ul
            className={`absolute top-full left-0 w-full rounded-xl shadow-lg mt-2 max-h-60 overflow-y-auto z-20 ${themeDropdown}`}
          >
            {suggestions.map((item, idx) => (
              <li
                key={idx}
                className="px-4 py-2 cursor-pointer hover:bg-green-100 dark:hover:bg-gray-700"
                onClick={() =>
                  handleSelectSuggestion(`${item.name}, ${item.country}`)
                }
              >
                {item.name}, {item.country}
              </li>
            ))}
          </ul>
        )}
      </form>

      {/* Weather Display */}
      {weather && (
        <>
          {/* Current Weather */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div
              className={`flex flex-col items-center justify-center text-center p-10 rounded-2xl shadow-xl hover:scale-105 transition ${themeCard} ${themeCardHover}`}
            >
              {getWeatherIcon(weather.weather[0].main, weather.weather[0].icon)}
              <div className="text-5xl font-bold mt-3">
                {Math.round(weather.main.temp)}°C
              </div>
              <p className="text-xl font-medium capitalize mt-2">
                {weather.weather[0].description}
              </p>
              <p className="mt-2 opacity-80">
                Feels like{' '}
                <span className="font-semibold">
                  {Math.round(weather.main.feels_like)}°C
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: <Droplets className="h-6 w-6 text-blue-400" />,
                  label: 'Humidity',
                  value: `${weather.main.humidity}%`,
                },
                {
                  icon: <Wind className="h-6 w-6 text-green-400" />,
                  label: 'Wind',
                  value: `${weather.wind.speed} km/h`,
                },
                {
                  icon: <Eye className="h-6 w-6 text-yellow-400" />,
                  label: 'Visibility',
                  value: `${Math.round(weather.visibility / 1000)} km`,
                },
                {
                  icon: <Gauge className="h-6 w-6 text-purple-400" />,
                  label: 'Pressure',
                  value: `${weather.main.pressure} mb`,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-2xl shadow-lg flex flex-col items-center hover:scale-105 transition ${themeCard} ${themeCardHover}`}
                >
                  {stat.icon}
                  <p className="mt-1 opacity-80">{stat.label}</p>
                  <p className="font-bold text-xl mt-1">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Forecast */}
          {forecast.length > 0 && (
            <div className={`rounded-2xl shadow-xl p-8 mb-12 ${themeCard}`}>
              <h2 className="text-3xl font-bold mb-8 text-center">
                5-Day Forecast
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                {forecast.map((day, i) => {
                  const date = new Date(day.dt_txt).toLocaleDateString(
                    'en-IN',
                    { weekday: 'short' }
                  );
                  return (
                    <div
                      key={i}
                      className={`text-center p-6 rounded-2xl shadow-lg hover:scale-105 transition border border-gray-200 ${themeCard} ${themeCardHover}`}
                    >
                      <p className="font-semibold mb-2">{date}</p>
                      <div className="flex justify-center mb-2">
                        {getWeatherIcon(
                          day.weather[0].main,
                          day.weather[0].icon
                        )}
                      </div>
                      <p className="mb-1">{day.weather[0].main}</p>
                      <p className="font-bold">
                        {Math.round(day.main.temp_max)}° /{' '}
                        <span className="opacity-70">
                          {Math.round(day.main.temp_min)}°
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Farming Tips */}
          <div className={`rounded-2xl shadow-lg p-8 ${themeCard}`}>
            <h2 className="text-3xl font-bold mb-8">Farming Recommendations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {farmingTips.map((tip, i) => {
                let bg, border;
                if (tip.priority === 'high') {
                  bg = theme === 'dark' ? 'dark:bg-red-900' : 'bg-red-50';
                  border =
                    theme === 'dark' ? 'dark:border-red-400' : 'border-red-500';
                } else if (tip.priority === 'medium') {
                  bg = theme === 'dark' ? 'dark:bg-yellow-900' : 'bg-yellow-50';
                  border =
                    theme === 'dark'
                      ? 'dark:border-yellow-400'
                      : 'border-yellow-500';
                } else {
                  bg = theme === 'dark' ? 'dark:bg-green-900' : 'bg-green-50';
                  border =
                    theme === 'dark'
                      ? 'dark:border-green-400'
                      : 'border-green-500';
                }

                return (
                  <div
                    key={i}
                    className={`p-6 rounded-xl border-l-4 hover:scale-105 hover:shadow-xl transition ${bg} ${border} ${
                      theme === 'dark'
                        ? 'text-white border border-gray-200'
                        : 'text-gray-900'
                    }`}
                  >
                    <h3 className="font-semibold mb-2">{tip.title}</h3>
                    <p>{tip.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

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
            transform: translateY(-10px);
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
            opacity: 0.4;
          }
        }
        .animate-flash {
          animation: flash 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WeatherForecast;
