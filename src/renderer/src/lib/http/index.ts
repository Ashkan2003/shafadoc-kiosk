import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Local: "fa",
  },
});

http.interceptors.response.use(
  (res) => {
    console.log(`🔐 Response: ${res.status} ${res.config.url}`);
    return res;
  },
  (err) => {
    console.log(`🔐 Error: ${err.response?.status} ${err.config?.url}`);
    return Promise.reject(err);
  },
);

export { http };
