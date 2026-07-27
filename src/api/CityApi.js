import api from "./axios.js";

const getCities = async ({
  pageIndex = 0,
  pageSize = 10,
  search = "",
  skipLoader = false,
} = {}) => {
  const response = await api.get("/cities", {
    params: { page: pageIndex + 1, per_page: pageSize, search },
    skipLoader,
  });
  return response.data.data; // must match your CityController's wrapping
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
