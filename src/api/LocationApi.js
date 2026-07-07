import api from "./axios.js";

const getLocations = () => {
  return api.get("/locations");
};

const getLocation = (id) => {
  return api.get(`/locations/${id}/edit`);
};

const save = (data) => {
  return api.post("/locations", data);
};

const update = (id, data) => {
  return api.put(`/locations/${id}`, data);
};

export { getLocations, save, getLocation, update };