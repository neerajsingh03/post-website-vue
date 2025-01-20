<template>
<div class="row">
    <nav id="sidebar" class="col-md-3 col-lg-2 bg-dark text-white p-4">
        <ul class="nav flex-column mt-4">
            <li class="nav-item mb-2">
                <router-link to="/user-dashboard" class="nav-link text-white">
                    <i class="bi bi-house-door"></i> Dashboard
                </router-link>
            </li>
            <li class="nav-item mb-2">
                <router-link to="/post" class="nav-link text-white">
                    <i class="bi bi-house-door"></i> Post
                </router-link>
            </li>
             <li class="nav-item mb-2">
                <router-link to="/users" class="nav-link text-white">
                    <i class="bi bi-person-circle"></i> Profile
                </router-link>
            </li>
            <!-- <li class="nav-item mb-2">
                <router-link to="/settings" class="nav-link text-white">
                    <i class="bi bi-gear"></i> Settings
                </router-link>
            </li> -->
            <li class="nav-item mb-2">
                <router-link to="/user-post" class="nav-link text-white">
                    <i class="bi bi-bell"></i> Your Post
                </router-link>
            </li>
            <li class="nav-item mb-2">
                <a href="javascript:void(0)" class="nav-link text-white" @click="logout">
                    <i class="bi bi-box-arrow-right"></i> Logout
                </a>
            </li>
        </ul>
    </nav>
</div>
</template>

<script>
import apiClient from '@/Services/index.js';
import store from '@/Store/index.js';
export default {
    name: 'HeaderAuth',
    methods: {
        async logout() {
            try {
                const response = await apiClient.post('logout');
                if (response.data.success) {
                    store.dispatch('logout');
                    this.$router.push('/');
                }
            } catch (error) {
                console.error('An error occurred during logout', error);
                this.$router.push('/login');
            }
        }
    },
}
</script>

<style scoped>
#sidebar {
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    transition: all 0.3s;
}

#sidebar .nav-link {
    font-size: 1.1rem;
}

#sidebar .nav-link:hover {
    background-color: #495057;
}

#sidebar .bi {
    margin-right: 8px;
}

@media (max-width: 767px) {
    #sidebar {
        width: 100%;
        height: auto;
        position: relative;
    }
}
</style>
