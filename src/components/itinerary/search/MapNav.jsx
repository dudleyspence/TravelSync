import React, { useState } from "react";
import { Button, Slider } from "@material-tailwind/react";
import { ItinerarySidebar } from "../itinerary_list/ItinerarySidebar";
import AutocompleteSearch from "./Autocomplete";

export default function MapNav({ setSelectedLocation }) {
  const [isNearby, setIsNearby] = useState(false);

  function onPlaceSelected(place) {
    setSelectedLocation(place);
  }

  return (
    <div className="bg-white max-w-[calc(100vw-16px)] rounded-md p-3 absolute top-0 left-0 z-40 m-2">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-2">
          <AutocompleteSearch onPlaceSelected={onPlaceSelected} />
          <Button
            size="small"
            variant="secondary"
            className="w-full bg-pink-700 px-3"
            onClick={() => {
              setIsNearby(!isNearby);
            }}
          >
            {isNearby ? "Single" : "Nearby"}
          </Button>
          <ItinerarySidebar />
        </div>
        <Slider defaultValue={50} className={isNearby ? "block" : "hidden"} />
      </div>
    </div>
  );
}
