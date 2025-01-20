<template>
  <div class="container min-vh-20 d-flex justify-content-center align-items-center">
    <div class="row w-100">
      <div class="col-md-6 mx-auto">
        <h2 class="text-center mt-3">Update Record</h2>
        <form @submit="save">
            <div v-if="validate" class="text-danger">
                {{ validate }}
            </div>

          <div class="mb-3">
            <label for="name" class="form-label">Full Name</label>
            <input type="text" class="form-control" id="name" name="name" v-model="name" placeholder="Enter your full name"/>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" name="email" v-model="email" placeholder="Enter your email"/>
          </div>
          <div class="text-center mt-2">
            <button type="submit" class="btn btn-primary">Update Record</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/Services/index.js';


export default {
  name: 'RegitserPage',
  data(){
   return {
    name: "",
    email: "",
    validate: '',
    user: '',
   };
  },
  mounted() {
    if (this.$route.params.userId) {
      this.fetchUserData(this.$route.params.userId); 
    }
  },
  methods:{
  
   async save(e){
        e.preventDefault();
        if(!this.name || !this.email){
            this.validate = "All fields are required";
            window.scrollTo(0, 0); 
            return;
        }
       const formData = new FormData();
        formData.append('name',this.name);
        formData.append('email',this.email);
        try {
            const response = await apiClient.post(`/update/${this.user.id}`,formData,{ 
            });
            if (response.data.success) {
            this.name = '';
            this.email = '';
            this.$router.push({ path: '/users' });
        }
        } catch (error) {
            console.error('something wrong',error);
        }
    },
   async fetchUserData(userId) {
      try {
        const response = await apiClient.get(`/edit/${userId}`);
        this.user = response.data.user;
        this.name =  this.user.name;
        this.email =  this.user.email;
    
        // console.log(user);
      } catch (error) {
        console.error('Error fetching user data for edit:', error);
      }
    },
  },
  

  
};
</script>
