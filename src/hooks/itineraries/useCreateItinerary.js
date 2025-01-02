import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItinerary } from "../../axios/index";
import { useAuth } from "../../context/AuthContext";

export function useCreateItinerary() {
  const { userLoggedIn } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name) => {
      await createItinerary(userLoggedIn.id, name);
    },
    onSuccess: () => {
      // this invalidates "itineraryDetails" so React Query refetches updated data
      queryClient.invalidateQueries(["userItineraries", userLoggedIn.id]);
    },
  });
}
