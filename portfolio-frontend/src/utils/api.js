import axios from 'axios';

// Ensure baseURL always ends with /api even if VITE_API_BASE_URL is set without it
const getBaseUrl = () => {
  let url = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
  url = url.trim().replace(/\/+$/, '');
  if (!url.endsWith('/api')) {
    url = `${url}/api`;
  }
  return url;
};

const API = axios.create({
  baseURL: getBaseUrl(),
});

export default API;