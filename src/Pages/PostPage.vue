<template>
  <div class="container min-vh-20 d-flex justify-content-center align-items-center">
    <div class="row w-100">
      <div class="col-md-6 mx-auto">
        <h2 class="text-center mt-3">Create a new post</h2>
        <form @submit="save">
            <div v-if="validate" class="text-danger">
                {{ validate }}
            </div>
          <div class="mb-3">
            <label for="postTitle" class="form-label">Post Title</label>
            <input type="text" class="form-control" id="postTitle" name="post" v-model="post" placeholder="Enter post title"/>
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" rows="4"  name="description" v-model="description" placeholder="Enter post description"></textarea>
          </div>
          <div class="mb-3">
            <label for="image" class="form-label">Upload Post Image</label>
            <input type="file" class="form-control" id="image" @change="handleImageUpload" />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Create post</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PostPage',
  data(){
   return {
    post:    "",
    description: "",
    postImage  : null,
    data: [],
    validate: '',
   };
  },
  methods:{
  
     handleImageUpload(e){
        const file = e.target.files[0];
        if(file)
        {
            this.postImage = file;
        }
        console.log(this.data);
    },
   async save(e){
        e.preventDefault();
        if(!this.post || !this.description){
            this.validate = "All fields are required";
            window.scrollTo(0, 0); 
            return;
        }
       const formData = new FormData();
        formData.append('post',this.post);
        formData.append('description',this.description);
        if(this.postImage){
            formData.append('image',this.postImage);
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/store-post',formData,{
               headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(`this is backend response: ${response.data}`);
            if(response.data.status === 200){
                this.post ='';
                this.description = '';
            }
        } catch (error) {
            console.error('something wrong',error);
        }
        
    },
  },
  
};
</script>
