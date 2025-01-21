<template>
<div class="container mt-5">
    <h1 class="text-center mb-4">Welcome to PostHub</h1>
    <div v-if="loading" class="text-center my-3">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div class="row">

        <div class="col-md-4 mb-4" v-for="post in posts" :key="post.id">
            <div class="card">
                <img :src="getImageUrl(post.image)" class="card-img-top" alt="Post Image" style="width:100%; height:200px; object-fit:cover">
                <div class="card-body">
                    <h5 class="card-title">{{ post.post }}</h5>
                    <p class="card-text">{{ post.description }}</p>
                    <a href="#" class="btn btn-primary">Read More</a>
                </div>
            </div>
        </div>
        <!-- <div class="col-md-4 mb-4">
            <div class="card">
                <img src="@/assets/logo.png" class="card-img-top" alt="Post 3 Image" style="width:50px">
                <div class="card-body">
                    <h5 class="card-title">Post Title 2</h5>
                    <p class="card-text">This is another short description of a different post. Learn more about this interesting topic.</p>
                    <a href="#" class="btn btn-primary">Read More</a>
                </div>
            </div>
        </div> -->
        <div class="text-center mt-4">
            <button class="btn btn-secondary mx-2" :disabled="pagination.current_page === 1" @click="fetchPosts(pagination.current_page - 1)">
                Previous
            </button>
            <button class="btn btn-secondary mx-2" :disabled="pagination.current_page === pagination.last_page" @click="fetchPosts(pagination.current_page + 1)">
                Next
            </button>
            <p>Page {{ pagination.current_page }} of {{ pagination.last_page }}</p>

        </div>
    </div>

    <div class="text-center mt-5">
        <h3>Ready to Share Your Posts?</h3>
        <p>Join our community of writers and start posting today!</p>
        <router-link to="/signup" class="btn btn-success btn-lg">Sign Up</router-link>
    </div>
</div>
</template>

<script>
import apiClient from '@/Services/index.js';
export default {
    name: 'HomePage',
    data() {
        return {
            posts: [],
            loading: true,
            pagination: {
                current_page: 1,
                last_page: 1,
            },
        };
    },
    mounted() {
        this.fetchPosts();
    },
    methods: {
        async fetchPosts(page = 1) {
            const response = await apiClient.get(`/posts?page=${page}`);
            try {
                // if (response.data) {
                //     this.posts = response.data.posts;
                // }
                if (response.data) {
                    this.posts = response.data.posts.data; // Posts data
                    this.pagination = {
                        current_page: response.data.posts.current_page,
                        last_page: response.data.posts.last_page,
                    };
                }
            } catch (error) {
                console.log('posts not fetch', error);
            } finally {
                this.loading = false;
            }
        },

        getImageUrl(imagePath) {
            return `http://127.0.0.1:8000/${imagePath}`;
        },
    }
};
</script>
