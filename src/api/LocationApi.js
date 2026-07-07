import api from "./axios.js";
const getLocations = () => {
  api.get("/Locations");
  return Response.data;
};
const save = (data) => {
  api.post("/locations/create", data);
  return Response.data;
};
const getLocation = (id) => {
  api.get(`/Locations/${id}/edit`);
  return Response.data;
};
const update = (id) => {
  api.get(`/Locations/${id}/edit`);
  return Response.data;
};
export { getLocations, save ,getLocation , update};
