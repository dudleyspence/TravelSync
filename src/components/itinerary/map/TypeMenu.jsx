import React from "react";
import { useMapContext } from "../../../context/MapContext";

const types = [
  "restaurant",
  "amusement_park",
  "aquarium",
  "art_gallery",
  "bowling_alley",
  "cafe",
  "clothing_store",
  "convenience_store",
  "department_store",
  "embassy",
  "food",
  "landmark",
  "movie_theater",
  "museum",
  "park",
  "shopping_mall",
  "stadium",
  "store",
  "tourist_attraction",
  "zoo",
];

export default function TypeMenu() {
  const { type, setType } = useMapContext();
  return (
    <div className="w-full max-w-[150px]">
      <div className="relative">
        <select
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type
                .split("_")
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(" ")}
            </option>
          ))}
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="currentColor"
          className="h-5 w-5 absolute top-2.5 right-2.5 text-slate-700 pointer-events-none"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </div>
    </div>
  );
}
