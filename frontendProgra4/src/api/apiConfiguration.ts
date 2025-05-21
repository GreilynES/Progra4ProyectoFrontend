import axios from "axios";

const apiAxios = axios.create({
  baseURL: "https://localhost:7294/api",
  timeout: 1000,
});

// ✅ Interceptor para agregar token automáticamente
apiAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiAxios;
