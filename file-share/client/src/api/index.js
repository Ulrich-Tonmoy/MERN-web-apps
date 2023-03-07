import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchFile = () => API.get(`/posts`);
export const uploadPost = (file) => API.post("/upload", file);
