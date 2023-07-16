import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const logIn = (formData: any) => API.post("/auth/login", formData);
export const logout = () => API.get("/auth/logout");
export const signUp = (formData: any) => API.post("/auth/register", formData);
