import api from "./axios.js";

const getComplaints = async () => {
  const response = await api.get("/complaints");
  return response.data;
};

const getComplaint = async (id) => {
  const response = await api.get(`/complaints/${id}/edit`);
  return response.data;
};

const storeComplaint = async (data) => {
  const response = await api.post("/complaints", data);
  return response.data;
};

const updateComplaint = async (id, data) => {
  const response = await api.put(`/complaints/${id}`, data);
  return response.data;
};
const allComplaints = async (id) => {
  const response = await api.get(`/all_complaints/${id}`);
  return response.data;
};
export {
  getComplaints,
  getComplaint,
  storeComplaint,
  updateComplaint,
  allComplaints,
};
