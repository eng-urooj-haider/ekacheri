import api from "./axios.js";

const getLocations = async ({
  pageIndex = 0,
  pageSize = 10,
  search = "",
  skipLoader = false,
} = {}) => {
  const response = await api.get("/locations", {
    params: { page: pageIndex + 1, per_page: pageSize, search },
    skipLoader,
  });
  return response.data.data; // must match your CityController's wrapping
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