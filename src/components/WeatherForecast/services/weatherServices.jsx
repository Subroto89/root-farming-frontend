import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_API_URL = "https://api.openweathermap.org/geo/1.0";

// Helper function to map API condition to our app's condition
const mapApiCondition = (apiCondition) => {
  const condition = apiCondition.toLowerCase();
  if (condition.includes("clear")) return "sunny";
  if (condition.includes("clouds")) return "cloudy";
  if (
    condition.includes("rain") ||
    condition.includes("drizzle") ||
    condition.includes("storm") ||
    condition.includes("mist") ||
    condition.includes("haze")
  ) {
    return "rainy";
  }
  return "sunny"; // A sensible default
};

// Processes raw API data into a clean format for our components
const processWeatherData = (current, forecast) => {
  const todayData = {
    day: "Today",
    temp: Math.round(current.main.temp),
    condition: mapApiCondition(current.weather[0].main),
    humidity: current.main.humidity,
    windSpeed: Math.round(current.wind.speed * 3.6), // Convert m/s to km/h
    visibility: Math.round(current.visibility / 1000), // Convert meters to km
  };

  const dailyForecasts = forecast.list
    .filter((item) => item.dt_txt.includes("12:00:00")) // Get data for midday
    .slice(0, 6)
    .map((dayData) => ({
      day: new Date(dayData.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      temp: Math.round(dayData.main.temp),
      condition: mapApiCondition(dayData.weather[0].main),
      humidity: dayData.main.humidity,
      windSpeed: Math.round(dayData.wind.speed * 3.6),
      visibility: dayData.visibility
        ? Math.round(dayData.visibility / 1000)
        : "N/A",
    }));

  return {
    locationName: `${current.name}, ${current.sys.country}`,
    forecast: [todayData, ...dailyForecasts],
  };
};

export const fetchWeatherDataByCoords = async (lat, lon) => {
  const currentWeatherUrl = `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const forecastUrl = `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const [currentWeatherResponse, forecastResponse] = await Promise.all([
    axios.get(currentWeatherUrl),
    axios.get(forecastUrl),
  ]);

  return processWeatherData(currentWeatherResponse.data, forecastResponse.data);
};

export const fetchWeatherDataByCity = async (city) => {
  const currentWeatherUrl = `${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const forecastUrl = `${API_BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  const [currentWeatherResponse, forecastResponse] = await Promise.all([
    axios.get(currentWeatherUrl),
    axios.get(forecastUrl),
  ]);

  return processWeatherData(currentWeatherResponse.data, forecastResponse.data);
};

export const fetchCitySuggestions = async (query) => {
  if (query.length < 3) return [];

  const response = await axios.get(
    `${GEO_API_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`
  );

  // Filter out duplicates to provide a cleaner list
  const uniqueSuggestions = response.data.reduce((acc, current) => {
    const key = `${current.name},${current.country}`;
    if (!acc.find((item) => `${item.name},${item.country}` === key)) {
      acc.push(current);
    }
    return acc;
  }, []);

  return uniqueSuggestions;
};
