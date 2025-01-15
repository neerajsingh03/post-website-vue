<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Welcome to PostHub</h1>
    
    <div class="row">
      <!-- Post Card 1 -->
      <div class="col-md-4 mb-4">
        <div class="card">
           <img src="@/assets/logo.png" class="card-img-top" alt="Post 3 Image" style="width:50px">
          <div class="card-body">
            <h5 class="card-title">Post Title 1</h5>
            <p class="card-text">This is a short description of the post. It provides a brief overview of what the post is about.</p>
            <a href="#" class="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>

      <!-- Post Card 2 -->
      <div class="col-md-4 mb-4">
        <div class="card">
            <img src="@/assets/logo.png" class="card-img-top" alt="Post 3 Image" style="width:50px">
          <div class="card-body">
            <h5 class="card-title">Post Title 2</h5>
            <p class="card-text">This is another short description of a different post. Learn more about this interesting topic.</p>
            <a href="#" class="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>

      <!-- Post Card 3 -->
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="@/assets/logo.png" class="card-img-top" alt="Post 3 Image" style="width:50px">
          <div class="card-body">
            <h5 class="card-title">Post Title 3</h5>
            <p class="card-text">Another post with a unique topic. Discover insights and get inspired by reading this post.</p>
            <a href="#" class="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    </div>
    <!-- Call to Action Section -->
    <div class="text-center mt-5">
      <h3>Ready to Share Your Posts?</h3>
      <p>Join our community of writers and start posting today!</p>
      <router-link  to="/signup" class="btn btn-success btn-lg">Sign Up</router-link>
    </div>
  </div>
</template>

<script>

export default {
    name: 'HomePage',
};
</script>

