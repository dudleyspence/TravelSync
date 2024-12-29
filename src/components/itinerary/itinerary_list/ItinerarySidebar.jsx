import React, { useState } from "react";
import { Drawer, Card, Button } from "@material-tailwind/react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useItinerary } from "../../../context/ItineraryContext";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMapContext } from "../../../context/MapContext";

export function ItinerarySidebar() {
  const [open, setOpen] = useState(false);
  const { currentItinerary } = useItinerary();
  const navigate = useNavigate();

  const { setSelectedMarker } = useMapContext();

  const toggleDrawer = () => {
    setSelectedMarker(null);
    setOpen(!open);
  };

  return (
    <>
      <button size="md" onClick={toggleDrawer}>
        {open ? (
          <XMarkIcon className="h-8 w-8 stroke-2 cursor-pointer" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2 cursor-pointer" />
        )}
      </button>
      <Drawer open={open} onClose={toggleDrawer}>
        <div className="flex flex-row w-full justify-between p-4 pb-2">
          <Button
            onClick={() => {
              navigate("/dashboard");
            }}
            className="bg-deep-purple-400 py-2 px-2 cursor-pointer"
          >
            <FaHome size={23} />
          </Button>
          <XMarkIcon onClick={toggleDrawer} className="h-8 w-8 stroke-2" />
        </div>

        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <h1>{currentItinerary?.name}</h1>
          <h1>Join Code: {currentItinerary?.join_code}</h1>
        </Card>
      </Drawer>
    </>
  );
}
