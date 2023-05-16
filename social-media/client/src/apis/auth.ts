import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/api/v1" });

export const logIn = (formData: any) => API.post("/auth/login", formData);
export const logout = () => API.get("/auth/logout");
export const signUp = (formData: any) => API.post("/auth/register", formData);
