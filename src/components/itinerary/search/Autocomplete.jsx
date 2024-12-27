import { Input } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

const AutocompleteSearch = ({ onPlaceSelected }) => {
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
    <div>
      <Input id="autocomplete" label="Search" icon={<IoIosSearch />} />
    </div>
  );
};

export default AutocompleteSearch;
