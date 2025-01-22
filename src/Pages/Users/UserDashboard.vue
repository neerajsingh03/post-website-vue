<template>
<div class="container-fluid">
    <main class="col-md-9 col-lg-10 ms-sm-auto p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="d-flex align-items-center">
                <div v-if="loading" class="text-center ">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <!-- Profile Image -->
                <div v-if="image" :key="image.id">
                    <img :src="getImageUrl(image.image)" class="rounded-circle me-3" style="width: 60px; height: 60px; object-fit: cover; border: 2px solid #ddd;" />
                </div>
                <div>
                    <h2 class="mb-0" style="font-size: 1.5rem;">Welcome, {{ userName ? userName.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'guest' }}</h2>

                    <small class="text-muted" v-if="lastLogin">Last login: {{ lastLoginTime }}</small>
                </div>
            </div>
        </div>

        <!-- Dashboard Overview -->
        <div class="row">
            <div class="col-md-6">
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <h5 class="card-title">Profile Overview</h5>
                        <p class="card-text">Quickly manage your profile details and settings.</p>
                        <router-link to="/users" class="btn btn-primary">Manage Profile</router-link>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <h5 class="card-title">Recent Activity</h5>
                        <ul class="list-unstyled">
                            <li @click="handleUpdateProfile" class="up-pf"><i class="bi bi-check-circle text-success"></i> Updated profile</li>
                            <li><i class="bi bi-pencil-square text-primary"></i> Posted a new update</li>
                            <li @click="handleChangePassword" class="change-passord"><i class="bi bi-lock text-danger"></i> Changed password</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Additional Section -->
        <div class="row">
            <div class="col-md-12">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Notifications</h5>
                        <p class="card-text">You have no new notifications at the moment.</p>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Change Password Modal -->
    <div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="changePasswordModalLabel">Change Password</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitChangePassword">
                        <!-- Current Password -->
                        <div class="mb-3">
                            <label for="currentPassword" class="form-label">Current Password</label>
                            <input type="password" id="currentPassword" class="form-control" v-model="form.currentPassword" />
                        </div>

                        <!-- New Password -->
                        <div class="mb-3">
                            <label for="newPassword" class="form-label">New Password</label>
                            <input type="password" id="newPassword" class="form-control" v-model="form.newPassword" />
                        </div>

                        <!-- Confirm Password -->
                        <div class="mb-3">
                            <label for="confirmPassword" class="form-label">Confirm Password</label>
                            <input type="password" id="confirmPassword" class="form-control" v-model="form.confirmPassword" />
                        </div>

                        <button type="submit" class="btn btn-primary w-100">
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- end change password model -->

    <!-- Update Profile Model -->
    <div class="modal fade" id="updateProfileModal" tabindex="-1" aria-labelledby="updateProfileModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h5 class="modal-title" id="updateProfileModalLabel">Update Profile Picture</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <!-- Modal Body -->
                <div class="modal-body">
                    <form @submit.prevent="submitUpdateProfile">
                        <!-- Profile Picture Upload -->
                        <div class="mb-3 text-center">
                            <label for="profileImage" class="form-label">Upload Profile Picture</label>
                            <div class="d-flex justify-content-center mb-3">
                                <!-- Image Preview (Optional) -->
                                <!-- <img v-if="profileImagePreview" :src="profileImagePreview" alt="Profile Preview" class="img-thumbnail rounded-circle" style="width: 100px; height: 100px; object-fit: cover;"> -->
                            </div>
                            <input type="file" class="form-control" id="profileImage" @change="handleFileChange">
                        </div>

                        <!-- Submit Button -->
                        <!-- <button type="submit" class="btn btn-primary w-100">
                            Update Profile
                        </button> -->
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- End Update Profile Model -->
</div>
</template>

