import { createRouter, createWebHistory } from "vue-router";

import HomePage from '@/Pages/HomePage.vue';
import RegisterPage from '@/Auth/RegisterPage.vue';
import PostPage     from '@/Pages/PostPage.vue';
const routes = [
    {
        path: '/', 
        component: HomePage,
    },
    {path: '/signup', component: RegisterPage},
    {path: '/post', component: PostPage},

];
const router = createRouter({
    history:createWebHistory(),
    routes,
});
export default router;

