import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import { Plus, Minus, Crosshair } from "lucide-react";

const MapControls = () => {
  // Get the map instance from the parent MapContainer using a hook
  const map = useMap();

  // This useEffect hook fixes a common issue with Leaflet in React Router or tabs.
  // It ensures the map renders correctly by recalculating its size after the component mounts.
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, [map]);

  // Handler function to zoom in the map
  const handleZoomIn = () => map.zoomIn();

  // Handler function to zoom out the map
  const handleZoomOut = () => map.zoomOut();

  // Handler function to find and fly to the user's current location
  const handleGoToCurrentLocation = () => {
    // Uses the browser's built-in Geolocation API to get coordinates
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Smoothly animates the map view to the new location
        map.flyTo([latitude, longitude], 15);
      },
      (error) => {
        // Handles cases where location access is denied or fails
        alert("Location could not be found. Please check permissions.");
        console.error("Geolocation Error:", error);
      }
    );
  };

  return (
    // This div positions the controls at the top-right corner of the map
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      {/* Container for the zoom in/out buttons */}
      <div className="flex flex-col bg-white p-1.5 rounded-lg shadow-lg border border-gray-200">
        {/* The `type="button"` is important to prevent the form from submitting on click */}
        <button
          type="button"
          onClick={handleZoomIn}
          className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          title="Zoom In"
        >
          <Plus size={20} />
        </button>
        <hr className="my-1 border-gray-200" />
        <button
          type="button"
          onClick={handleZoomOut}
          className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          title="Zoom Out"
        >
          <Minus size={20} />
        </button>
      </div>
      {/* Container for the current location button */}
      <div className="bg-white p-1.5 rounded-lg shadow-lg border border-gray-200">
        <button
          type="button"
          onClick={handleGoToCurrentLocation}
          className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          title="Go to My Location"
        >
          <Crosshair size={20} />
        </button>
      </div>
    </div>
  );
};

export default MapControls;
