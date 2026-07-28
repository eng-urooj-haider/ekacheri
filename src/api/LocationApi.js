import api from "./axios.js";

const getLocations = async ({
  pageIndex = 0,
  pageSize = 10,
  search = "",
  skipLoader = false,
  notPaginate = false, // FIXED: default false, preserves existing pagination behavior
} = {}) => {
  const response = await api.get("/locations", {
    params: notPaginate
      ? { not_paginate: true } // FIXED: goes inside params, snake_case to match Laravel convention
      : { page: pageIndex + 1, per_page: pageSize, search },
    skipLoader,
  });
  return response.data.data;
};

const getLocation = async (id) => {
  const response = await api.get(`/locations/${id}/edit`);
  return response.data;
};

const save = async (data) => {
  const response = await api.post("/locations", data);
  return response.data;
};

const update = async (id, data) => {
  const response = await api.put(`/locations/${id}`, data);
  return response.data;
};

export { getLocations, save, getLocation, update };