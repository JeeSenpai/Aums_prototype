<template>
  <div class="container mx-auto p-4 bg-white">
  <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
    <h1 class="text-lg font-bold">Register</h1>

    <form @submit.prevent class="flex flex-col mt-4">
        <input
          type="text"
          name="name"
          v-model="posts.name"
          :class="{ invalid: isSubmitting && !posts.name.trim() }"
          class="px-4 py-3 w-full rounded-md border bg-gray-100  border-gray-500 focus:bg-white focus:ring-0 text-sm"
          placeholder="Full Name"
      />
       <input
          type="text"
          name="username"
          v-model="posts.username"
          :class="{ invalid: isSubmitting && !posts.username.trim() }"
          class="px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 border-transparent border-gray-500 focus:bg-white focus:ring-0 text-sm"
          placeholder="Username"
      />
      <input
          type="email"  
          name="email"
          v-model="posts.email"
          :class="{ invalid: isSubmitting && !posts.email.trim() }"
          class="px-4 py-3 mt-4 w-full rounded-md border bg-gray-100  border-gray-500 focus:bg-white focus:ring-0 text-sm"
          placeholder="Email address"    
      />
      <input
          type="password"
          name="password"
          v-model="posts.password"   
          :class="{ invalid: isSubmitting && !posts.password.trim() }"
          class="px-4 py-3 mt-4 w-full rounded-md border bg-gray-100  border-gray-500 focus:bg-white focus:ring-0 text-sm"
          placeholder="Password"
      />
      <button
          @click="userCreate"
          class="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white bg-blue-500 hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center font-medium focus:outline-none"
      >
        Register
      </button>
      <div class="flex flex-col items-center mt-5">
        <p class="mt-1 text-xs font-light text-gray-800">
        Already Have an Account? <router-link to="/login" class="ml-1 font-medium text-blue-700">Sign in</router-link>
          </p>
      </div>
    </form>

  </div>
</div>
</template>

<script>

import axios from 'axios'

export default {
  name: "Register",
  data() {
    return {
        posts:{
        name:"",
        username:"",
        email: "",
        password: "",
      },
       isSubmitting: false,
    }
  },

  methods:{
    userCreate(){
            this.isSubmitting = true;

            const formValid = [this.posts.name, this.posts.username, this.posts.email, this.posts.password]
            .map((x) => x.trim())
            .every(Boolean);

            if (formValid) {
              axios.post('http://localhost:8000/users', this.posts).then((result)=>{
              alert("Created", result);
              this.$router.push({name: 'login'});
              });
            } 
            else {
              alert("Please complete the form!")
            }
      }
  }
 


}

</script>

<style scoped>
.invalid {
  border-color: red;
}
</style>