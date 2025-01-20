<template>
<main class="col-md-9 col-lg-10 ms-sm-auto p-4 mt-4">
    <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" style="width: 6rem; height: 20rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div class="row" v-if="posts.length > 0">
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
    </div> 
    <div v-if="posts.length < 0">
        Not post found
    </div>
</main>
</template>

<script>
import apiClient from '@/Services';
import store from '@/Store';
export default {
    name: 'UserPost',
    data() {
        return {
            posts: [],
            loading: true,
        };
    },
    mounted() {
        this.fetchPosts();
    },
    methods: {
        async fetchPosts() {
            const userId = store.getters.getUserId;
            console.log(userId);
            const response = await apiClient.get(`/user-post/${userId}`);
            try {
                if (response.data) {
                    this.posts = response.data.posts;
                    this.loading = false;
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
}
</script>
<style scoped>
.loading-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999; /* Ensure the spinner is on top of other content */
}
</style>
