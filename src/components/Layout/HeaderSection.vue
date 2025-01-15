<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-color">
      <div class="container">
        <router-link class="navbar-brand" to="/">MyWebsite</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/signup">SignUp</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/post">Posts</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "HeaderSection",
};
</script>
<style>
    .bg-color {
    --bs-bg-opacity: 1;
    background-color: rgb(155, 73, 73) !important;
}
</style>
