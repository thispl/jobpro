<template>
    <div class="relative bg-white rounded-md m-5 md:mx-8 p-5 md:px-10 lg:px-16 lg:py-8 shadow-lg shadow-gray-400">
        <div @click="showList1=!showList1" class="cursor-pointer flex gap-5 md:gap-10 lg:gap-16 ">
            <div>
                <p class="font-semibold text-[#05264e] text-[15px] md:text-[18px]">Amar Karthick P</p>
                <p class="font-medium text-gray-600 text-[11px] md:text-[13px]">Claimed on May 1, 2025</p>
            </div>
            <p class="absolute right-[33%] lg:right-[25%] font-semibold text-[#05264e] text-[16px] hidden md:block ml-auto">₹1,000</p>
            <div class="ml-auto">
                <processing />
                <!-- <approved /> -->
                <!-- <paid /> -->
            </div>
        </div>
        <Transition name="fade" mode="out-in">
            <div v-show="showList1">
                <hr class="mt-3">
                    <div class="md:hidden mt-3">
                        <div class="flex">
                            <p class="text-gray-500 text-[13px] font-semibold">Reward Amount</p>
                            <p class="text-[#05264e] text-[12px] font-semibold ml-auto">₹1,000.00</p>
                        </div>
                    </div>
                    <div>
                        <status_tracker 
                            v-model="activeStep"
                            :steps="['Invoice Created', 'Approved', 'Payment Requested', 'Paid']"
                            @submit="handleSubmit"
                        />
                    </div>    
                <p class="mt-3 text-gray-500 text-[12px] md:text-[13px] font-medium ml-auto mt-[-40px] md:mt-0">Your claim is being processed. This typically takes 7-10 business days.</p>
            </div>
        </Transition>
    </div>

    <div class="relative bg-white rounded-md m-5 md:mx-8 p-5 md:px-10 lg:px-16 lg:py-8 shadow-lg shadow-gray-400">
        <div @click="showList2=!showList2" class="cursor-pointer flex gap-5 md:gap-10 lg:gap-16 ">
            <div>
                <p class="font-semibold text-[#05264e] text-[15px] md:text-[18px]">Muthu E</p>
                <p class="font-medium text-gray-600 text-[11px] md:text-[13px]">Claimed on May 1, 2025</p>
            </div>
            <p class="absolute right-[33%] lg:right-[25%] font-semibold text-[#05264e] text-[16px] hidden md:block ml-auto">₹1,000</p>
            <div class="ml-auto">
                <approved />
            </div>
        </div>
        <Transition name="fade" mode="out-in">
            <div v-show="showList2">
                <hr class="mt-3">
                    <div class="md:hidden mt-3">
                        <div class="flex">
                            <p class="text-gray-500 text-[13px] font-semibold">Reward Amount</p>
                            <p class="text-[#05264e] text-[12px] font-semibold ml-auto">₹1,000.00</p>
                        </div>
                    </div>
                    <div>
                        <status_tracker 
                            v-model="activeStep"
                            :steps="['Invoice Created', 'Approved', 'Payment Requested', 'Paid']"
                            @submit="handleSubmit"
                        />
                    </div>    
                <p class="mt-3 text-gray-500 text-[12px] md:text-[13px] font-medium ml-auto mt-[-40px] md:mt-0">Your claim is being processed. This typically takes 7-10 business days.</p>
            </div>
        </Transition>
    </div>

    <div class="relative bg-white rounded-md m-5 md:mx-8 p-5 md:px-10 lg:px-16 lg:py-8 shadow-lg shadow-gray-400">
        <div @click="showList3=!showList3" class="cursor-pointer flex gap-5 md:gap-10 lg:gap-16 ">
            <div>
                <p class="font-semibold text-[#05264e] text-[15px] md:text-[18px]">Riyaz A</p>
                <p class="font-medium text-gray-600 text-[11px] md:text-[13px]">Claimed on May 1, 2025</p>
            </div>
            <p class="absolute right-[33%] lg:right-[25%] font-semibold text-[#05264e] text-[16px] hidden md:block ml-auto">₹1,000</p>
            <div class="ml-auto">
                <paid />
            </div>
        </div>
        <Transition name="fade" mode="out-in">
            <div v-show="showList3">
                <hr class="mt-3">
                    <div class="md:hidden mt-3">
                        <div class="flex">
                            <p class="text-gray-500 text-[13px] font-semibold">Reward Amount</p>
                            <p class="text-[#05264e] text-[12px] font-semibold ml-auto">₹1,000.00</p>
                        </div>
                    </div>
                    <div>
                        <status_tracker 
                            v-model="activeStep"
                            :steps="['Invoice Created', 'Approved', 'Payment Requested', 'Paid']"
                            @submit="handleSubmit"
                        />
                    </div>    
                <p class="mt-3 text-gray-500 text-[12px] md:text-[13px] font-medium ml-auto mt-[-40px] md:mt-0">Your claim is being processed. This typically takes 7-10 business days.</p>
            </div>
        </Transition>
    </div>
    
</template>

<script>
import processing from './badge/processing.vue';
import approved from './badge/approved.vue';
import paid from './badge/paid.vue';
import status_tracker from './template/status_tracker.vue';

export default {
    data() {
        return {
            activeStep: 0,
            showList1: false,
            showList2: false,
            showList3: false,
        };
    },
    components: {
        processing,
        approved,
        paid,
        status_tracker,
    },
    methods() {

    },
}
</script>