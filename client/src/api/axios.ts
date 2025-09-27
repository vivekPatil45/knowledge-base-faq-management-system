import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // backend URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token if exists
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // save JWT in localStorage
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
