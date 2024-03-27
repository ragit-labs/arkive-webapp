import axios from "axios";
import Cookies from "js-cookie";

export const initializeAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = Cookies.get("accessToken");
      console.log("Itercept", token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.log("Error.... interceptor");
      return Promise.reject(error);
    },
  );
};
