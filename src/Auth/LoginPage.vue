<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card shadow-lg" style="width: 100%; max-width: 400px;">
      <div class="card-body">
        <h2 class="text-center mb-2">Login</h2>
        
        <!-- Login Form -->
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input 
              v-model="email" 
              type="email" 
              id="email" 
              class="form-control" 
              placeholder="Enter your email" 
              required 
            />
          </div>
          
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input 
              v-model="password" 
              type="password" 
              id="password" 
              class="form-control" 
              placeholder="Enter your password" 
              required 
            />
          </div>

          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <a href="#" class="text-decoration-none">Forgot Password?</a>
            </div>
            <div>
              <a href="#" class="text-decoration-none">Create Account</a>
            </div>
          </div>

          <div class="d-grid">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../Services/Axios.js';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
        if(!this.email || !this.password){
            alert('All fields are required');
            return;
        }
      try {
        const response = await apiClient.post('/login', {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        if (response.data.role === 'admin') {
          this.$router.push('/admin');
        } else {
         this.$router.push('/user-dashboard');
        }
      } catch (error) {
        console.error(error);
        alert('Login failed.');
      }
    },
  },
};
</script>