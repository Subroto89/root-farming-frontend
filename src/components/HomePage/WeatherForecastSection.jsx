import React from 'react';

const WeatherForecastSection = () => {
  return (
    <div className="max-w-11/12 mx-auto py-20 bg-gradient-to-br from-blue-50 via-green-50 to-teal-100 rounded-xl mt-16">
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Weather Forecast
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Stay updated with real-time forecasts and make smarter farming
          decisions with confidence.
        </p>
      </div>
    </div>
  );
};

export default WeatherForecastSection;
