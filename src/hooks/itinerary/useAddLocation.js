import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useItinerary } from "../../context/ItineraryContext";
import { addLocationToItinerary } from "../../axios/index";

export function useAddLocation() {
  const { currentItinerary } = useItinerary();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ place_id }) => {
      await addLocationToItinerary(currentItinerary.id, place_id);
    },
    onSuccess: () => {
      // this invalidates "itineraryDetails" so React Query refetches updated data
      queryClient.invalidateQueries(["itineraryDetails", currentItinerary?.id]);
    },
  });
}
