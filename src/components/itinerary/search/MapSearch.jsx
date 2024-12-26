import React from "react";
import { Input, Slider } from "@material-tailwind/react";

export default function MapSearch() {
  return (
    <div className="bg-white rounded-md p-2 top-3 left-3 z-40 w-[300px]">
      <div className="w-72 flex flex-col gap-3">
        <Input label="Input With Icon" icon={<i className="fas fa-heart" />} />
        <Slider defaultValue={50} />
      </div>
    </div>
  );
}
