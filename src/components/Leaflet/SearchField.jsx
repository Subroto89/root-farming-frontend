import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

const SearchField = () => {
  const map = useMap();

  useEffect(() => {
    // Create a provider to search for locations using OpenStreetMap
    const provider = new OpenStreetMapProvider();

    // Create the search control instance with various options
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: "bar", // Style of the search bar
      showMarker: true, // Show a marker on the search result
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
      searchLabel: "Enter address", // Placeholder text for the search input
    });

    // Add the search control to the map
    map.addControl(searchControl);

    // Clean up by removing the control when the component unmounts
    return () => map.removeControl(searchControl);
  }, [map]);

  // This component does not render anything itself, it just adds control to the map
  return null;
};

export default SearchField;
