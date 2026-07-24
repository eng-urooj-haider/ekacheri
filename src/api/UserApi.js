import api from "./axios.js";

const getUser = async () => {
  const response = await api.get("/get-user");
  return response.data;
};

export { getUser};