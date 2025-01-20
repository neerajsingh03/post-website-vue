import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './Router/index.js';
import apiClient from './Services/index.js';
import store from '@/Store/index.js'
apiClient.interceptors.request.use((config) => {
    const token = store.getters.getToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
