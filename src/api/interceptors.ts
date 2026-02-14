// src/api/interceptors.ts
import axios, { CreateAxiosDefaults } from "axios";

export const API_ADDRESS = "https://alimmah05.pythonanywhere.com/api";

const options: CreateAxiosDefaults = {
  baseURL: API_ADDRESS,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
};

const PUBLIC_API = axios.create(options);

const PRIVATE_API = axios.create(options);

// Интерцептор запросов — добавляем токен из localStorage
// src/api/interceptors.ts
PRIVATE_API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token"); // маленькая t
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { PUBLIC_API, PRIVATE_API };
