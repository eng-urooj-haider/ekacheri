import { useEffect } from "react";
import api from "./axios.js";
import { useLoading } from "../context/LoadingContext.jsx";

const AxiosInterceptor = ({ children }) => {
  const { setLoading } = useLoading();

  useEffect(() => {
    let requests = 0;

    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (!config.skipLoader) {          // NEW: check the flag
          requests++;
          setLoading(true);
        }
        return config;
      },
      (error) => {
        if (!error.config?.skipLoader) {   // NEW
          requests--;
          if (requests <= 0) setLoading(false);
        }
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        if (!response.config.skipLoader) { // NEW
          requests--;
          if (requests <= 0) setLoading(false);
        }
        return response;
      },
      (error) => {
        if (!error.config?.skipLoader) {   // NEW
          requests--;
          if (requests <= 0) setLoading(false);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [setLoading]);

  return children;
};

export default AxiosInterceptor;