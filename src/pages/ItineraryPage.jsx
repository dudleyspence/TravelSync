import React from "react";
import { useItinerary } from "../context/ItineraryContext";
import MapComponent from "../components/itinerary/map/map";
import { ItinerarySidebar } from "../components/itinerary/itinerary_list/ItinerarySidebar";

export default function ItineraryPage() {
  const { currentItinerary } = useItinerary();
  return (
    <div>
      <MapComponent />
    </div>
  );
}
