import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

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
export const followUser = (id: any, data: any) => API.put(`/user/follow/${id}`, { userId: data });
export const unFollowUser = (id: any, data: any) =>
  API.put(`/user/un-follow/${id}`, { userId: data });
