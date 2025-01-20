import axios from 'axios';
import store from '@/Store/index.js';
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
    const token = store.getters.getToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default apiClient;

