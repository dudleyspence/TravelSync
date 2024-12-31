import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useItinerary } from "../../context/ItineraryContext";
import { reorderIntinerary } from "../../axios/index";

export function useReorderItinerary() {
  const queryClient = useQueryClient();
  const { currentItinerary } = useItinerary();

  return useMutation({
    mutationFn: (location_ids_order) =>
      reorderIntinerary(currentItinerary.id, location_ids_order),
    onSuccess: () => {
      // this invalidates "itineraryDetails" so React Query refetches updated data
      queryClient.invalidateQueries(["itineraryDetails", currentItinerary?.id]);
    },
  });
}
