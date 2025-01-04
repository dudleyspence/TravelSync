import React from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { useMapContext } from "../../../context/MapContext";

export default function ToggleSidebar({ toggleDrawer, open }) {
  const { setSelectedMarker } = useMapContext();

  return (
    <button
      onClick={() => {
        toggleDrawer();
        if (!open) {
          setSelectedMarker(null);
        }
      }}
    >
      {open ? (
        <XMarkIcon className="h-8 w-8 stroke-2 cursor-pointer" />
      ) : (
        <Bars3Icon className="h-8 w-8 stroke-2 cursor-pointer" />
      )}
    </button>
  );
}
