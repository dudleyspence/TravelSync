import { travelSyncAPI } from "./axios";

export const deleteLocationById = (location_id) => {
  return travelSyncAPI.delete(`locations/${location_id}`).then((response) => {
    return response;
  });
};
