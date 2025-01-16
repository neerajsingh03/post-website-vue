<template>
  <div
    class="container min-vh-20 d-flex justify-content-center align-items-center"
  >
    <div class="row w-100">
      <div class="col-md-6 mx-auto">
        <h2 class="text-center mt-3">
          {{ !user ? "Sign Up" : "Update Record" }}
        </h2>
        <div v-if="successResponse" class="text-success">
          <h3>{{ successResponse }}</h3>
        </div>
        <form @submit="save">
          <div v-if="validate" class="text-danger">
            {{ validate }}
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">Full Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              v-model="name"
              placeholder="Enter your full name"
            />
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              v-model="email"
              placeholder="Enter your email"
            />
          </div>

          <div v-if="!user" class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              v-model="password"
              placeholder="Enter your password"
            />
          </div>
          <div v-if="!user" class="mb-3">
            <label for="password" class="form-label">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              id="confirmpassword"
              name="confrim-password"
              v-model="confirmPassword"
              placeholder="Enter your confrim password"
              ref="confPass"
            />
          </div>
          <div v-if="passNotMatch" class="text-danger">
            {{ passNotMatch }}
          </div>
          <div class="text-center mt-2">
            <button type="submit" class="btn btn-primary">
              {{ !user ? "Sign UP" : "Update Record" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegitserPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      validate: "",
      passNotMatch: "",
      successResponse: "",
      user: "",
    };
  },
  methods: {
    async save(e) {
      e.preventDefault();
      if (
        !this.name ||
        !this.email ||
        !this.password ||
        !this.confirmPassword
      ) {
        this.validate = "All fields are required";
        window.scrollTo(0, 0);
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.passNotMatch = "Password and confirm password don't match";
        return;
      }
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("confirmPassword", this.confirmPassword);
      
      axios.post("http://127.0.0.1:8000/api/store", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.successResponse = response.data.success;
          if (response.data.success) {
            this.name = "";
            this.email = "";
            this.password = "";
            this.confirmPassword = "";
            this.$router.push({ path: "/users" });
          }
        })
        .catch((error) => {
          console.error("something wrong", error);
        });
    },
  },
};
</script>
