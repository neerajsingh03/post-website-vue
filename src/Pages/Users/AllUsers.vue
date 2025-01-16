<template>
  <div class="container mt-4">
    <div v-if="loading" class="text-center my-3">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <h1 class="mb-4">All Users</h1>

    <div v-if="!loading && users.length > 0">
      <!-- Bootstrap Table -->
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
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      users: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
        this.loading = true;
        await axios.get("http://127.0.0.1:8000/api/users")
        .then((response) => {
            this.users = response.data.users;
        })
       .catch((error) => {
          console.error("Error fetching users:", error);
       })
       .finally(() => {
        this.loading = false;
       });
    },
    async editUser(userId) {
      this.$router.push({ name: "update", params: { userId } });
    },

    async deleteUser(userId) {
        if (!confirm("Are you sure you want to delete this user?")) {
            return;
        }
      this.loading = true;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/delete/${userId}`
        );
        if (response.data.success) {
          console.log("User deleted successfully");
          await this.fetchUsers();
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }  finally {
      this.loading = false; // End loader
    }
    },
  },
};
</script>

