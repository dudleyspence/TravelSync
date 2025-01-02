import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinItinerary } from "../../axios/index";
import { useAuth } from "../../context/AuthContext";

export function useJoinItinerary() {
  const { userLoggedIn } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (joinCode) => {
      await joinItinerary(userLoggedIn.id, joinCode);
    },
    onSuccess: () => {
      // this invalidates "itineraryDetails" so React Query refetches updated data
      queryClient.invalidateQueries(["userItineraries", userLoggedIn.id]);
    },
  });
}
