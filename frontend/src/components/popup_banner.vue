<template>
    <div class="fixed inset-0 bg-black bg-opacity-[0.5] flex justify-center items-center z-20">
        <div class="flex item-center justify-center mt-20">
            <img v-if="url" :src="url" alt="popup-banner" class="w-[32rem] shadow-xl" />
        </div>
    </div>
  </template>
  
  <script>
  import apiService from '../services/apiService.js';
  
  export default {
    data() {
      return {
        url: null,
      }
    },
    mounted() {
      this.fetchPopUrl();
    },
    methods: {
      async fetchPopUrl() {
        try {
          const response = await apiService.getPopUrl();
          this.url = "https://erp.teamproit.com/" + response.data.message
        } catch (error) {
          console.error("Error fetching URL:", error);
        }
      }
    }
  }
  </script>