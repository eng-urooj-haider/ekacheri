import axios from "axios";

const api = axios.create({
  baseURL: "http://kachehri.suigas.pk:808", // your Laravel app URL
  withCredentials: true, // sends/receives cookies — required for Sanctum
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
  }, // axios reads XSRF-TOKEN cookie, sends as header automatically
});

export default api;
