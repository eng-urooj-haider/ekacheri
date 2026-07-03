import { useEffect } from "react";
import api from "./axios";
import { useLoading } from "../context/LoadingContext";

const AxiosInterceptor = ({ children }) => {
  const { setLoading } = useLoading();

  useEffect(() => {
    let requests = 0;

    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        requests++;
        setLoading(true);
        return config;
      },
      (error) => {
        requests--;
        if (requests <= 0) setLoading(false);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        requests--;
        if (requests <= 0) setLoading(false);
        return response;
      },
      (error) => {
        requests--;
        if (requests <= 0) setLoading(false);
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