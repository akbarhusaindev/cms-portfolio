import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
});

// Automatically add JWT token to headers if it exists (except for login/register)
API.interceptors.request.use((config) => {
  const isAuthRequest = config.url?.includes('/auth/');
  if (!isAuthRequest) {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Intercept 401 and 403 responses to clear invalid/expired token and prompt login
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes('/auth/login');
    if ((error.response?.status === 401 || error.response?.status === 403) && !isLoginRequest) {
      console.warn('Authentication expired or forbidden (401/403). Clearing token.');
      localStorage.removeItem('admin_token');
      if (window.location.pathname.startsWith('/dashboard')) {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default API;