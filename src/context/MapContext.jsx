import React, { createContext, useContext, useState } from "react";

const MapContext = createContext();

export function MapProvider({ children }) {
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [isNearby, setIsNearby] = useState(false);
  const [type, setType] = useState("restaurant");
  const [radius, setRadius] = useState(2000);
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <MapContext.Provider
      value={{
        searchedLocation,
        setSearchedLocation,
        nearbyPlaces,
        setNearbyPlaces,
        type,
        setType,
        radius,
        setRadius,
        selectedMarker,
        setSelectedMarker,
        isNearby,
        setIsNearby,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  return useContext(MapContext);
}
