export async function fetchNearbyPlaces(center, radius, type) {
  console.log("hello");
  const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary(
    "places"
  );

  const request = {
    fields: ["displayName", "location"],
    locationRestriction: {
      center: center,
      radius: radius,
    },
    includedPrimaryTypes: [type],
    maxResultCount: 20,
    rankPreference: SearchNearbyRankPreference.POPULARITY,
    language: "en-US",
  };

  const { places } = await Place.searchNearby(request);
  return places;
}
