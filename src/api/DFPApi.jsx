import api from "./axios.js";

const getDFPs = async () => {
  const response = await api.get("/dfps");
  return response.data;
};

const getDFP = async (id) => {
  const response = await api.get(`/dfps/${id}/edit`);
  return response.data;
};

const storeDFP = async (data) => {
  const response = await api.post("/dfps", data);
  return response.data;
};

const updateDFP = async (id, data) => {
  const response = await api.put(`/dfps/${id}`, data);
  return response.data;
};

export { getDFPs, getDFP, storeDFP, updateDFP };