import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import globe from "../../assets/TravelSyncGlobe.png";
import { FaUserGroup } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { fetchItinerarySummary } from "../../axios/index";
import { useItinerary } from "../../context/ItineraryContext";
import { useNavigate } from "react-router-dom";

export function ItineraryCard({ id }) {
  const { setCurrentItinerary } = useItinerary();
  const navigate = useNavigate();

  function handleEnterItinerary(itinerary) {
    setCurrentItinerary(itinerary);
    navigate("/itinerary_page");
  }

  const {
    data: ItinerarySummary,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["itinerarySummary", id],
    queryFn: () => fetchItinerarySummary(id),
  });

  if (isLoading) return <p>Loading itineraries...</p>;
  if (isError) return <p>Error loading itineraries.</p>;

  console.log(ItinerarySummary);

  return (
    <Card className="mt-6 w-full max-w-96 flex flex-col">
      <div></div>
      <img
        src={globe}
        alt="card-image"
        className="h-60 w-60 p-2 self-center mt-4"
      />
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {ItinerarySummary.name}
        </Typography>
        <Typography
          className="flex flex-row items-center gap-2 font-semibold"
          color="black"
        >
          <IoLocationSharp size={20} color="black" />
          {ItinerarySummary.total_locations}
        </Typography>
        <Typography
          className="flex flex-row items-center gap-2 font-semibold"
          color="black"
        >
          <FaUserGroup size={20} color="black" />
          {ItinerarySummary.total_members}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex flex-row gap-3">
        <Button
          onClick={() => handleEnterItinerary(ItinerarySummary)}
          className="text-[10px] w-fit"
        >
          Continue Planning...
        </Button>
        <Chip
          className="w-fit text-[10px]"
          color="pink"
          value={`Join Code: ${ItinerarySummary.join_code}`}
        />
      </CardFooter>
    </Card>
  );
}
