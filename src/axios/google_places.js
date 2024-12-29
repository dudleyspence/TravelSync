export async function fetchNearbyPlaces(center, radius, type) {
  const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary(
    "places"
  );

  const request = {
    fields: ["location"],
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

  const formattedPlaces = places.map((place) => place.Eg);

  return formattedPlaces;
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
      "location",
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
    location: place.location,
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
