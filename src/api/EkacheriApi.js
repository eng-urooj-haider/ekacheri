import api from "./axios.js";

// const get
const getLatestId = () => {
  return api.get("/latest_kacheries");
};
const getEkachehries = async ({
  pageIndex = 0,
  pageSize = 10,
  search = "",
  skipLoader = false,
} = {}) => {
  const response = await api.get("/kachehries", {
    params: { page: pageIndex + 1, per_page: pageSize, search },
    skipLoader,
  });
  return response.data.data; // must match your CityController's wrapping
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
export {
  getEkachehries,
  storeEkachehri,
  getEkachehri,
  updateEkachehri,
  getLatestId,
  checkEkachehriExists,
};
