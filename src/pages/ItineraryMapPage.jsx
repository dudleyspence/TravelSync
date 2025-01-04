import React, { useState } from "react";
import MapNav from "../components/itinerary/map/MapNav";
import MapComponent from "../components/itinerary/map/MapComponent";
import { MapProvider } from "../context/MapContext";
import { ItinerarySidebar } from "../components/itinerary/itinerary_list/ItinerarySidebar";

export default function ItineraryMapPage() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <MapProvider>
      <ItinerarySidebar toggleDrawer={toggleDrawer} open={open} />
      <MapNav toggleDrawer={toggleDrawer} open={open} />
      <MapComponent />
    </MapProvider>
  );
}
