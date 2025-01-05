import React, { useEffect, useState } from "react";
import { Button, select, Slider, Typography } from "@material-tailwind/react";
import { ItinerarySidebar } from "../itinerary_list/ItinerarySidebar";
import AutocompleteSearch from "./Autocomplete";
import { useQuery } from "@tanstack/react-query";
import { fetchNearbyPlaces, fetchPlaceDetails } from "../../../axios";
import debounce from "lodash.debounce";
import TypeMenu from "./TypeMenu";
import { RxCross1 } from "react-icons/rx";
import { useMapContext } from "../../../context/MapContext";
import ToggleSidebar from "../itinerary_list/ToggleSidebar";

function RadiusInKilometers({ radius }) {
  return (
    <Typography className="font-medium">
      Search Radius: {(radius / 1000).toFixed(2)} km
    </Typography>
  );
}

export default function MapNav({ toggleDrawer, open }) {
  const { isNearby, setIsNearby } = useMapContext();
  const [slider, setSlider] = useState(18);

  const {
    type,
    radius,
    setRadius,
    searchedLocation,
    setSearchedLocation,
    setNearbyPlaces,
    setSelectedMarker,
  } = useMapContext();

  const { data } = useQuery({
    queryKey: ["nearbyPlaces", isNearby, searchedLocation, type, radius],
    queryFn: () => fetchNearbyPlaces(searchedLocation.location, radius, type),
    enabled: isNearby,
    staleTime: 5000,
  });

  useEffect(() => {
    if (!isNearby) {
      setNearbyPlaces([]);
      setSelectedMarker(searchedLocation);
    }
  }, [isNearby]);

  useEffect(() => {
    if (data) {
      setNearbyPlaces(data);
    }
  }, [data]);

  async function onPlaceSelected(place) {
    const detailedPlace = await fetchPlaceDetails(place.place_id);
    setSearchedLocation(detailedPlace);
    setSelectedMarker(detailedPlace);
  }

  const debouncedSetRadius = debounce((value) => {
    const minRadius = 200;
    const radius = minRadius + value * 100;
    setRadius(radius);
  }, 500);

  return (
    <div className="bg-white max-w-[calc(100vw-16px)] rounded-md p-3 fixed top-0 left-0 z-40 m-2">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-3">
          <AutocompleteSearch onPlaceSelected={onPlaceSelected} />
          <Button
            disabled={!searchedLocation}
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
          <ToggleSidebar toggleDrawer={toggleDrawer} open={open} />
        </div>
        <div
          className={`w-full flex flex-row gap-4 items-center ${
            isNearby ? "block" : "hidden"
          }`}
        >
          <div>
            <Slider
              onChange={(e) => setSlider(e.target.value)}
              onMouseUp={() => debouncedSetRadius(slider)}
              onTouchEnd={() => debouncedSetRadius(slider)}
              defaultValue={50}
              value={slider}
              className="mb-3"
            />
            <RadiusInKilometers radius={radius} />
          </div>
          <TypeMenu />
        </div>
      </div>
    </div>
  );
}
