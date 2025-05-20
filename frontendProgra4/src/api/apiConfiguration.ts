import axios from "axios";

const apiAxios = axios.create({
    baseURL: 'https://localhost:7294/api/', // Cambiar por la URL de la API
    timeout: 1000,
    headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrYUBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDQU5ESURBVEUiLCJqdGkiOiI4NGFmNWQ1My05NzBkLTQ1NGQtODQ5YS0yZjllNTE1ZTI2MTciLCJleHAiOjE3NDc3Nzg1NTcsImlzcyI6InlvdXJkb21haW4uY29tIiwiYXVkIjoieW91cmRvbWFpbi5jb20ifQ.Xx9bbNmZz4ZiDSamuC0lTZihb1VDRfNw3zYOyKq-2o0'}//Cambiar por el token de la API
  });

export default apiAxios;