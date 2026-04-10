import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// ✅ FIXED INTERCEPTOR
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Login API
export const loginUser = (data) => API.post("/auth/login", data);

// Register API
export const registerUser = (data) => API.post("/auth/register", data);

// Dashboard APIs
export const getSummary = () => API.get("/dashboard/summary");

export const getRecent = () => API.get("/dashboard/recent");

export const getMonthly = (year) => API.get(`/dashboard/monthly?year=${year}`);

export const getSummaryByDate = (start, end) =>
  API.get(`/dashboard/summary/date?start=${start}&end=${end}`);

export const getCategory = (start, end) =>
  API.get(`/dashboard/category?start=${start}&end=${end}`);

//for the product adding
//Create

export const createExpense = (data) => API.post("/expanses", data);

//GetALl
export const getExpenses = () => API.get("/expanses");

//GET by ID
export const getExpenseById = (id) => API.get(`/expanses/${id}`);

//Update
export const updateExpenses = (id, data) => API.post(`/expanses/${id}`, data);

//delete

export const deleteExpense = (id) => API.delete(`/expanses/${id}`);

export default API;
