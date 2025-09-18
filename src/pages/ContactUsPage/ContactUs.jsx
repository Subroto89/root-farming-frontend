import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-green-50/50 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-lg">
        {/* Heading Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-800">
            Contact Us
          </h1>
          <p className="text-gray-600 mt-3">
            We'd love to hear from you. Please fill out the form below.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
