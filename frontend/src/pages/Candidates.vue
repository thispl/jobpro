<template>
  <div class="max-w-3xl mx-auto p-6 font-sans">
    <!-- Progress Steps -->
    <div class="relative mb-10">
      <div class="flex justify-between">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="flex flex-col items-center z-10 cursor-pointer"
          @click="goToStep(index)"
        >
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center mb-2"
            :class="{
              'bg-green-500 text-white': currentStep >= index,
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
            class="text-sm"
            :class="{
              'text-green-600 font-medium': currentStep === index,
              'text-gray-500': currentStep !== index
            }"
          >
            {{ step }}
          </span>
        </div>
      </div>
      <!-- Progress line -->
      <div class="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-1"></div>
      <div
        class="absolute top-4 left-0 h-1 bg-green-500 transition-all duration-300 ease-in-out -z-1"
        :style="`width: ${(currentStep / (steps.length - 1)) * 100}%`"
      ></div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between">
      <button
        v-if="currentStep > 0"
        @click="previousStep"
        class="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
      >
        Back
      </button>
      <div v-else></div> <!-- Spacer -->

      <button
        v-if="currentStep < steps.length - 1"
        @click="nextStep"
        class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
      >
        Continue
      </button>

      <button
        v-if="currentStep === steps.length - 1"
        @click="submitOrder"
        class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
      >
        Place Order
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutStepper',
  props: {
    steps: {
      type: Array,
      default: () => ['Customer', 'Shipping', 'Payment', 'Confirm'],
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
