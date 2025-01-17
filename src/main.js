import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './Router/index.js';
import apiClient from './Services/Axios';
import axios from 'axios';
axios.defaults.baseURL =apiClient;
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});



createApp(App)
.use(router)
.mount('#app');
