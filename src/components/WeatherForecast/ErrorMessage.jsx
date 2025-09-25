import React from "react";

const ErrorMessage = ({ message = "Sorry, something went wrong." }) => (
  <div className="text-center text-xl text-red-500 font-semibold bg-red-100 p-4 rounded-lg mt-10">
    <p>{message}</p>
  </div>
);

export default ErrorMessage;
