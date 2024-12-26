import axios from "axios";

export const travelSyncAPI = axios.create({
  baseURL: "https://travelsync-api-extended-production.up.railway.app/api",
});
