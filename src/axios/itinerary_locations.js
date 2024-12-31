import { travelSyncAPI } from "./axios";

export const deleteLocationById = (event_id) => {
  return travelSyncAPI
    .delete(`/itinerary-events/${event_id}`)
    .then((response) => {
      return response;
    });
};
