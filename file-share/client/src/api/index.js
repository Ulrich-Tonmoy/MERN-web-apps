import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
const FileAPI = axios.create({ baseURL: "http://localhost:5000", responseType: "blob" });

export const fetchFile = (id) => API.get(`/file/${id}`);
export const fetchFileWithPassword = (id, data) => FileAPI.post(`/file/${id}`, { ...data });
export const uploadPost = (file) => API.post("/file/upload", file);
