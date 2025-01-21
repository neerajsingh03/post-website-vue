<template>
  <div>
    <!-- Footer Section -->
    <footer class="bg-dark text-white mt-5 py-4">
      <div class="container">
        <div class="row">
          <!-- Footer Column 1: About -->
          <div class="col-md-4 mb-4">
            <h5>About Us</h5>
            <p>PostHub is a platform for sharing and reading posts on various topics. Join the community today!</p>
          </div>

          <!-- Footer Column 2: Useful Links -->
          <div class="col-md-4 mb-4">
            <h5>Useful Links</h5>
            <ul class="list-unstyled">
              <li><a href="/" class="text-white text-decoration-none">Home</a></li>
              <li><a href="/signup" class="text-white text-decoration-none">Sign Up</a></li>
              <li><a href="/contact" class="text-white text-decoration-none">Contact Us</a></li>
              <li><a href="/privacy" class="text-white text-decoration-none">Privacy Policy</a></li>
            </ul>
          </div>

          <!-- Footer Column 3: Social Media -->
          <div class="col-md-4 mb-4">
            <h5>Follow Us</h5>
            <ul class="list-unstyled">
              <li><a href="https://facebook.com" class="text-white text-decoration-none" target="_blank">Facebook</a></li>
              <li><a href="https://twitter.com" class="text-white text-decoration-none" target="_blank">Twitter</a></li>
              <li><a href="https://instagram.com" class="text-white text-decoration-none" target="_blank">Instagram</a></li>
            </ul>
          </div>
        </div>

        <!-- Footer Bottom Section -->
        <div class="row mt-4">
          <div class="col-12 text-center">
            <p>&copy; 2025 PostHub. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "FooterSection",
};
</script>
<style scoped>
footer.bg-dark.text-white.mt-5.py-4 {
    margin-top: 119px !important;
}
</style>

