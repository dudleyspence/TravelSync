import { travelSyncAPI } from "./axios";

// Use a join code to join an itinerary
export const joinItinerary = (userId, joinCode) => {
  return travelSyncAPI
    .post(`/itinerary_members/join`, {
      user_id: userId,
      join_code: joinCode,
    })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return Promise.reject({
        status: 404,
        msg: "Request failed with status code 404",
      });
    });
};
