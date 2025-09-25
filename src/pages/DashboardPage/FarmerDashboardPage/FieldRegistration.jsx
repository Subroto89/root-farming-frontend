import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import MapPicker from "../../../components/Leaflet/MapPicker";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import { auth } from "../../../firebase/firebase.confiq";
import useAuth from "../../../hooks/useAuth";

const registerNewField = async (fieldData) => {
  const axiosSecure = useAxiosSecure();

  const response = await axiosSecure.post("/fields", fieldData);

  return response.data;
};

const FieldRegistration = () => {
  const { user } = useAuth();
  console.log(user);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    // Default values ​​for input fields
    defaultValues: {
      fieldName: "",
      fieldSize: "",
      sizeUnit: "acre",
      soilType: "",
      primaryCrop: "",
      irrigationSystem: "rain-fed",
      fieldNotes: "",
      location: null,
    },
  });

  const mutation = useMutation({
    mutationFn: registerNewField,
    onSuccess: (data) => {
      toast.success("Field registered successfully!");
      console.log("Response from server:", data);
    },
    onError: (error) => {
      toast.error("Failed to register field. Please try again.");
      console.error(
        "An error occurred:",
        error.response?.data || error.message
      );
    },
  });

  // Registering the location field for Map Picker
  useEffect(() => {
    register("location", {
      required: "Please select the field location from the map.",
    });
  }, [register]);

  // Using 'watch' to get the current value of the 'location' field
  const locationValue = watch("location");

  // When a location is selected from the map, the state of the react-hook-form will be updated.
  const handleLocationSelect = useCallback(
    (latlng) => {
      // SetValue allows you to programmatically set the value of a field.
      setValue("location", latlng, { shouldValidate: true });
    },
    [setValue]
  );

  // This function will work with the data when the form is submitted.
  const onSubmit = (data) => {
    const customizedData = {
      ...data,
      createdAt: new Date().toISOString(),
      email: user?.email || "guest",
    };
    // Send customized data to mutation
    mutation.mutate(customizedData);

    console.log("Customized Data Sent:", customizedData);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="w-full p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Register a New Field
          </h1>
          <p className="mt-2 text-gray-500">
            Add your field details to get personalized farming guidance.
          </p>
        </div>

        {/* The HandleSubmit function will handle form submission */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
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
              // Registering the input with react-hook-form
              {...register("fieldName", {
                required: "Field nickname is required.",
              })}
              className={`w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.fieldName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-500"
              }`}
              placeholder="e.g., Riverside Plot"
            />
            {/* If there is an error, it will be displayed. */}
            {errors.fieldName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.fieldName.message}
              </p>
            )}
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
                {...register("fieldSize", {
                  required: "Field size is required.",
                  valueAsNumber: true,
                  min: { value: 0.1, message: "Field size must be positive." },
                })}
                className={`w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.fieldSize
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-green-500"
                }`}
                placeholder="e.g., 5.5"
              />
              {errors.fieldSize && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.fieldSize.message}
                </p>
              )}
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
                {...register("sizeUnit")}
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
                {...register("soilType", {
                  required: "Please select a soil type.",
                })}
                className={`w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.soilType
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-green-500"
                }`}
              >
                <option value="">Select soil type</option>
                <option value="loam">Loam</option>
                <option value="clay">Clay</option>
                <option value="sandy">Sandy</option>
                <option value="silty">Silty</option>
              </select>
              {errors.soilType && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.soilType.message}
                </p>
              )}
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
                {...register("primaryCrop")}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Potato, Paddy"
              />
            </div>
          </div>

          {/* Irrigation System */}
          <div>
            <label
              htmlFor="irrigationSystem"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Irrigation System
            </label>
            <select
              id="irrigationSystem"
              {...register("irrigationSystem")}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="rain-fed">Rain-fed</option>
              <option value="canal">Canal</option>
              <option value="drip">Drip Irrigation</option>
              <option value="sprinkler">Sprinkler</option>
              <option value="pump">Water Pump</option>
            </select>
          </div>

          {/* Field Location Map */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Field Location (Click on the map to select)
            </label>
            <div className="w-full h-80 lg:h-120 rounded-lg overflow-hidden border-2 border-gray-300">
              <MapPicker
                onLocationSelect={handleLocationSelect}
                selectedLocation={locationValue}
              />
            </div>
            {/* Map errors will be shown here. */}
            {errors.location && !locationValue && (
              <p className="mt-2 text-sm text-red-600">
                {errors.location.message}
              </p>
            )}
            {locationValue && (
              <p className="mt-2 text-sm text-green-700">
                Location Selected: Lat: {locationValue.lat.toFixed(4)}, Lng:{" "}
                {locationValue.lng.toFixed(4)}
              </p>
            )}
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
              {...register("fieldNotes")}
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
