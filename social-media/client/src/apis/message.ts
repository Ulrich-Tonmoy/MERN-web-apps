import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const getMessages = (id: any) => API.get(`/message/${id}`);

export const addMessage = (data: any) => API.post("/message/", data);
