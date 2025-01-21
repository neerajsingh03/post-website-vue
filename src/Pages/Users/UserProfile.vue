<template>
<div class="container mt-5">
    <main class="col-md-9 col-lg-10 ms-sm-auto p-4">
        <div class="container mt-2">
            <div v-if="loading" class="text-center ">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <!-- <h1 class="mb-4">All Users</h1> -->
            <!-- this code is all users show -->
            <!-- <div v-if="!loading && users.length > 0">
            <table class="table table-bordered table-striped table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users" :key="user.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" @click="editUser(user.id)">
                                Edit
                            </button>
                            <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)" :disabled="loading">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else>
            <p>No users found.</p>
        </div> -->
            <h1 v-if="!loading && Object.keys(users).length > 0" class="mt-2 mb-3">Hello {{users ? users.name : User}}</h1>
            <div v-if="!loading && Object.keys(users).length > 0">
                <table class="table table-bordered table-striped table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ users.id }}</td>
                            <td>{{ users.name }}</td>
                            <td>{{ users.email }}</td>
                            <td>
                                <!-- <button class="btn btn-warning btn-sm" @click="editUser(users.id)">
                                    Edit
                                </button> -->
                                <button class="btn btn-warning btn-sm" @click="editUser(users.id, users.name, users.email)">Edit</button>
                                <!-- <button class="btn btn-danger btn-sm" @click="deleteUser(users.id)" :disabled="loading">
                                    Delete
                                </button> -->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="Object.keys(users).length < 0">
                <p>No users found.</p>
            </div>
            <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editUserModalLabel">Edit User</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="updateUser">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Name</label>
                                    <input type="text" id="name" class="form-control" v-model="formData.name" />
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" id="email" class="form-control" v-model="formData.email" />
                                </div>
                                <button type="submit" class="btn btn-primary">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
</template>

<script>
import apiClient from '@/Services/index.js';
import store from '@/Store/index.js';
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS
import {
    Modal
} from "bootstrap";
export default {
    name: "HomePage",
    data() {
        return {
            // users: [],
            users: {},
            loading: true,
            formData: {
                id: '',
                name: '',
                email: '',
            },
        };
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                this.loading = true;
                // const response = await apiClient.get("/users");
                // this.users = response.data.users;
                const userId = store.getters.getUserId;
                const response = await apiClient.get(`/users/${userId}`);
                this.users = response.data.users;
                this.loading = false;
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                this.loading = false;
            }
        },
        editUser(id, name, email) {

            this.formData.id = id;
            this.formData.name = name;
            this.formData.email = email;

            const modal = new Modal(document.getElementById("editUserModal"));
            modal.show();
        },

        async updateUser() {
            if (!this.formData.name || !this.formData.email) {
                this.validate = "All fields are required";
                alert('All fields are required');
                window.scrollTo(0, 0);
                return;
            }
            try {
                const response = await apiClient.post('/update/', this.formData);
                if (response.data.success) {
                    this.formData = {
                        id: "",
                        name: "",
                        email: "",
                    };
                    const modal = Modal.getInstance(document.getElementById("editUserModal"));
                    modal.hide();
                    await this.fetchUsers();
                }
            } catch (error) {
                console.error('something wrong', error);
            }
        },
        async deleteUser(userId) {
            if (!confirm("Are you sure you want to delete this user?")) {
                return;
            }
            this.loading = true;
            try {
                const response = await apiClient.get(`/delete/${userId}`);

                if (response.data.success) {
                    console.log("User deleted successfully");
                    await this.fetchUsers();
                } else {
                    console.error("Failed to delete user:", response.data.message);
                }
            } catch (error) {
                console.error("Error deleting user:", error);
            } finally {
                this.loading = false;
            }
        },
    },
};

</script>

<style scoped>
.ms-sm-auto[data-v-52ec4023][data-v-52ec4023][data-v-52ec4023] {
    margin-left: auto !important;
    margin-top: 118px !important;
    margin-bottom: -70px;
}

.container.mt-2 {
    margin-bottom: -161px;
}
</style>

