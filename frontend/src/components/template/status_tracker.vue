<template>
  <div class="max-w-3xl mx-auto p-6 font-sans">
    <!-- Progress Steps -->
    <div class="relative mb-10">
      <div class="flex flex-col sm:flex-row sm:justify-between gap-6 sm:gap-0">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="flex sm:flex-col items-center sm:items-center gap-2 sm:gap-0 cursor-pointer z-10"
          @click="goToStep(index)"
        >
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center"
            :class="{
              'bg-[#74cd61] text-white': currentStep >= index,
              'bg-gray-200 text-gray-600': currentStep < index
            }"
          >
            <span v-if="currentStep < index">{{ index + 1 }}</span>
            <svg
              v-else
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <span
            class="text-sm sm:mt-2 text-center"
            :class="{
              'text-[#74cd61] font-medium': currentStep === index,
              'text-gray-500': currentStep !== index
            }"
          >
            {{ step }}
          </span>
        </div>
      </div>

      <!-- Progress line -->
      <!-- Horizontal for desktop -->
      <div class="hidden sm:block absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-1"></div>
      <div
        class="hidden sm:block absolute top-4 left-0 h-1 bg-[#74cd61] transition-all duration-300 ease-in-out -z-1"
        :style="`width: ${(currentStep / (steps.length - 1)) * 100}%`"
      ></div>

      <!-- Vertical for mobile -->
      <div class="block sm:hidden absolute left-4 top-0 bottom-0 w-1 bg-gray-200 -z-1"></div>
      <div
        class="block sm:hidden absolute left-4 top-0 w-1 bg-[#74cd61] transition-all duration-300 ease-in-out -z-1"
        :style="`height: ${(currentStep / (steps.length - 1)) * 100}%`"
      ></div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'CheckoutStepper',
  props: {
    steps: {
      type: Array,
      default: () => ['Invoice Created', 'Approved', 'Payment Requested', 'Paid'],
    },
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:modelValue', 'submit'],
  computed: {
    currentStep: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
      }
    },
    previousStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    goToStep(index) {
      if (index >= 0 && index < this.steps.length) {
        this.currentStep = index;
      }
    },
    submitOrder() {
      this.$emit('submit');
    },
  },
};
</script>
