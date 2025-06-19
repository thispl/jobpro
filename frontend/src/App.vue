<template>
  <!-- <SplashScreen v-if="state.splashScreen" /> -->
  <div v-if="!state.splashScreen" class="bg-[#efeff5]" :class="{'bg-white': isLoginPage || isRegistrationPage}">
    <div class="z-30 sticky top-0 stick-navbar">
      <Home_user v-if="!isLoginPage && !isRegistrationPage && !isTestPage" />
      <Register_nav v-if="isRegistrationPage" />
      <Login_nav v-if="isLoginPage" />
    </div>

    <router-view class="zoom-out"></router-view>
    <Footer v-if="isHomePage" />
  </div>
</template>

<script setup>
import { provide, reactive, computed, ref, watch, nextTick,  onMounted } from 'vue';
import { useRoute } from 'vue-router';
import apiService from './services/apiService.js';


import SplashScreen from "./SplashScreen.vue";
import Home_user from "./Home_user.vue";
import Footer from "./Footer.vue";
import Register_nav from "./Register_nav.vue";
import Login_nav from "./Login_nav.vue"

const state = reactive({
  isLoggedIn: !!localStorage.getItem('authToken'),
  splashScreen: !sessionStorage.getItem('splashScreenShown'),
});

setTimeout(() => {
  state.splashScreen = false;
  sessionStorage.setItem('splashScreenShown', 'true');
}, 8000);


const profileName = reactive({ fullName: localStorage.getItem('fullName') });
const profileMail = reactive({ emailId: localStorage.getItem('emailId') });
const candidateId = reactive({ canId: localStorage.getItem('canId') });
const profileUrl = reactive({ profile: localStorage.getItem('profile') });

provide('state', state);
provide('profileName', profileName);
provide('profileMail', profileMail);
provide('candidateId', candidateId);
provide('profileUrl', profileUrl);

const route = useRoute();
const isHomePage = computed(() => route.path === '/');
const isRegistrationPage = computed(() => route.path === '/registration');
const isLoginPage = computed(() => route.path === '/login');
const isTestPage = computed(() => route.path === '/test');

watch(route, async () => {
  await nextTick();
  const scrollableDiv = document.querySelector('.overflow-y-scroll');
  if (scrollableDiv) {
    scrollableDiv.scrollTo(0, 0);
  }
});

</script>

<style>


</style>
