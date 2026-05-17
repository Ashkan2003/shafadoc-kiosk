import axios from "axios";

// ============================================================================
// AXIOS INSTANCE
// ============================================================================

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Local: "fa",
  },
});

// ============================================================================
// RESPONSE INTERCEPTOR - Logging
// ============================================================================

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
