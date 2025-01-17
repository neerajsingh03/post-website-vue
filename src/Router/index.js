import { createRouter, createWebHistory } from "vue-router";

import HomePage from '@/Pages/HomePage.vue';
import RegisterPage from '@/Auth/RegisterPage.vue';
import PostPage     from '@/Pages/PostPage.vue';
import AllUsers     from '@/Pages/Users/AllUsers.vue';
import UpdateUser   from  '@/Pages/Users/UpdateUser.vue';
import LoginPage    from   '@/Auth/LoginPage.vue';
import UserDashboard from  '@/Pages/Users/UserDashboard.vue';
const routes = [
    {path: '/', component: HomePage, name:'Home'},
    {path: '/signup', component: RegisterPage},
    {path: '/login', component:LoginPage,name:'Login'},
    {path: '/post', component: PostPage},
    {path: '/users', component: AllUsers},
    {path: '/update:userId?', component: UpdateUser , name: 'update'},
    {path: '/user-dashboard', component:UserDashboard,name: 'Userdashboard',meta:{requiresAuth:true,role:'user'}},

];

const router = createRouter({
    history:createWebHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (to.meta.requiresAuth) {
        if (!token) {
            next({ name: 'Login' });
        } else if (to.meta.role && to.meta.role !== userRole) {
            next({ name: 'Home' });
        } else {
            next();
        }
    } else {
        next();
    }
});
export default router;

