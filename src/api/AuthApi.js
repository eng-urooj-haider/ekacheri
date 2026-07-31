// AuthApi.js
import api from "./axios.js";

let csrfReady = false;

const ensureCsrfCookie = async () => {
  if (csrfReady) return;
  await api.get("/sanctum/csrf-cookie");
  csrfReady = true;
};

const login = async (credentials) => {
  await ensureCsrfCookie(); // skips the network call after the first time
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

export { login, logout, getUser, ensureCsrfCookie };