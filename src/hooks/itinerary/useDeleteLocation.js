import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useItinerary } from "../../context/ItineraryContext";
import { deleteLocationById } from "../../axios/index";

export function useDeleteLocation() {
  const { currentItinerary } = useItinerary();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (location_id) => {
      console.log(location_id);
      await deleteLocationById(location_id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries(["itineraryDetails", currentItinerary?.id]),
  });
}
