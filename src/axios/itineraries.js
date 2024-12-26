import { travelSyncAPI } from "./axios";

// add to itinerary
export const addLocationToItinerary = (itinerary_id, event) => {
  return travelSyncAPI
    .post(`/itineraries/${itinerary_id}/events`, event)
    .then(({ data }) => {
      return data;
    });
};

// re-order itinerary
export const updateItineraryOrder = (itinerary_id, itinerary_order) => {
  const params = { itinerary_order: itinerary_order };
  return travelSyncAPI
    .patch(`/itineraries/${itinerary_id}`, params)
    .then(({ data }) => {
      return data;
    });
};

// Get the events of one itinerary
export const getItineraryEvents = (itinerary_id) => {
  return travelSyncAPI
    .get(`/itineraries/${itinerary_id}/events`)
    .then(({ data }) => {
      return data;
    });
};

// Get the details for one itinerary
export const getItineraryByItineraryID = (itinerary_id) => {
  return travelSyncAPI.get(`/itineraries/${itinerary_id}`).then(({ data }) => {
    return data;
  });
};

// Creates a new itinerary
export const createItinerary = (event) => {
  return travelSyncAPI
    .post(`/itineraries`, { name: event })
    .then(({ data }) => {
      console.log(data);
      return data;
    });
};
