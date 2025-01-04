import { Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function AutocompleteSearch({ onPlaceSelected }) {
  useEffect(() => {
    const input = document.getElementById("autocomplete");
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        onPlaceSelected(place);
      }
    });
  }, [onPlaceSelected]);

  return (
    <div className="relative">
      <Input
        className="!text-[17px]"
        id="autocomplete"
        label="Search"
        icon={<IoIosSearch size={20} />}
      />
    </div>
  );
}
