import api from "./axios.js";

const getDepartments = async () => {
  const response = await api.get("/departments");
  return response.data;
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
