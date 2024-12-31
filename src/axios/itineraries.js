import { travelSyncAPI } from "./axios";

// add to itinerary
export const addLocationToItinerary = (itinerary_id, place_id) => {
  console.log(itinerary_id, place_id);
  return travelSyncAPI
    .post(`/itineraries/${itinerary_id}/locations/${place_id}`)
    .then(({ data }) => {
      return data;
    });
};

// re-order itinerary
export const reorderIntinerary = (itinerary_id, location_ids_order) => {
  console.log(location_ids_order);
  return travelSyncAPI
    .put(`/itineraries/${itinerary_id}/reorder`, {
      location_ids_order: location_ids_order,
    })
    .then(({ data }) => {
      return data;
    });
};

// Get the events of one itinerary
export const fetchItineraryLocations = (itinerary_id) => {
  return travelSyncAPI
    .get(`/itineraries/${itinerary_id}/locations`)
    .then(({ data }) => {
      return data;
    });
};

// Get the details for one itinerary
export const fetchItinerary = async (itinerary_id) => {
  try {
    const response = await travelSyncAPI.get(`/itineraries/${itinerary_id}`);
    return response.data;
  } catch (err) {
    console.error(`Error fetching itinerary ${itinerary_id}:`, err);
    throw err;
  }
};

export const getUserItineraries = async (user_id) => {
  try {
    const response = await travelSyncAPI.get(`/users/${user_id}/itineraries`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching itineraries for user ${user_id}:`, error);
    throw error;
  }
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
