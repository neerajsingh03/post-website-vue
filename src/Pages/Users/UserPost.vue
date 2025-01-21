<template>
<div class="container-fluid">
    <main>
        <div v-if="loading" class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div class="row" v-else-if="posts.length > 0">
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
        <div class="empty-p" v-else>
            Post not found
        </div>
    </main>

</div>
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
                if (response.data && response.data.posts) {
                    this.posts = response.data.posts;
                    this.loading = false;
                } else {
                    console.log('No posts found in response:', response.data);
                    this.loading = true;
                }
            } catch (error) {
                console.error('Error fetching posts:', error.response);
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
/* .ms-sm-auto {
    margin-left: auto !important;
    margin-top: 314px !important;
    class="col-md-9 col-lg-10 ms-sm-auto p-4 mt-4"
} */

/* .row {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(-1 * var(--bs-gutter-y));
    margin-right: calc(-.5 * var(--bs-gutter-x));
    margin-left: calc(-.5 * var(--bs-gutter-x));
    margin-top: -147px!important;
} */
.ms-sm-auto[data-v-86d6b3d4][data-v-86d6b3d4] {
    margin-left: auto !important;
    margin-top: 242px !important;
    margin-bottom: -217px;
}

/* .ms-sm-auto {
    margin-left: auto!important;
    margin-bottom: -514px;
} */
.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.card-title,
.card-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Empty State */
.text-muted {
    font-size: 1.2rem;
}

.container-fluid[data-v-86d6b3d4] {
    margin-left: 356px;
    width: 76%;
    margin-top: 78px;
    padding-bottom: 50px;
    margin-bottom: -519px;
}

.empty-p[data-v-86d6b3d4] {
    /* margin-top: 524px; */
    margin-bottom: 301px !important;
    text-align: center;
    padding-top: 145px;
    font-size: xxx-large;
    font-family: cursive;
}
.text-center {
    margin-top: 200px;
    margin-bottom: 330px;
}
</style>
