import axios from "axios";

const BASE_URL = "http://localhost:8000/api";
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token;

const publicRequest = axios.create({
    baseURL: BASE_URL,
});
const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
});

export { publicRequest, userRequest };
