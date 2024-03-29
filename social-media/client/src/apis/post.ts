import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile !== null) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }
  return req;
});

export const post = (data: any) => API.post("/posts", data);
export const getTimelinePosts = (id: any) => API.get(`/posts/timeline/${id}`);
export const likePost = (id: any, userId: any) => API.put(`posts/like/${id}`, { userId: userId });
