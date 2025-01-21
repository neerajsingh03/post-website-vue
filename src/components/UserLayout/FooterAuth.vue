<template>
  <footer class="bg-dark text-white py-4">
    <div class="container">
      <div class="row">
        <!-- About Section -->
        <div class="col-md-4">
          <h5>About Us</h5>
          <p>
            MyWebsite is a platform dedicated to providing valuable resources
            and content for our users. Stay connected for more updates!
          </p>
        </div>

        <!-- Quick Links -->
        <div class="col-md-4">
          <h5>Quick Links</h5>
          <ul class="list-unstyled">
            <li><router-link to="/" class="text-white text-decoration-none">Home</router-link></li>
            <li><router-link to="/signup" class="text-white text-decoration-none" v-if="!$store.getters.getToken">SignUp</router-link></li>
            <li><router-link to="/login" class="text-white text-decoration-none" v-if="!$store.getters.getToken">Login</router-link></li>
            <li><a href="javascript:void(0)" class="text-white text-decoration-none" @click="logout" v-if="$store.getters.getToken">Logout</a></li>
          </ul>
        </div>

        <!-- Contact Section -->
        <div class="col-md-4">
          <h5>Contact Us</h5>
          <p>
            <i class="bi bi-geo-alt"></i> 123 Street, City, Country
          </p>
          <p>
            <i class="bi bi-telephone"></i> +1 234 567 890
          </p>
          <p>
            <i class="bi bi-envelope"></i> support@mywebsite.com
          </p>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col text-center">
          <p class="mb-0">
            &copy; 2025 MyWebsite. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
    name: 'FooterAuth',
};
</script>
<style scoped>
/* footer.bg-dark.text-white.py-4 {
    margin-left: 228px!important;
    margin-top: 319px!important;
    padding-left: 70px!important;
} */
footer.bg-dark.text-white.py-4[data-v-056bcefd][data-v-056bcefd][data-v-056bcefd] {
    margin-left: 228px!important;
    margin-top: 609px!important;
    padding-left: 70px!important;
}
</style>
