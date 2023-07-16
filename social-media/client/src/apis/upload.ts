import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile !== null) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }
  return req;
});

export const uploadFile = (data: any) => API.post("/upload", data);
