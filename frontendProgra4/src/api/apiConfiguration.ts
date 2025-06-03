import axios from "axios";

const apiAxios = axios.create({
  baseURL: "https://localhost:7294/api",
  timeout: 1000,
});

apiAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiAxios;
