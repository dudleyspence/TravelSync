import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getUserItineraries } from "../../axios/users";
import { ItineraryCard } from "./ItineraryCard";

export default function ItinerariesList() {
  const { userLoggedIn } = useAuth();

  const {
    data: itineraries = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userItineraries", userLoggedIn.id],
    queryFn: () => getUserItineraries(userLoggedIn.id),
    enabled: !!userLoggedIn,
  });

  if (isLoading) return <p>Loading itineraries...</p>;
  if (isError) return <p>Error loading itineraries.</p>;

  return (
    <div>
      {itineraries.length === 0 ? (
        <p>No itineraries found. Create one above.</p>
      ) : (
        <p className="text-xl font-bold">
          Continue planning your next adventure...
        </p>
      )}
      <ul className="flex flex-row flex-wrap gap-8 mt-5 justify-center">
        {itineraries.map((itinerary) => (
          <li key={itinerary.id}>
            <ItineraryCard id={itinerary.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
