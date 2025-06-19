<template>
  
<nav class="width:full rounded-xl h-18 mt-3 z-30"  style="background-image: linear-gradient(to left, #002395, #05264e);">
  <div class="flex flex-wrap items-center justify-between mx-10 p-2 logo-size" >
  <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://i.postimg.cc/6p66m14h/TEAMPRO.png" width="180px" class="py-4 logo-depth logo" alt="Teampro Logo" />
      <!-- <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">JOBPRO</span> -->
  </a>
  <div class="relative flex md:order-2 button-class">
    <router-link to="/login" type="button" class="mr-24 login-but text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600" style="color: white !important;">Sign In</router-link>
      <button data-collapse-toggle="navbar-cta" type="button" class="nav-size inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="nav-size1 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div>
      <img src="https://i.postimg.cc/6qY40bGc/Whats-App-Image-2024-09-30-at-11-38-34-75256763-removebg-preview.png" alt="jobpro" width="75px" height="75px" class=" absolute right-[40px] bottom-[0px]">
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 " id="navbar-cta">
    <ul v-if="!isLoginPage" class="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white"  style="background-color: transparent;">
      <li>
        <router-link to="/" class="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</router-link>
      </li>
      <li>
        <router-link to="/find-a-job" class="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Find a Job</router-link>
      </li>
      <li>
        <router-link to="/candidates" class="mr-28 block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Candidates</router-link>
      </li>
    </ul>
  </div>
  </div>
</nav>

</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const isLoginPage = computed(() => route.path === '/login');
</script>

<style>
.router-link-active {
    color: #0097ff;
}
.logo-depth  {
  filter: drop-shadow(0px 0.8px 0.1px white);
}
@media (max-width: 575.98px) {
  .logo{
    width:55px;
    height:42px;
    padding-top: 0px;
    padding-bottom: 0px;
    padding-right: 5px;
    margin-right: 0px;
  }
  .register-but{
    width:75px;
    height:30px;
    /* padding-left: 10px; */
    font-size:10px;
    padding-top: 10px ;
    padding-bottom: 10px;
    /* color: aqua !important;  */
  }
  .login-but{
    width:60px;
    height:30px;
    padding-left: 9px;
    padding-top: 10px;
    font-size:2px;
    
  }
  .button-class{
    width:60%;
    padding-top: 10px;
    padding-right: 0px;
  }
  .logo-size{
    width:50%;
    margin-right: 10px;
    margin-left: 10px;
  }
  .nav-size1{
    padding-top: 0px;
    margin-bottom: 11px;
  }
  .nav-size{
    margin-left: 5px;
    padding-right:0px;
    padding-bottom: 50px;
  }
}
</style>