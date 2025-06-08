import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 1000,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return error?.response?.data;
  }
);

instance.interceptors.response.use(
  (response) => {
    return {
      status: response.status,
      ...response?.data,
    };
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await instance.post("/auth/refresh-token");
        return instance(originalRequest);
      } catch (refreshError) {
        console.log(refreshError);
        // Refresh token cũng hết hạn → logout
        await instance.post("/auth/logout");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
