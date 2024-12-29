import React from "react";
import { MdAddLocationAlt } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  CardFooter,
  Button,
} from "@material-tailwind/react";

function StarIcon({ rating, ratingsCount }) {
  return (
    <div className="flex flex-row gap-1 justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5 text-yellow-700"
      >
        <path
          fillRule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-sm">
        {rating} ({ratingsCount})
      </p>
    </div>
  );
}

function Directions({ mapsURI }) {
  return (
    <a
      href={mapsURI}
      className="flex flex-row items-center gap-1"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button className="flex flex-row p-2 bg-blue-100">
        <img
          className="h-[25px] w-[25px]"
          src="https://www.svgrepo.com/show/271100/google-maps.svg"
          alt="directions link"
        />
      </Button>
    </a>
  );
}

function Website({ website }) {
  return (
    <a
      href={website}
      className="flex flex-row items-center gap-1"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button className="flex flex-row p-2 bg-orange-300">
        <FiExternalLink size={25} color="black" />
      </Button>
    </a>
  );
}

export default function SelectedPinSummary({
  title,
  description,
  address,
  rating,
  website,
  image,
  type,
  ratingsCount,
  googleMaps,
}) {
  console.log(website);
  return (
    <Card className="fixed bottom-3 left-1/2 transform -translate-x-1/2 w-11/12 max-w-[400px] bg-white px-4 rounded-xl shadow-xl z-40">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-4"
      >
        <div className="flex w-full flex-col gap-1.5">
          {title && (
            <Typography variant="h5" color="blue-gray">
              {title}
            </Typography>
          )}
          <div className="flex flex-row gap-4 items-center">
            {rating && <StarIcon rating={rating} ratingsCount={ratingsCount} />}
            {type && (
              <Chip
                variant="ghost"
                value={type}
                className="text-[9px] font-extrabold px-2"
              />
            )}
          </div>
        </div>
        {image && (
          <Avatar size="xl" variant="rounded" src={image} alt={title} />
        )}
      </CardHeader>
      <CardBody className="p-0">
        {description && <Typography>{description}</Typography>}
      </CardBody>
      <CardFooter className="flex flex-row gap-5 w-full justify-start px-0 py-3">
        <Button className="p-1.5 bg-teal-800">
          <MdAddLocationAlt size={25} />
        </Button>
        {googleMaps && <Directions mapsURI={googleMaps} />}
        {website && <Website website={website} />}
      </CardFooter>
    </Card>
  );
}
