import React from "react";
import { useItinerary } from "../context/ItineraryContext";
import { useNavigate } from "react-router-dom";
import ItinerariesList from "../components/dashboard/ItinerariesList";
import { Button } from "@material-tailwind/react";

export default function DashboardPage() {
  const { setCurrentItinerary } = useItinerary();
  const navigate = useNavigate();

  function handleCreateItinerary() {}

  function handleJoinItinerary() {}

  function handleEnterItinerary(itinerary) {
    setCurrentItinerary(itinerary);
    navigate("/itinerary_page");
  }

  return (
    <div className="page gap-8">
      <h1>Your Itineraries</h1>
      <Button onClick={handleCreateItinerary}>Create New Itinerary</Button>
      <Button onClick={handleJoinItinerary}>Join Itinerary</Button>
      <ItinerariesList onEnterItinerary={handleEnterItinerary} />
    </div>
  );
}
