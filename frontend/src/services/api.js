import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // 🔑 send cookies automatically
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: global response error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token expired / unauthorized, we can handle later
    if (error.response?.status === 401) {
      // optional: redirect to login
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
