import { travelSyncAPI } from "./axios";

export const uploadFile = (itinerary_id, file) => {
  return travelSyncAPI
    .post(`/files/upload/${itinerary_id}`, file)
    .then(({ data }) => {
      return data;
    });
};

export const getFiles = (itinerary_id) => {
  return travelSyncAPI.get(`/files/${itinerary_id}`).then(({ data }) => {
    return data;
  });
};

export const deleteSingleFile = (file_id) => {
  return travelSyncAPI
    .delete(`/files/${file_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const downloadFile = (file_id) => {
  return travelSyncAPI.get(`files/download/${file_id}`).then(({ data }) => {
    return data.url;
  });
};
