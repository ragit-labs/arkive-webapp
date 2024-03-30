import axios from "axios";
import Cookies from "js-cookie";

export const initializeAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = Cookies.get("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};
