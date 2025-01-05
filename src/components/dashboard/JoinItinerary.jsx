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
import { MdGroupAdd } from "react-icons/md";
import { useCreateItinerary } from "../../hooks/itineraries/useCreateItinerary";
import { useJoinItinerary } from "../../hooks/itineraries/useJoinItinerary";

export function JoinItinerary({ setOpenNav }) {
  const [open, setOpen] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  const handleOpen = () => setOpen(!open);

  const { mutate: joinItinerary, isPending, isError } = useJoinItinerary();

  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
          setOpenNav();
        }}
        className="flex flex-row items-center gap-2"
      >
        <MdGroupAdd size={18} />
        Join Itinerary
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="flex flex-row gap-3">
          <MdGroupAdd size={25} />
          Join Itinerary
        </DialogHeader>
        <DialogBody className="flex flex-col items-center justify-center gap-3">
          {!isError ? (
            <Typography color="black">
              Please enter the itinerary join code:
            </Typography>
          ) : (
            <Typography color="red">Incorrect Join Code, Try again:</Typography>
          )}
          <div className="w-72">
            <Input
              type="text"
              placeholder="Join Code"
              onChange={(e) => {
                setJoinCode(e.target.value);
              }}
              style={{ fontSize: "16px", lineHeight: "1.5" }}
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
            disabled={!joinCode.trim()}
            variant="gradient"
            color="green"
            onClick={() => {
              handleOpen();
              joinItinerary(joinCode);
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
