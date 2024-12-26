import { travelSyncAPI } from "./axios";

// Gets all details for one user
export const getUser = (user_id) => {
  return travelSyncAPI.get(`/users/${user_id}`).then(({ data }) => {
    return data;
  });
};

// Fetch all itineraries for a specific user
export const getUserItineraries = async (user_id) => {
  try {
    const response = await travelSyncAPI.get(`/users/${user_id}/itineraries`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching itineraries for user ${user_id}:`, error);
    throw error;
  }
};

// Create user (sign-up)
export const saveNewUser = (user_id, name, email) => {
  const userObj = {
    id: user_id,
    name: name,
    email: email,
  };
  return travelSyncAPI.post(`/users/`, userObj).then(({ data }) => {
    return data;
  });
};
