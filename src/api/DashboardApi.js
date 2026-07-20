import api from "./axios.js";

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/kachehri-stats");
  return response.data;
};

export const getKachehriMonthly = async () => {
  const response = await api.get("/dashboard/kachehri-monthly");
  return response.data; // [{ month: "Jan", value: 8 }, ...]
};

export const getComplaintMonthly = async () => {
  const response = await api.get("/dashboard/complaint-monthly");
  return response.data; // [{ month: "Jan", value: 142 }, ...]
};