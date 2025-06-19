
<template>
    <div v-if="initialLogo" class="h-[650px] flex justify-center items-center intro-1">
    <img src="https://i.postimg.cc/6qY40bGc/Whats-App-Image-2024-09-30-at-11-38-34-75256763-removebg-preview.png" class="w-20 logo-depth"/>
    </div>
    <div v-if="finalLogo" class="h-[650px] flex justify-center items-center intro-2">
    <img src="https://i.postimg.cc/6qY40bGc/Whats-App-Image-2024-09-30-at-11-38-34-75256763-removebg-preview.png" class="w-20 logo-depth"/>
    </div>
    <p v-if="finalLogoEnds" class="text font-medium text-[#000048] font-sans text-xl typing-demo">Powered By...</p>
    <img v-if="teamproLogo" src="https://i.postimg.cc/6p66m14h/TEAMPRO.png" width="180px" class="py-4 logo-depth logo teampro-intro" alt="Teampro Logo" />
    
  </template>
  
  <script>  
  export default {
    data() {
      return {
        initialLogo: true,
        finalLogo: false,
        finalLogoEnds: false,
        teamproLogo: false,
      };
    },
    mounted() {
      setTimeout(() => {
        this.initialLogo = false;
        this.finalLogo = true;
      }, 1800)
      setTimeout(() => {
        this.finalLogoEnds = true;
      }, 3600)
      setTimeout(() => {
        this.teamproLogo = true;
      }, 6000)
    },
  }
  </script>
  
  <style scoped>
  .logo {
    position: absolute;
    top: 295px;
    left: 52%;
  }
  .logo-depth  {
    filter: drop-shadow(3px 0px 1px #808080 );
  }
  .text {
    position: absolute;
    top: 315px;
    left: 44%;
  }
  .typing-demo {
    width: 12ch;
    animation: typing 2s steps(22), blink .5s step-end infinite alternate;
    white-space: nowrap;
    overflow: hidden;
    border-right: 3px solid;
  }
  
  @keyframes typing {
    from {
      width: 0
    }
  }
      
  @keyframes blink {
    0% {
      border-color: transparent
    }
  }
  
  .intro-1 {
    animation: fade-up 0.8s;
  }
  .intro-2 {
    animation: move-left 1.5s;
    transform: translateX(-150px)
  }
  @keyframes fade-up {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.9);
    }
    100% {
      opacity: 1;
      transform:translateY(0px) scale(1);
    }
  }
  @keyframes move-left {
    from {
      transform: translateX(0px);
    }
    to {
      transform: translateX(-150px);
    }
  }
  .teampro-intro {
    animation: fade-in 0.8s;
  }
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .initialLogo {
    display: none;
  }
  .finalLogo {
    display: block;
  }
  
  </style>