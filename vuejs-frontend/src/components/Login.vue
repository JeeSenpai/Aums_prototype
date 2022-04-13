<template>
  <div class="container mx-auto p-4 bg-white">
  <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
    <h1 class="text-lg font-bold">Login</h1>
    
    <form @submit.prevent class="flex flex-col mt-4">
      <input
          type="text"
          name="username"
          v-model="cred.username"
          :class="{ invalid: isSubmitting && !cred.username.trim() }"
          class="px-4 py-3 w-full rounded-md border bg-gray-100  border-gray-500 focus:bg-white focus:ring-0 text-sm"
          placeholder="Username"
      />
      <input
          type="password"
          name="password"
          v-model="cred.password"
          :class="{ invalid: isSubmitting && !cred.password.trim() }"
          class="px-4 py-3 mt-4 w-full rounded-md border bg-gray-100  border-gray-500 focus:bg-white focus:ring-0 text-sm"
          placeholder="Password"
      />
      <button
          @click="userLogin"
          class="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white bg-blue-500 hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center font-medium focus:outline-none"
      >
        Login
      </button>
      <div class="flex flex-col items-center mt-5">
        <p class="mt-1 text-xs font-light text-gray-800">
          Create New Account! <router-link to="/register" class="ml-1 font-medium text-blue-700">Sign up</router-link>
          </p>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Login",

  data(){
    return{
       cred:{
          username: "",
          password: "",
       },
       isSubmitting: false,
    }
  },


  methods:{
    userLogin(){
        this.isSubmitting = true;
        const formValid = [this.cred.username, this.cred.password]
        .map((x)=> x.trim())
        .every(Boolean);

         if (formValid) {
              axios.post('http://localhost:8000/auth/login', this.cred).then((result)=>{
                if(result.data.status == 404){
                    alert('Please enter correct credentials')
                }
                else{
                    localStorage.setItem('access_token', result.data.access_token); 
                    this.$router.push({name: 'home'});
                }
              }); 
         }
         else{

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