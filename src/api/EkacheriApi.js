import api from "./axios.js";

// const get
const getLatestId = () => {
    return api.get('/latest_kacheries')
};
const getEkachehries = () => {
  return api.get("/locations");
};

const getEkachehri = (id) => {
  return api.get(`/locations/${id}/edit`);
};

const storeEkachehri = (data) => {
  return api.post("/locations", data);
};

const updateEkachehri = (id, data) => {
  return api.put(`/locations/${id}`, data);
};

export { getEkachehries, storeEkachehri, getEkachehri, updateEkachehri , getLatestId};
