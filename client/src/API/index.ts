import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_BASE_URL || "http://localhost:5000",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const config = err.config;

    // Access Token was expired
    if (err.response.data.isRefreshNeeded) {
      try {
        console.log("Token needs refreshing");
        await axiosInstance.post("/api/v1/auth/refresh");
        console.log("Token refreshed");
        return axiosInstance(config);
      } catch (_err: any) {
        console.log("Token refresh failed");
        if (err.response.data.log) {
          console.log(err.response.data.log);
        }
        _err.isLogoutNeeded = true;
        return Promise.reject(_err);
      }
    }

    if (err.response.data.log) {
      console.log(err.response.data.log);
    }

    return Promise.reject(err);
  },
);

export default axiosInstance;
