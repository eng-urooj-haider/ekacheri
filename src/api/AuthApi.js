import api from "./axios.js";

const login = async (credentials) => {
  await api.get("/sanctum/csrf-cookie");
  const response = await api.post("/login", credentials);
  return response.data;
};

const logout = async () => {
  const response = await api.post("/logout");
  return response.data;
};

const getUser = async () => {
  const response = await api.get("/get-user");
  return response.data.user;
};

export { login, logout, getUser };