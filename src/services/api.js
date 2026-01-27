import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "https://lms-backend-qp3q.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// API function
export const loginUser = (data) => {
  return api.post("/api/auth/login", data);
};

export const studentSignup = (data) => {
  return api.post("/api/auth/student-signup", data);
};

export const staffSignup = (data) => {
  return api.post("/api/auth/staff-signup", data);
};

export const getAllBooks = () => {
  return api.get("/api/book");
};

// Search books
export const searchBooks = (query) => {
  return api.get(`/api/book/search?query=${query}`);
};




export default api;


