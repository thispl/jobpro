<template>
  <div>
    <!-- Trigger Button -->
    <button
      @click="showPopupFilter = true"
      class="px-6 py-2 bg-blue-600 text-white rounded-lg"
    >
      Show Popup
    </button>

    <!-- Overlay -->
    <div
      v-if="showPopupFilter"
      class="fixed inset-0 bg-black bg-opacity-40 z-40"
      @click.self="showPopupFilter = false"
    ></div>

    <!-- Slide-up Popup -->
    <transition name="slide-up">
      <div
        v-if="showPopupFilter"
        class="fixed bottom-0 left-0 right-0 bg-white p-6 shadow-lg rounded-t-2xl z-50"
      >
        <p class="text-center text-gray-800">I am a sliding popup!</p>
        <button
          @click="showPopupFilter = false"
          class="mt-4 w-full py-2 bg-red-500 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "BottomPopup",
  data() {
    return {
      showPopupFilter: false,
    };
  },
};
</script>

<style scoped>
/* Slide-up transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
