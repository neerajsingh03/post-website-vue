<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-color">
        <div class="container">
            <router-link class="navbar-brand" to="/">MyWebsite</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/signup" v-if="!$store.getters.getToken">SignUp</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login" v-if="!$store.getters.getToken">Login</router-link>
                    </li>
                     <li class="nav-item">
                        <a href="javascript:void(0)" class="nav-link" @click="logout" v-if="$store.getters.getToken">Logout</a>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link class="nav-link" to="/post">Posts</router-link>
                    </li> -->
                    <!-- <li class="nav-item">
                        <router-link class="nav-link" to="/users" v-if="$store.getters.getToken">All Users</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/user-dashboard" v-if="$store.getters.getToken">Dashboard</router-link>
                    </li> -->
                </ul>
            </div>
        </div>
    </nav>
</div>
</template>

<script>
import apiClient from '@/Services';
import store from '@/Store/index.js';
export default {
    name: "HeaderSection",
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
    }
};
</script>

<style>
.bg-color {
    --bs-bg-opacity: 1;
    background-color: rgb(155, 73, 73) !important;
}
</style>
