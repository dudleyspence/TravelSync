import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { FaSignOutAlt, FaMapMarkedAlt } from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";
import { useCreateItinerary } from "../../hooks/itineraries/useCreateItinerary";

export function CreateItinerary({ setOpenNav }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleOpen = () => setOpen(!open);

  const { mutate: createItinerary, isPending } = useCreateItinerary();

  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
          setOpenNav();
        }}
        className="flex flex-row items-center gap-2"
      >
        <FaMapMarkedAlt size={18} />
        Create Itinerary
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="flex flex-row gap-3">
          <FaMapMarkedAlt size={25} />
          Create Itinerary
        </DialogHeader>
        <DialogBody className="flex flex-col items-center justify-center gap-3">
          <Typography color="black">
            Please choose a name for the Itinerary:
          </Typography>
          <div className="w-72">
            <Input
              style={{ fontSize: "16px", lineHeight: "1.5" }}
              type="text"
              placeholder="Itinerary Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            loading={isPending}
            disabled={!name.trim()}
            variant="gradient"
            color="green"
            onClick={() => {
              handleOpen();
              createItinerary(name);
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
