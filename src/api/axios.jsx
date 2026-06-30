import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // your Laravel app URL
  withCredentials: true, // sends/receives cookies — required for Sanctum
  withXSRFToken: true,   // axios reads XSRF-TOKEN cookie, sends as header automatically
});

export default api;