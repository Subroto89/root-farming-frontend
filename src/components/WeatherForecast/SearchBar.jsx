import React, { useState, useEffect } from "react";
import { Search, Crosshair } from "lucide-react";
import { fetchCitySuggestions } from "./services/weatherServices";

const SearchBar = ({ onSearch, onGeolocate }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const performFetch = async () => {
      if (input.length > 2) {
        const results = await fetchCitySuggestions(input);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(performFetch, 300);
    return () => clearTimeout(debounceTimer);
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput("");
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (city) => {
    onSearch(city.name);
    setInput("");
    setSuggestions([]);
  };

  return (
    // Make the component take full width on mobile and a max-width on larger screens
    <div className="w-full max-w-sm sm:max-w-md flex items-center gap-2">
      <div className="relative w-full">
        <form
          onSubmit={handleSubmit}
          // Adjust padding for smaller screens
          className="flex items-center bg-white rounded-full shadow-lg border border-gray-200/60 p-1 sm:p-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter city name..."
            // Adjust font size and padding for mobile
            className="flex-grow w-auto bg-transparent text-gray-700 text-base sm:text-lg sm:px-2 px-4 focus:outline-none"
            autoComplete="off"
          />
          <button
            type="submit"
            // Adjust padding for a smaller touch target on mobile
            className="bg-green-500 text-white rounded-full sm:p-2 p-3 hover:bg-green-600 transition-colors duration-300 shadow"
            aria-label="Search"
          >
            <Search className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </form>
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-2 shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((city, index) => (
              <li
                key={`${city.name}-${city.country}-${index}`}
                onClick={() => handleSuggestionClick(city)}
                className="px-4 py-2 text-sm sm:text-base cursor-pointer hover:bg-gray-100"
              >
                {city.name}, {city.state ? `${city.state}, ` : ""}{" "}
                {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={onGeolocate}
        title="Get current location"
        aria-label="Get current location"
        // Adjust padding for a smaller touch target on mobile
        className="bg-blue-500 text-white rounded-full sm:p-2 p-3  hover:bg-blue-600 transition-colors duration-300 shadow-lg flex-shrink-0"
      >
        <Crosshair className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </div>
  );
};

export default SearchBar;
