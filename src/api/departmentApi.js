import api from "./axios.js";

const getDepartments = async ({
  pageIndex = 0,
  pageSize = 10,
  search = "",
  skipLoader = false,
} = {}) => {
  const response = await api.get("/departments", {
    params: { page: pageIndex + 1, per_page: pageSize, search },
    skipLoader,
  });
  return response.data.data; // must match your CityController's wrapping
};

const getDepartment = async (id) => {
  const response = await api.get(`/departments/${id}/edit`);
  return response.data;
};

const storeDepartment = async (data) => {
  const response = await api.post("/departments", data);
  return response.data;
};

const updateDepartment = async (id, data) => {
  const response = await api.put(`/departments/${id}`, data);
  return response.data;
};

export { getDepartments, getDepartment, storeDepartment, updateDepartment };
