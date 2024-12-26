import { travelSyncAPI } from "./axios";

export const getSingleLocation = (addressStr) => {
  return travelSyncAPI
    .post(`/places/info?address=${addressStr}`)
    .then(({ data }) => {
      const singleLocationData = data.placeInfo[0];
      return singleLocationData;
    });
};

export const getPlaceDetail = (place_id) => {
  return travelSyncAPI
    .post(`/places/detail?place_id=${place_id}`)
    .then((placeDetail) => {
      return placeDetail.data.details;
    });
};

export const getNearbyLocations = (coords, radius, type) => {
  return travelSyncAPI
    .post(
      `/places/nearby?location=${coords.lat}%2C${coords.lng}&radius=${radius}&type=${type}`
    )
    .then((locations) => {
      return locations.data.locations;
    });
};
