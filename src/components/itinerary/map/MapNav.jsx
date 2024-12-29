import React, { useEffect, useState } from "react";
import { Button, select, Slider } from "@material-tailwind/react";
import { ItinerarySidebar } from "../itinerary_list/ItinerarySidebar";
import AutocompleteSearch from "./Autocomplete";
import { useQuery } from "@tanstack/react-query";
import { fetchNearbyPlaces } from "../../../axios";
import debounce from "lodash.debounce";
import TypeMenu from "./TypeMenu";
import { RxCross1 } from "react-icons/rx";

export default function MapNav({
  selectedLocation,
  setSelectedLocation,
  setNearbyPlaces,
  setSelectedMarker,
}) {
  const [isNearby, setIsNearby] = useState(false);
  const [radius, setRadius] = useState(500);
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
    if (!isNearby) {
      setNearbyPlaces([]);
    }
  }, [isNearby]);

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
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-3">
          <AutocompleteSearch onPlaceSelected={onPlaceSelected} />
          <Button
            disabled={!selectedLocation}
            size="small"
            variant="secondary"
            className="w-[90px] bg-pink-700 px-3"
            onClick={() => {
              setIsNearby(!isNearby);
            }}
          >
            {!isNearby ? (
              "Nearby"
            ) : (
              <div className="w-full flex justify-center items-center">
                <RxCross1 size={16} />
              </div>
            )}
          </Button>
          <ItinerarySidebar setSelectedMarker={setSelectedMarker} />
        </div>
        <div
          className={`w-full flex flex-row gap-4 items-center ${
            isNearby ? "block" : "hidden"
          }`}
        >
          <Slider
            onChange={(e) => setSlider(e.target.value)}
            onMouseUp={() => debouncedSetRadius(slider * 10)}
            onTouchEnd={() => debouncedSetRadius(slider * 10)}
            defaultValue={50}
            value={slider}
          />
          <TypeMenu type={type} setType={setType} />
        </div>
      </div>
    </div>
  );
}
