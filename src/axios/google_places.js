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

export async function fetchPlaceDetails(place_id) {
  const { Place } = await google.maps.importLibrary("places");
  const place = new Place({
    id: place_id,
    requestedLanguage: "en",
  });
  await place.fetchFields({
    fields: [
      "displayName",
      "formattedAddress",
      "editorialSummary",
      "rating",
      "photos",
      "primaryType",
      "primaryTypeDisplayName",
      "regularOpeningHours",
      "userRatingCount",
      "websiteURI",
      "googleMapsURI",
      "types",
      "businessStatus",
    ],
  });

  const detailedPlace = {
    place_id: place.id,
    title: place?.displayName,
    description: place?.editorialSummary,
    address: place?.formattedAddress,
    rating: place?.rating,
    website: place?.websiteURI,
    photo: place?.photos[0]?.getURI(),
    type: place?.primaryTypeDisplayName,
    ratingCount: place?.userRatingCount,
    googleMaps: place?.googleMapsURI,
  };

  return detailedPlace;
}
