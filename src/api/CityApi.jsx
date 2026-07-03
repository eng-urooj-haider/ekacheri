import api from "./axios.jsx";

const getCities = async () => {
  const response = await api.get("/cities");
  return response.data;
};

const getCity = async (id) => {
  const response = await api.get(`/cities/${id}/edit`);
  return response.data;
};

const storeCity = async (data) => {
  const response = await api.post("/cities", data);
  return response.data;
};

const updateCity = async (id, data) => {
  const response = await api.put(`/cities/${id}`, data);
  return response.data;
};

export { getCities, getCity, storeCity, updateCity };