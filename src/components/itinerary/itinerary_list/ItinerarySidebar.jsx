import React, { useState } from "react";
import {
  Drawer,
  Card,
  Button,
  Chip,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useItinerary } from "../../../context/ItineraryContext";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMapContext } from "../../../context/MapContext";
import ItineraryList from "./ItineraryList";

export function ItinerarySidebar() {
  const [open, setOpen] = useState(false);
  const { currentItinerary } = useItinerary();
  const navigate = useNavigate();
  const { setSelectedMarker } = useMapContext();

  const toggleDrawer = () => {
    if (!open) {
      setSelectedMarker(null);
    }
    setOpen(!open);
  };

  return (
    <>
      <button onClick={toggleDrawer}>
        {open ? (
          <XMarkIcon className="h-8 w-8 stroke-2 cursor-pointer" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2 cursor-pointer" />
        )}
      </button>
      <Drawer
        open={open}
        onClose={toggleDrawer}
        className=" m-0 max-h-screen flex flex-col gap-5 p-3"
      >
        <div>
          <div className="flex flex-row w-full justify-between pb-2">
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-deep-purple-400 py-2 px-2"
            >
              <FaHome size={23} />
            </Button>
            <XMarkIcon onClick={toggleDrawer} className="h-8 w-8 stroke-2" />
          </div>
          <Typography variant="h5" className="mt-6 mb-2" color="blue-gray">
            {currentItinerary?.name}
          </Typography>
        </div>
        <div className="overflow-scroll">
          <ItineraryList toggleDrawer={toggleDrawer} />
        </div>
        <div className="h-[50px] ">
          <Chip
            className="w-fit"
            color="pink"
            value={`Join Code: ${currentItinerary?.join_code}`}
          />
        </div>
      </Drawer>
    </>
  );
}
