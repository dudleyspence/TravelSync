import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@material-tailwind/react";
import { getUserItineraries } from "../../axios/users";

export default function ItinerariesList({ onEnterItinerary }) {
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
        <p>Continue Planning...</p>
      )}
      <ul className="flex flex-col gap-4 mt-5">
        {itineraries.map((itinerary) => (
          <li key={itinerary.id}>
            <Button
              className="w-full bg-light-blue-800"
              onClick={() => onEnterItinerary(itinerary)}
            >
              {itinerary.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
