import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const createChat = (data: any) => API.post("/chat/", data);

export const userChats = (id: any) => API.get(`/chat/${id}`);

export const findChat = (firstId: any, secondId: any) =>
  API.get(`/chat/find/${firstId}/${secondId}`);
