<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-9 col-lg-10 p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2>Welcome to User Dashboard</h2>
          <button class="btn btn-danger" @click="logout">Log Out</button>
        </div>

        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Dashboard Overview</h5>
            <p class="card-text">Here you can manage your profile, settings, and other features of the user dashboard.</p>
            <hr />
            <h6>Recent Activity</h6>
            <ul>
              <li>Updated profile information</li>
              <li>Posted a new update</li>
              <li>Changed your password</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../../Services/Axios.js';

export default {
  name: 'UserDashboard',
  methods: {
    async logout() {
      try {
        const response = await apiClient.post('logout');
        if (response.data.success) {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          this.$router.push('/');
        }
      } catch (error) {
        console.error('An error occurred during logout', error);
        this.$router.push('/login');
      }
    }
  }
}
</script>

<style scoped>
#sidebar {
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
</style>
