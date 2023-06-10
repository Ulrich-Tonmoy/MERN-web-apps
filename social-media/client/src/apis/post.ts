import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/api/v1" });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile !== null) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }
  return req;
});

export const post = (data: any) => API.post("/post", data);
