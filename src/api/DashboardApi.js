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
export const getComplaintStatus = async () => {
  const response = await api.get("/dashboard/complaint-status");
  return response.data; // [{ month: "Jan", value: 142 }, ...]
};
export const getTotalCity = async () => {
  const response = await api.get("/dashboard/total-city");
  return response.data; // [{ month: "Jan", value: 142 }, ...]
};
export const getTotalDfp = async () => {
  const response = await api.get("/dashboard/total-dfp");
  return response.data; // [{ month: "Jan", value: 142 }, ...]
};
