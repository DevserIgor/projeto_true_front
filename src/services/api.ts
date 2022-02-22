import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  // baseURL: "http://localhost:3333/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
