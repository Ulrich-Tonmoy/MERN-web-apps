import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/api/v1" });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile !== null) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }
  return req;
});

export const getUser = (userId: any) => API.get(`/user/${userId}`);
export const updateUser = (id: any, formData: any) => API.put(`/user/${id}`, formData);
export const getAllUser = () => API.get("/user");
export const followUser = (id: any, data: any) => API.put(`/user/follow/${id}`, data);
export const unFollowUser = (id: any, data: any) => API.put(`/user/un-follow/${id}`, data);
