    <template>
      <div class="bg-white mt-0 shadow-lg shadow-gray-600">
            <div class="mx-10 flex md:justify-end items-center mr-[50px] md:p-6">
                <img class="md:hidden" src="https://i.postimg.cc/6qY40bGc/Whats-App-Image-2024-09-30-at-11-38-34-75256763-removebg-preview.png" alt="jobpro" width="60px">
                <img class="hidden md:block md:w-[140px] lg:w-[180px] fixed left-[5%] logo-depth" src="https://i.postimg.cc/6p66m14h/TEAMPRO.png" width="180px" alt="Teampro Logo" />
                <div class="flex mr-24 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse register">
            <p class="text-[#05264e] font-medium tracking-wide ml-[-180px] reg-class">Not Registered ? <router-link to="registration" class="font-semibold" style="color: #05264e;">Register</router-link> here</p>
          </div>
                <img class="hidden md:block md:w-[70px] lg:w-[75px] fixed right-[5%] logo-depth" src="https://i.postimg.cc/6qY40bGc/Whats-App-Image-2024-09-30-at-11-38-34-75256763-removebg-preview.png" alt="jobpro" width="75px">
            </div>
        </div>
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