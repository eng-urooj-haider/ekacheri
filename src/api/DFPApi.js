import api from "./axios.js";

const getDFPs = async ({
  pageIndex = 0,
  pageSize = 10,
  search = "",
  skipLoader = false,
} = {}) => {
  const response = await api.get("/dfps", {
    params: { page: pageIndex + 1, per_page: pageSize, search },
    skipLoader,
  });
  return response.data.data; // must match your CityController's wrapping
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
