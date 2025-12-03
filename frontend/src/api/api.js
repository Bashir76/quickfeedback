// src/api.js
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api/"; // change if your backend URL differs

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // allow session-based auth (cookies)
});

// attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

export default api;
