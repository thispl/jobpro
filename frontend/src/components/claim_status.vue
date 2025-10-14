<template>
  <div class=" overflow-x-auto whitespace-nowrap hide-scrollbar  px-5 pb-2 flex  items-center justify-start md:justify-center gap:10 md:gap-10 sticky top-0 bg-[#efeff5] z-10 ">
    <button @click="activeButton('isAllActive')" class="font-semibold text-[#05264e] text-[13px]  md:text-lg rounded-b-lg   py-2 md:py-2 px-3 md:px-5" :class="{ 'bg-white bg-white shadow-lg shadow-gray-400 text-blue-600': isAllActive }">All</button>
    <button @click="activeButton('isProcessingActive')" class="font-semibold text-[#05264e] text-[13px] md:text-lg rounded-b-lg py-2 px-3 md:px-5" :class="{ 'bg-white bg-white shadow-lg shadow-gray-400 text-blue-600': isProcessingActive }">Processing</button>
    <button @click="activeButton('isApprovedActive')" class="font-semibold text-[#05264e] text-[13px] md:text-lg rounded-b-lg py-2 px-3 md:px-5" :class="{ 'bg-white bg-white shadow-lg shadow-gray-400 text-blue-600': isApprovedActive }">Approved</button>
    <button @click="activeButton('isPaymentPendingActive')" class="font-semibold text-[#05264e] text-[13px] md:text-lg rounded-b-lg py-2 px-3 md:px-5" :class="{ 'bg-white bg-white shadow-lg shadow-gray-400 text-blue-600': isPaymentPendingActive }">Payment Pending</button>
    <button @click="activeButton('isPaidActive')" class="font-semibold text-[#05264e] text-[13px] md:text-lg rounded-b-lg py-2 px-3 md:px-5" :class="{ 'bg-white bg-white shadow-lg shadow-gray-400 text-blue-600': isPaidActive }">Paid</button>
  </div>
  <div
    v-for="(claim, index) in filteredClaims"
    :key="index"
    class="
      relative rounded-md m-5 md:mx-8 p-5 md:px-10 lg:px-16 lg:py-8 shadow-lg shadow-gray-400 bg-white
      "
  >
    <div @click="toggle(index)" class="cursor-pointer flex gap-5 md:gap-10 lg:gap-16">
      <div>
        <p class="font-semibold text-[#05264e] text-[15px] md:text-[18px] text-nowrap">{{ claim.name }}</p>
        <p class="font-medium text-gray-600 text-[11px] md:text-[13px] text-nowrap">Claimed on {{ claim.invoice_created_date }}</p>
      </div>
      <p class="absolute right-[33%] lg:right-[30%] md:right-[40%] font-semibold text-[#05264e] text-[16px] hidden md:block ml-auto">₹{{ claim.reward }}</p>
      <div class="right-[6%] absolute">
        <component :is="getBadgeComponent(claim.status)" />
      </div>
    </div>

    <Transition name="fade" mode="out-in">
      <div v-show="claim.show">
        <hr class="mt-3" />
        <div class="md:hidden mt-3">
          <div class="flex">
            <p class="text-gray-500 text-[13px] font-semibold">Reward Amount</p>
            <p class="text-[#05264e] text-[12px] font-semibold ml-auto">₹{{ claim.reward }}</p>
          </div>
        </div>
        <div>
          <status_tracker
            v-model="claim.active_step"
            :steps="['Invoice Created', 'Approved', 'Payment Pending', 'Paid']"
          />
        </div>
        <p class="mt-3 text-gray-500 text-[12px] md:text-[13px] font-medium ml-auto mt-[-40px] md:mt-0">
          Your claim is being processed. This typically takes 7–10 business days.
        </p>
      </div>
    </Transition>
  </div>
</template>

<script>
import processing from './badge/processing.vue';
import approved from './badge/approved.vue';
import paid from './badge/paid.vue';
import status_tracker from './template/status_tracker.vue';
import apiService from '../services/apiService';
import pending from './badge/pending.vue';

export default {
  components: {
    processing,
    approved,
    pending,
    paid,
    status_tracker,
  },
  data() {
    return {
      activeStep: 0,
      claims: [],
      candidate: 'CD155093',
      user_id: 'amar.p@groupteampro.com',
      isAllActive: true,
      isProcessingActive: false,
      isApprovedActive: false,
      isPaymentPendingActive: false,
      isPaidActive: false, 
    };
  },
  computed: {
  filteredClaims() {

    if (!Array.isArray(this.claims)) return [];


    if (this.isAllActive) return this.claims;

    if (this.isProcessingActive)
      return this.claims.filter(c => c.status === 'Processing');

    if (this.isApprovedActive)
      return this.claims.filter(c => c.status === 'Approved');

    if (this.isPaymentPendingActive)
      return this.claims.filter(c => c.status === 'Payment Pending');

    if (this.isPaidActive)
      return this.claims.filter(c => c.status === 'Paid');

    return [];
  }
},
  mounted() {
    this.fetchClaims();
  },
  methods: {
    toggle(index) {
      this.claims[index].show = !this.claims[index].show;
    },
    getBadgeComponent(status) {
      switch (status) {
        case 'Processing':
          return 'processing';
        case 'Approved':
          return 'approved';
        case 'Payment Pending':
          return 'pending';
        case 'Paid':
          return 'paid';
        default:
          return null;
      }
    },
    handleSubmit() {
      console.log('Status submitted');
    },
    async fetchClaims() {
      try {
        const response = await apiService.getReferproClaimDetails(
          this.candidate,
          this.user_id,
        );

        if (response.status === 200) {
          this.claims = response.data.message;
          console.log(response.data.message)
        }
         else {
          console.error('Error on claims:', response.statusText);
        }
      } catch (error) {
        console.error('Error on claims:', error);
      }
    },
    activeButton(button) {
      this.isAllActive = false;
      this.isProcessingActive = false;
      this.isApprovedActive = false;
      this.isPaymentPendingActive = false;
      this.isPaidActive = false;

      console.log(button)

      if (button === 'isAllActive') {
        this.isAllActive = true;
      } else if (button === 'isProcessingActive') {
        this.isProcessingActive = true;
      } else if (button === 'isApprovedActive') {
        this.isApprovedActive = true;
      } else if (button === 'isPaymentPendingActive') {
        this.isPaymentPendingActive = true;
      } else if (button === 'isPaidActive') {
        this.isPaidActive = true;
      }
    }
  },
};
</script>

<style scoped>
/* Optional transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
