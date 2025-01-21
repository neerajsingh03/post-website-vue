<template>
<div class="container-fluid">
    <main class="col-md-9 col-lg-10 ms-sm-auto p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Welcome, User</h2>
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
                            <li><i class="bi bi-check-circle text-success"></i> Updated profile</li>
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
</div>
</template>

<script>
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS
import {
    Modal
} from "bootstrap";
import apiClient from '@/Services';
// import apiClient from '@/Services';

export default {
    name: "UserDashboard",
    data() {
        return {
            form: {
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            },
        };
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
                if(response.data && response.data.success)
                {
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
</style>
