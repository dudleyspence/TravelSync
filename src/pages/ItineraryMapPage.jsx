import React from "react";
import MapNav from "../components/itinerary/map/MapNav";
import MapComponent from "../components/itinerary/map/MapComponent";
import { MapProvider } from "../context/MapContext";

export default function ItineraryMapPage() {
  return (
    <MapProvider>
      <MapNav />
      <MapComponent />
    </MapProvider>
  );
}
