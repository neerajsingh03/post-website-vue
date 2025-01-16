import { createRouter, createWebHistory } from "vue-router";

import HomePage from '@/Pages/HomePage.vue';
import RegisterPage from '@/Auth/RegisterPage.vue';
import PostPage     from '@/Pages/PostPage.vue';
import AllUsers     from '@/Pages/Users/AllUsers.vue';
import UpdateUser  from  '@/Pages/Users/UpdateUser.vue';
const routes = [
    { path: '/', component: HomePage},
    {path: '/signup', component: RegisterPage},
    {path: '/post', component: PostPage},
    {path: '/users', component: AllUsers},
    {path: '/update:userId?', component: UpdateUser , name: 'update'},

];
const router = createRouter({
    history:createWebHistory(),
    routes,
});
export default router;

