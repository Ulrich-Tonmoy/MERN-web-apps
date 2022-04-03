import axios from "axios";

const BASE_URL = "http://localhost:8000/api";
const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTIxODMxNTAyMDEyMjM3Zjg0MDQyNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODU1Mzg1NiwiZXhwIjoxNjM5MTU4NjU2fQ.n5mfgX1L6X5NR3F-WmaXuzbKw472x-B128BczBD_FEc";

const publicRequest = axios.create({
    baseURL: BASE_URL,
});
const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
});

export { publicRequest, userRequest };
