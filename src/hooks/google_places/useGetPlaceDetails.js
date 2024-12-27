import { useQuery } from "@tanstack/react-query";

export function useGetPlaceDetails(place_id) {
  return useQuery({
    queryKey: ["place_details", place_id],
    queryFn: async () => {
      const { Place } = await google.maps.importLibrary("places");
      const place = new Place({
        id: place_id,
        requestedLanguage: "en",
      });
      await place.fetchFields({
        fields: ["displayName", "formattedAddress", "location"],
      });
      console.log(place.displayName);
      console.log(place.formattedAddress);
      return place;
    },
  });
}
