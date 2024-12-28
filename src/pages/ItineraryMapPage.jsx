import React, { useState, useEffect } from "react";
import { useItinerary } from "../context/ItineraryContext";
import MapNav from "../components/itinerary/map/MapNav";
import MapComponent from "../components/itinerary/map/MapComponent";

export default function ItineraryMapPage() {
  const { currentItinerary } = useItinerary();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  useEffect(() => {
    console.log(nearbyPlaces);
  }, [nearbyPlaces]);

  return (
    <div>
      <MapNav
        setSelectedLocation={setSelectedLocation}
        selectedLocation={selectedLocation}
        setNearbyPlaces={setNearbyPlaces}
      />
      <MapComponent
        selectedLocation={selectedLocation}
        nearbyPlaces={nearbyPlaces}
      />
    </div>
  );
}
