import React, { useEffect, useState } from "react";
import { Button, select, Slider } from "@material-tailwind/react";
import { ItinerarySidebar } from "../itinerary_list/ItinerarySidebar";
import AutocompleteSearch from "./Autocomplete";
import { useQuery } from "@tanstack/react-query";
import { fetchNearbyPlaces } from "../../../axios";
import debounce from "lodash.debounce";

export default function MapNav({
  selectedLocation,
  setSelectedLocation,
  setNearbyPlaces,
}) {
  const [isNearby, setIsNearby] = useState(false);
  const [radius, setRadius] = useState(1000);
  const [slider, setSlider] = useState(50);
  const [type, setType] = useState("restaurant");
  const { data, isFetching } = useQuery({
    queryKey: ["nearbyPlaces", selectedLocation, type, radius],
    queryFn: () =>
      fetchNearbyPlaces(selectedLocation.geometry.location, radius, type),
    enabled: isNearby,
    staleTime: 5000,
  });

  useEffect(() => {
    if (data) {
      setNearbyPlaces(data);
    }
  }, [data]);

  function onPlaceSelected(place) {
    setSelectedLocation(place);
  }

  const debouncedSetRadius = debounce((value) => {
    setRadius(value);
  }, 500);

  return (
    <div className="bg-white max-w-[calc(100vw-16px)] rounded-md p-3 absolute top-0 left-0 z-40 m-2">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-2">
          <AutocompleteSearch onPlaceSelected={onPlaceSelected} />
          <Button
            disabled={!selectedLocation}
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
        <Slider
          onChange={(e) => setSlider(e.target.value)}
          onMouseUp={() => debouncedSetRadius(slider * 20)}
          onTouchEnd={() => debouncedSetRadius(slider * 20)}
          defaultValue={50}
          value={slider}
          className={isNearby ? "block" : "hidden"}
        />
      </div>
    </div>
  );
}
