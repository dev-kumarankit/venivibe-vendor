import axios from "axios";
import { BASE_URL } from "./Constant"; // Assuming BASE_URL is defined elsewhere

// Create an instance of Axios with a base URL
const axiosAPI = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to attach authorization token to outgoing requests
axiosAPI.interceptors.request.use(
  (config: any) => {
    const userdata = localStorage.getItem("auth_token") || "";

    if (userdata) {
      config.headers["Authorization"] = `Bearer ${userdata}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration errors
axiosAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: any) => {
    // If the error message indicates token expiration, clear local storage and reload the page
    const userdata = localStorage.getItem("auth_token") || "";
    // if (
    //   error?.response?.status == 401 ||
    //   userdata ||
    //   error?.response?.data?.message == "UNAUTHORIZED" ||
    //   userdata
    // ) {
    //   localStorage?.clear();
    //   window.location.reload();
    // }
    if (
      error?.response?.status == 500 ||
      error?.response?.status == 408 ||
      error?.response?.status == 404
    ) {
      return error?.response;
    }
    return Promise.reject(error);
  }
);

export default axiosAPI;
