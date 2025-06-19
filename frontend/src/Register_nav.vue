<template>
  <div class="bg-white mt-0 shadow-lg shadow-gray-600">
        <div class="mx-10 flex md:justify-end items-center mr-[50px] md:p-6">
            <img class="md:hidden" src="https://i.postimg.cc/6qY40bGc/Whats-App-Image-2024-09-30-at-11-38-34-75256763-removebg-preview.png" alt="jobpro" width="60px">
            <img class="hidden md:block md:w-[140px] lg:w-[180px] fixed left-[5%] logo-depth" src="https://i.postimg.cc/6p66m14h/TEAMPRO.png" width="180px" alt="Teampro Logo" />
            <div class="flex mr-24 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse register">
        <p class="text-[#05264e] font-medium tracking-wide ml-[-180px] reg-class">Already Registered ? <router-link to="login" class="font-semibold" style="color: #05264e;">Login</router-link> here</p>
      </div>
            <img class="hidden md:block md:w-[70px] lg:w-[75px] fixed right-[5%] logo-depth" src="https://i.postimg.cc/6qY40bGc/Whats-App-Image-2024-09-30-at-11-38-34-75256763-removebg-preview.png" alt="jobpro" width="75px">
        </div>
    </div>
</template>
    
    <script setup>
    
    </script>
    
    <style>
    .router-link-active {
        color: #0097ff;
    }
    .logo-depth  {
      filter: drop-shadow(0px 0.8px 0.1px white);
    }
    @media (max-width: 575.98px) {
  .logo-new{
    width:70px;
    padding-top: 0px;
    padding-bottom: 0px;
    margin-left:0px;
  }
  .register{
    font-size:10px;
    padding-left: 40px;
  }
  .logo-sizes{
    margin-right:10px;
    margin-left:0px;
  }
  .reg-class{
    padding-left: 30px;
  }
  .mainclass-div{
    width:1005;
  }
}
    </style>