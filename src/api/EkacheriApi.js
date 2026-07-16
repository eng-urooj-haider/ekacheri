import api from "./axios.js";

// const get
const getLatestId = () => {
    return api.get('/latest_kacheries')
};
const getEkachehries = () => {
  return api.get("/kachehries");
};

const getEkachehri = (id) => {
  return api.get(`/kachehries/${id}/edit`);
};

const storeEkachehri = (data) => {
  return api.post("/kachehries", data);
};

const updateEkachehri = (id, data) => {
  return api.put(`/kachehries/${id}`, data);
};
const checkEkachehriExists = async (uuid) => {
  const response = await api.get(`/complaints/fetchuuid/${uuid}`);
  return response.data;
};
export { getEkachehries, storeEkachehri, getEkachehri, updateEkachehri , getLatestId , checkEkachehriExists};
