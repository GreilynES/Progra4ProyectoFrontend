import axios from "axios";

const apiAxios = axios.create({
    baseURL: 'https://localhost:7101/api', // Cambiar por la URL de la API
    timeout: 1000,
    headers: {'Authorization': 'Bearer token'}//Cambiar por el token de la API
  });

export default apiAxios;