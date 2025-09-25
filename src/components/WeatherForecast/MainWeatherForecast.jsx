import React, { useState, useEffect, useCallback } from "react";
import {
  fetchWeatherDataByCoords,
  fetchWeatherDataByCity,
} from "./services/weatherServices";
import WeatherCard from "./WeatherCard";
import ForecastItem from "./ForecastItem";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const initialWeatherState = {
  loading: true,
  error: null,
  data: null,
};

const MainWeatherForecast = () => {
  const [weather, setWeather] = useState(initialWeatherState);

  const fetchWeather = useCallback(async (location) => {
    setWeather({ loading: true, error: null, data: null });
    try {
      const weatherData = location.city
        ? await fetchWeatherDataByCity(location.city)
        : await fetchWeatherDataByCoords(location.lat, location.lon);
      setWeather({ loading: false, error: null, data: weatherData });
    } catch (err) {
      console.error("Error fetching weather:", err);
      const errorMessage =
        err.response?.status === 404
          ? `City not found. Please check the spelling.`
          : "Sorry, could not fetch the weather forecast.";
      setWeather({ loading: false, error: errorMessage, data: null });
    }
  }, []);

  const handleGeolocate = useCallback(() => {
    if (!navigator.geolocation) {
      setWeather({
        ...initialWeatherState,
        loading: false,
        error: "Geolocation is not supported. Searching for a default city.",
      });
      fetchWeather({ city: "dhaka" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        setWeather({
          ...initialWeatherState,
          loading: false,
          error: "Location access denied. Showing weather for a default city.",
        });
        fetchWeather({ city: "Dhaka" });
      }
    );
  }, [fetchWeather]);

  useEffect(() => {
    handleGeolocate();
  }, [handleGeolocate]);

  const { loading, error, data } = weather;
  const today = data?.forecast[0];
  const weekly = data?.forecast.slice(1);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-100 via-teal-100 to-emerald-200 flex items-center justify-center p-2 sm:p-4">
      {/* Added max-w-7xl to prevent it from becoming too wide on large screens */}
      <div className="w-full max-w-7xl p-4 sm:p-6 md:p-8 bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40">
        {/* Added flex-wrap and justify-center for better mobile layout */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 flex-wrap">
          <div className="text-center md:text-left">
            {/* Adjusted font sizes for different screen sizes */}
            <h1 className="text-3xl sm:text-4xl font-bold text-green-700 drop-shadow-sm">
              Weather Forecast
            </h1>
            {data && (
              <p className="text-lg sm:text-xl text-gray-700 font-semibold mt-1">
                {data.locationName}
              </p>
            )}
          </div>
          <SearchBar
            onSearch={(city) => fetchWeather({ city })}
            onGeolocate={handleGeolocate}
          />
        </header>

        <main>
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {data && (
            <>
              <p className="text-center text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Stay updated with real-time forecasts.
              </p>
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                <WeatherCard
                  data={today}
                  locationName={data.locationName.split(",")[0]}
                />
                {/* Made the grid more responsive for smaller screens */}
                <div className="flex-[2] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {weekly.map((day, i) => (
                    <ForecastItem key={`${day.day}-${i}`} day={day} />
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default MainWeatherForecast;
