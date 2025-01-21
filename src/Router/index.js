import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/Pages/HomePage.vue";
import RegisterPage from "@/Auth/RegisterPage.vue";
import PostPage from "@/Pages/PostPage.vue";
import UserProfile from "@/Pages/Users/UserProfile.vue";

import LoginPage from "@/Auth/LoginPage.vue";
import UserDashboard from "@/Pages/Users/UserDashboard.vue";
import UserPost from '@/Pages/Users/UserPost.vue';
import Cookies from "js-cookie";
const routes = [
  { path: "/", component: HomePage, name: "Home"},
  { path: "/signup", component: RegisterPage },
  { path: "/login", component: LoginPage, name: "Login" },
  { path: "/post", component: PostPage,meta:{ requiresAuth: true, role: 'user'}},
  { path: "/users", component: UserProfile,meta: { requiresAuth: true, role: "user" } },
  {
    path: "/user-dashboard", component: UserDashboard, meta: { requiresAuth: true, role: "user" },
  },
  { path: "/user-post", component: UserPost,meta: { requiresAuth: true, role: "user" } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {

  const token = Cookies.get("token");

  const userRole = Cookies.get("role");
  
  if (token && (to.path === '/login' || to.path === '/signup')) {
    next({ path: '/user-dashboard' });
    return;
  }
  if (token && to.path === '/') {
    next({ path: '/user-dashboard' });
    return;
  }
  if (to.meta.requiresAuth) {
    if (!token) {
      next({ name: "Login" });
    } else if (to.meta.role && to.meta.role !== userRole) {
      next({ name: "Home" });
    } else {
      next();
    }
  }
   else {
    next();
  }
});
export default router;
