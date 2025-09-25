import React from "react";

const Loader = ({ message = "Loading weather data..." }) => (
  <div className="text-center text-xl text-gray-700 mt-10">
    <p>{message}</p>
  </div>
);

export default Loader;
