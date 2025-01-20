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
                <a href="#" class="btn btn-primary">Manage Profile</a>
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
                  <li><i class="bi bi-lock text-danger"></i> Changed password</li>
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
</div>
</template>

<script>

export default {
  name: 'UserDashboard',
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
