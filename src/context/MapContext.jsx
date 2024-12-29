import React, { createContext, useContext, useState } from "react";

const MapContext = createContext();

export function MapProvider({ children }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [type, setType] = useState("restaurant");
  const [radius, setRadius] = useState(50);
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <MapContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        nearbyPlaces,
        setNearbyPlaces,
        type,
        setType,
        radius,
        setRadius,
        selectedMarker,
        setSelectedMarker,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  return useContext(MapContext);
}
