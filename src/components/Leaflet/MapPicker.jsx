import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import MapControls from "./MapControls";
import SearchField from "./SearchField";

// Importing icon files to fix a common Leaflet issue with bundlers like Webpack/Vite
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for a common issue where Leaflet's default icons don't load correctly
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// This component is for listening to map click events
function LocationMarker({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      // e.latlng contains the latitude and longitude of the clicked location
      onLocationSelect(e.latlng);
    },
  });

  // This component doesn't render anything itself, it just listens for events
  return null;
}

const MapPicker = ({ onLocationSelect, selectedLocation }) => {
  const defaultPosition = [26.3284, 89.4554]; // Default location set to Cooch Behar

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full z-0"
      zoomControl={false} // Disable default zoom controls as we have custom ones
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* This component will now handle click events */}
      <LocationMarker onLocationSelect={onLocationSelect} />

      {/* To show a marker at the selected location */}
      {selectedLocation && <Marker position={selectedLocation}></Marker>}

      {/* For zoom and other map controls */}
      <MapControls />

      {/* For the search bar */}
      <SearchField />
    </MapContainer>
  );
};

export default MapPicker;
