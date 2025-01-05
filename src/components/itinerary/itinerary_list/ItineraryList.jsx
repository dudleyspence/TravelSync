import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import { fetchItineraryLocations, fetchPlaceDetails } from "../../../axios";
import { useItinerary } from "../../../context/ItineraryContext";
import { MdDragIndicator } from "react-icons/md";
import { Chip } from "@material-tailwind/react";
import { useReorderItinerary } from "../../../hooks/itinerary/useReorderItinerary";
import { useMapContext } from "../../../context/MapContext";
import { TiDeleteOutline } from "react-icons/ti";
import { useDeleteLocation } from "../../../hooks/itinerary/useDeleteLocation";

export default function ItineraryList({ toggleDrawer }) {
  const [locations, setLocations] = useState([]);
  const { currentItinerary } = useItinerary();
  const { setIsNearby, setSearchedLocation, setSelectedMarker } =
    useMapContext();

  const { data } = useQuery({
    queryKey: ["itineraryDetails", currentItinerary?.id],
    queryFn: async () => {
      const locations = await fetchItineraryLocations(currentItinerary?.id);
      console.log(locations);

      const detailedLocations = await Promise.all(
        locations.map(async (location) => {
          const detailedLocation = await fetchPlaceDetails(location.place_id);
          detailedLocation.location_id = location.id;
          detailedLocation.order_index = location.order_index;
          return detailedLocation;
        })
      );
      return detailedLocations;
    },
    enabled: !!currentItinerary,
  });

  const {
    mutate: reorderItinerary,
    isPending: updatingOrder,
    error: errorUpdatingOrder,
  } = useReorderItinerary();

  const {
    mutate: deleteLocation,
    isPending: deletingLocation,
    error: errorDeletingLocation,
  } = useDeleteLocation();

  useEffect(() => {
    if (data) {
      setLocations(data);
    }
  }, [data]);

  function reorder(order_list, startIndex, endIndex) {
    // made a copy to not mutate the original list
    const order_list_copy = Array.from(order_list);
    // here we remove the location at the startIndex and add it at the endIndex
    const [removed_location] = order_list_copy.splice(startIndex, 1);
    order_list_copy.splice(endIndex, 0, removed_location);
    return order_list_copy;
  }

  // Called whenever a drag ends (user drops the item)
  function handleDragEnd(result) {
    // We're only interested in the case where the item is being dropped into another item
    const { destination, source } = result;
    // if the user drops the item out the drop area the destination will be null and we ignore

    if (!destination) return;

    // this handles the case where we drag and drop into the same position
    // so basically no change
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Reorders the array locally in state
    const newLocations = reorder(locations, source.index, destination.index);

    // this updates the order_index for each location to be its new index
    newLocations.forEach((item, index) => {
      item.order_index = index;
    });

    setLocations(newLocations);

    const location_ids_order = newLocations.map((loc) => loc.location_id);
    reorderItinerary(location_ids_order);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="itinerary-droppable">
        {(provided) => (
          <div
            className=""
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {locations.map((loc, index) => (
              <Draggable
                key={loc.location_id}
                draggableId={String(loc.location_id)}
                index={index}
              >
                {(provided) => (
                  <div
                    className="bg-teal-50 rounded-md flex flex-row items-center justify-between p-3 mb-4"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="flex flex-col justify-start gap-2">
                      <a
                        onClick={() => {
                          setSearchedLocation(loc);
                          setSelectedMarker(loc);
                          setIsNearby(false);
                          const searchInput =
                            document.getElementById("autocomplete");
                          if (searchInput) {
                            searchInput.value = "";
                          }
                          toggleDrawer();
                        }}
                      >
                        {loc.title}
                      </a>
                      <div className="flex flex-row gap-2 items-center">
                        <TiDeleteOutline
                          onClick={() => {
                            console.log(loc.location_id);
                            deleteLocation(loc.location_id);
                          }}
                          className="cursor-pointer"
                        />
                        {loc?.type && (
                          <Chip
                            variant="ghost"
                            color="green"
                            value={loc.type}
                            className="text-[9px] text-black font-extrabold px-2 w-fit"
                          />
                        )}
                      </div>
                    </div>
                    <MdDragIndicator size={20} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {errorUpdatingOrder && (
        <p>Error updating order: {errorUpdatingOrder.message}</p>
      )}
      {errorDeletingLocation && (
        <p>Error deleting location: {errorDeletingLocation.message}</p>
      )}
    </DragDropContext>
  );
}
