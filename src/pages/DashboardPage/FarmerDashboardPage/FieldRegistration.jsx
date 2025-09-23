import React from "react";

const FieldRegistration = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Register a New Field
          </h1>
          <p className="mt-2 text-gray-500">
            Add your field details to get personalized farming guidance.
          </p>
        </div>

        {/* ফর্ম ট্যাগটি পেজ রিলোড হওয়া আটকানোর জন্য একটি ডিফল্ট ফাংশন ব্যবহার করছে */}
        <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-6">
          {/* Field Nickname */}
          <div>
            <label
              htmlFor="fieldName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Field Nickname
            </label>
            <input
              type="text"
              id="fieldName"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Riverside Plot"
            />
          </div>

          {/* Field Size & Unit */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="w-full sm:w-2/3">
              <label
                htmlFor="fieldSize"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Field Size
              </label>
              <input
                type="number"
                step="any"
                id="fieldSize"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 5.5"
              />
            </div>
            <div className="w-full mt-6 sm:mt-0 sm:w-1/3">
              <label
                htmlFor="sizeUnit"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Unit
              </label>
              <select
                id="sizeUnit"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="acre">Acre</option>
                <option value="bigha">Bigha</option>
                <option value="hectare">Hectare</option>
              </select>
            </div>
          </div>

          {/* Soil Type & Primary Crop */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="w-full sm:w-1/2">
              <label
                htmlFor="soilType"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Soil Type
              </label>
              <select
                id="soilType"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select soil type</option>
                <option value="loam">Loam</option>
                <option value="clay">Clay</option>
                <option value="sandy">Sandy</option>
                <option value="silty">Silty</option>
              </select>
            </div>
            <div className="w-full mt-6 sm:mt-0 sm:w-1/2">
              <label
                htmlFor="primaryCrop"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Primary Crop (Planned)
              </label>
              <input
                type="text"
                id="primaryCrop"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Potato, Paddy"
              />
            </div>
          </div>

          {/* Field Notes */}
          <div>
            <label
              htmlFor="fieldNotes"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Additional Notes
            </label>
            <textarea
              id="fieldNotes"
              rows="3"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Any extra details about the field..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
            >
              Register Field
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FieldRegistration;
