import axios from "axios";

const axiosDefault = axios.create({
  // baseURL: process.env.API_URL,
  baseURL: "http://localhost:5000",
  timeout: 3000,
});

export default axiosDefault;
