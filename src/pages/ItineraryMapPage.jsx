import React, { useState, useEffect } from "react";
import { useItinerary } from "../context/ItineraryContext";
import MapNav from "../components/itinerary/map/MapNav";
import MapComponent from "../components/itinerary/map/MapComponent";

export default function ItineraryMapPage() {
  const { currentItinerary } = useItinerary();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    console.log(nearbyPlaces);
  }, [nearbyPlaces]);

  return (
    <div>
      <MapNav
        setSelectedLocation={setSelectedLocation}
        selectedLocation={selectedLocation}
        setSelectedMarker={setSelectedMarker}
        setNearbyPlaces={setNearbyPlaces}
      />
      <MapComponent
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        selectedLocation={selectedLocation}
        nearbyPlaces={nearbyPlaces}
      />
    </div>
  );
}
