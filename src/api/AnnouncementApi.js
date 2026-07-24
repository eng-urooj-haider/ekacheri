import api from "./axios.js";

export const getActiveAnnouncements = async () => {
  const response = await api.get("/announcements/active");
  return response.data; // ["message one", "message two", ...]
};