<script>
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS
import {
    Modal
} from "bootstrap";
import apiClient from '@/Services';
import store from '@/Store/index';
export default {
    name: "UserDashboard",
    data() {
        return {
            form: {
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            },
            profileImage: "",
            image: '',
            loading: true,
            userName: '',
            lastLogin: '',
        };
    },
    computed: {

        lastLoginTime() {
            return this.timeAgo(this.lastLogin);
        }
    },
    mounted() {
        const id = store.getters.getUserId;
        this.fetchUser(id);
    },
    methods: {
        handleChangePassword() {
            // Show the modal
            const modal = new Modal(document.getElementById("changePasswordModal"));
            modal.show();
        },
        async submitChangePassword() {

            if (!this.form.currentPassword || !this.form.newPassword || !this.form.confirmPassword) {
                alert("All fields are required");
            }

            if (this.form.newPassword !== this.form.confirmPassword) {
                alert("New Password and Confirm Password do not match!");
                return;
            }
            try {
                const response = await apiClient.post('/change-password', this.form);
                console.log(response.data);
                if (response.data && response.data.success) {
                    alert(response.data.success);
                }
            } catch (error) {
                if (error.response) {
                    console.log('Error Response:', error.response.data);
                    if (error.response.status === 400) {
                        alert(error.response.data.error);
                    }
                } else if (error.request) {
                    console.log('Error Request:', error.request);
                } else {
                    console.log('Error', error.message);
                }
            }
            // Close the modal
            const modal = Modal.getInstance(
                document.getElementById("changePasswordModal")
            );
            modal.hide();
            this.form.currentPassword = "";
            this.form.newPassword = "";
            this.form.confirmPassword = "";
        },
        handleUpdateProfile() {
            const modal = new Modal(document.getElementById("updateProfileModal"));
            modal.show();

        },
        async handleFileChange(e) {
            const id = store.getters.getUserId;
            const file = e.target.files[0];
            if (file) {
                this.profileImage = file;
            }
            if (this.profileImage) {
                const formData = new FormData();
                formData.append('image', this.profileImage);
                formData.append('id', id);
                try {
                    const response = await apiClient.post('/update', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    if (response.data && response.data.success) {
                        await this.fetchUser(id);
                        console.log('Profile updated successfully:', response.data);
                        this.loading = false;
                        const modal = Modal.getInstance(document.getElementById("updateProfileModal"));
                        modal.hide();
                      
                    }

                } catch (error) {
                    console.error('Error updating profile:', error);
                }
            }
        },
        timeAgo(lastLogin) {
            if (!lastLogin) return "Never logged in";
            const currentTime = new Date();
            const lastLoginTime = new Date(`${lastLogin} UTC`);
            const timeDifference = currentTime - lastLoginTime;
            const seconds = Math.floor(timeDifference / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);

            if (hours > 0) {
                return `${hours} hour${hours === 1 ? '' : 's'} ago`;
            } else if (minutes > 0) {
                return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
            } else {
                return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
            }
        },
        async fetchUser(id) {
            const userProfile = await apiClient.get(`/users/${id}`);
            if (userProfile.data && userProfile.data.users) {
                this.image = userProfile.data.users;
                this.userName = userProfile.data.users;
                this.lastLogin = userProfile.data.users.last_login;
                this.loading = false;
            }
        },
        getImageUrl(imagePath) {
            return `http://127.0.0.1:8000/${imagePath}`;
        },
    },
};
</script>

<style scoped>
#sidebar {
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
}

.modal-content {
    margin-top: 96px !important;
}

li.change-passord {
    cursor: pointer;
}

main.col-md-9.col-lg-10.ms-sm-auto.p-4 {
    margin-bottom: -242px;
}

img.rounded-circle {
    transition: transform 0.3s ease-in-out;
}

img.rounded-circle:hover {
    transform: scale(1.1);
}

li.up-pf {
    cursor: pointer;
}
.modal-content[data-v-c5acb9e4][data-v-c5acb9e4] {
    margin-top: 90px !important;
    margin-bottom: 446px;
}
</style>
