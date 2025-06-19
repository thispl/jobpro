<template>
    <div class="bg-white">
    <div class="mx-10 pt-6 font-sans">
        <div class="flex mx-5">
            <img src="https://d2rj3iig8nko29.cloudfront.net/website-static/app-project-images/invite_and_earn_logo.svg" />
            <h1 class="text-[#05264e] font-sans pl-3 pt-1.5 text-2xl font-semibold">Refer and Earn</h1>  
            <router-link to="referrals" class="flex bg-[#0967d2] ml-auto text-[white] font-sans px-3 pt-1 text-sm rounded-sm font-semibold">
                <img src="https://i.postimg.cc/DZrm79ct/output-onlinepngtools.png" width="30px"/>
                <p class="mt-2 pl-3">Refer a friend</p>
        </router-link>
        </div>
        <hr class="mt-5 mx-5">
        <div class="grid grid-cols-8 mx-5">
            <div class="col-span-2 flex">
                <div class=" mt-5">
                    <p class="text-[#7b7f7a] text-sm font-medium">ALL BOARDS</p>
                    <div>
                        <!-- Dashboard -->
                        <div class="flex gap-3 mt-5">
                            <img class="hidden" src="https://d2rj3iig8nko29.cloudfront.net/website-static/dashboards/dashboards_icons/dashboard_unselected_icon.svg" />
                            <img src="https://d2rj3iig8nko29.cloudfront.net/website-static/dashboards/dashboards_icons/dashboard_select_icon.svg" />
                            <p class="text-[#0967d2]  text-md font-semibold">My Dashboard</p>
                        </div>
                        <!-- Earnings -->
                        <div class="flex gap-3 mt-5">
                            <img src="https://d2rj3iig8nko29.cloudfront.net/website-static/dashboards/dashboards_icons/earnings_unselecetd_icon.svg" />
                            <img class="hidden" src="https://d2rj3iig8nko29.cloudfront.net/website-static/dashboards/dashboards_icons/earnings_selected_icon.svg" />
                            <p class="text-[#7b7f7a] text-md font-medium">Earnings</p>
                        </div>
                        <!-- Referrals -->
                        <div class="flex gap-3 mt-5">
                            <img src="https://d2rj3iig8nko29.cloudfront.net/website-static/dashboards/dashboards_icons/payout_process_icon.svg" width="25px" />
                            <img class="hidden" src="https://d2rj3iig8nko29.cloudfront.net/website-static/dashboards/dashboards_icons/payout_process_selected_icon.svg" />
                            <p class="text-[#7b7f7a] text-md font-medium">Your Referrals</p>
                        </div>
                        <!-- Terms and Conditions -->
                        <div class="flex gap-3 mt-5">
                            <img src="https://d2rj3iig8nko29.cloudfront.net/website-static/dashboards/terms-and-condition.svg" />
                            <img class="hidden" src="https://d2rj3iig8nko29.cloudfront.net/website-static/dashboards/terms-and-condition-selected-icon.svg" />
                            <p class="text-[#7b7f7a] text-md font-medium">Terms and Conditions</p>
                        </div>
                    </div>
                </div>
                <div class="">
                    <div class="ml-3 or-hide shadow-lg shadow-gray-600">
                        <div style="border-left: 1.5px solid #ededed;height: 100vh;"></div>
                    </div>
                </div>
            </div>
            <div class="ml-[-145px] col-span-6 bg-[#f5f7fa]">
                <div class="mt-5 flex">
                    <p class="mx-10 text-[#05264e] font-medium text-[25px] capitalize">Help your friends get a job and get rewarded.</p>
                    <div class="border border-[#d97400] rounded-md bg-[#fffbea] ml-auto mr-10"> 
                        <div class="flex gap-2 mt-2 px-5 pb-2">
                            <div class="w-5 mt-0.5"><img src="https://d2rj3iig8nko29.cloudfront.net/staging/media/invite-and-earn-images/rupee.png" /></div>
                            <p class="text-md font-semibold text-[#52606d]">Total Earnings <span></span></p>
                            <p class="text-xl mt-0.5 font-semibold text-[black]">Rs. 0/-</p>
                        </div>
                    </div>
                </div>
                <!--  -->
                <div class="flex p-10 gap-10">
                    <div class="w-[40%] bg-white shadow-lg shadow-gray-600 rounded-lg p-5">
                        <img src="https://i.postimg.cc/3JyRDgdL/Artboard-2.png" width="220px"/>
                        <div class="flex gap-5 mt-5">
                            <p class="px-3 pb-1.5 pt-0.5 text-[#073c71] bg-[#e6f6ff] rounded-md font-semibold text-sm">Graduates</p>
                            <p class="px-3 pb-1.5 pt-0.5 text-[#073c71] bg-[#e6f6ff] rounded-md font-semibold text-sm">Any Branch or Degree</p>
                        </div>
                        <div class="mt-6 flex gap-6 justify-center">
                            <div>
                                <p class="text-sm text-center">You Get</p>
                                <p  class="text-2xl mt-2 font-semibold text-center">&#8377; 5,000 /-</p>
                            </div>
                            <div>
                                <div class="ml-3 or-hide">
                                    <div style="border-left: 1.5px solid #c8c8c8;height: 50px;"></div>
                                </div>
                            </div>
                            <div>
                                <p class="text-sm text-center">Your Friend Get</p>
                                <p  class="text-2xl mt-2 font-semibold text-center">Job Offer</p>
                            </div>
                        </div>
                        <div class="flex mt-6 gap-6">
                            <div class="border border-[#489eef] flex rounded-md px-4 py-1 bg-[#e9f3fd] gap-2">
                                <div class="h-6 w-6 opacity-[0.5]"><img src="https://i.postimg.cc/Y0xMTccF/copy-link.png" width="100px" /></div>
                                <p class=" text-md text-[#3997ee] font-medium">Copy Link</p>
                            </div>
                            <div @click="referJob()" class="cursor-pointer border border-[#5cc0a1] flex rounded-md px-4 py-1 bg-[#e9f7f3] gap-2">
                                <div class="h-6 w-6"><img src="https://i.postimg.cc/Ss6G0dg8/whatsapp.png" width="100px" /></div>
                                <p class="text-md text-gray-600 font-medium">Share on WhatsApp</p>
                            </div>
                        </div>
                    </div>
                    <div class="w-[60%]">
                        <div class="bg-white shadow-lg shadow-gray-600 rounded-lg p-5">
                            <div class="flex">
                                <p class="text-[#05264e] font-semibold text-[20px]">Friend who referred you</p>
                                <div class="ml-auto w-[140px]"><img src="https://i.postimg.cc/3JyRDgdL/Artboard-2.png" width="220px"/></div>
                            </div>
                            <div class="flex mt-3">
                                <div class="leading-10">
                                    <p v-if="full_name" class="text-[#001d38] font-bold text-md">NAME: <span class="text-[#073c71] font-semibold">{{ full_name }}</span></p>    
                                    <p v-if="referred" class="text-[#001d38] font-bold text-md">ID: <span class="text-[#073c71] font-semibold">{{ referred }}</span></p>                    
                                    <p v-if="position" class="text-[#001d38] font-bold text-md">POSITION: <span class="text-[#073c71] font-semibold">{{ position }}</span></p>                    
                                    <p v-if="company" class="text-[#001d38] font-bold text-md">COMPANY: <span class="text-[#073c71] font-semibold">{{ company }}</span></p>                    
                                </div>
                                <div class="ml-auto mr-10">
                                    <img v-if="image" :src="image" width="100px"/>
                                    <img v-else src="https://i.ibb.co/ss8RQ38/user.png" alt="profile" class="z-0" width="100px"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!--  -->
                <!-- <div>
                    <p class="mx-10 text-[#05264e] font-medium text-[25px] capitalize">3 Steps to Earn Guaranteed Rewards</p>
                    <div class="flex">
                        <div class="flex mt-6 gap-6">
                            <div class="border border-[#489eef] flex rounded-md px-4 py-1 bg-[#e9f3fd]">
                                <div class="h-6 w-6 opacity-[0.5]"><img src="https://i.postimg.cc/Y0xMTccF/copy-link.png" width="100px" /></div>
                                <p class=" text-md text-[#3997ee] font-medium">Copy Link</p>
                            </div>
                            <div class="border border-[#5cc0a1] flex rounded-md px-4 py-1 bg-[#e9f7f3]">
                                <div class="h-6 w-6 opacity-[0.5]"><img src="https://i.postimg.cc/Ss6G0dg8/whatsapp.png" width="100px" /></div>
                                <p class="text-md text-gray-600 font-medium">Share on WhatsApp</p>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
<p>{{profileMail.emailId}}</p>
    </div>
</div>
</template>

<script>
import { inject } from 'vue';  
import { useRouter } from 'vue-router';
import apiService from '@/services/apiService.js';
    import 'intl-tel-input/build/css/intlTelInput.css';
    import intlTelInput from 'intl-tel-input';

export default {
  data() {
    return {
        id: '',
        full_name: '',
        image: '',
        company: '',
        position: '',
    }
  },
  setup() {
    const profileMail = inject('profileMail');
    return { profileMail };
  },
  mounted() {
    const currentPath = window.location.pathname; // Get the current path
    if (currentPath.includes('/referpro')) {
        this.candidateDetails();
    }
    this.$nextTick(() => {
        const input = document.querySelector('#phone');

        if (!input) {
            console.error("Phone input field not found!");
            return;
        }

        this.iti = intlTelInput(input, {
            initialCountry: "in",
            separateDialCode: true,
            nationalMode: false,
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.8/build/js/utils.js"
        });
    });
  },
  methods: {
    async candidateDetails() {
        try {
            if (this.profileMail && this.profileMail.emailId) {
                console.log(this.profileMail.emailId)
                const response = await apiService.getCandidateDetails(this.profileMail.emailId);
                this.id = response.data.message.custom_referred_by
                if (this.id) {
                    const responsed = await apiService.referralDetails(this.id);
                    this.referred = responsed.data.message.name
                    this.full_name = responsed.data.message.given_name
                    this.image = responsed.data.message.candidate_image
                    this.company = responsed.data.message.customer
                    this.position = responsed.data.message.position
                }
            } else {
                console.error("No email provided in profileMail.");
            }
        } catch (error) {
            console.error("Failed to fetch candidate details:", error);
        }
    },
    referJob() {
              const message = `Looking for a job? *JOBPRO* makes it easy! Search jobs, apply in seconds, and track your applications—all in one place. Use my referral code ${this.id} when signing up to get started. Download now or visit http://139.5.190.19:8080/frontend/registration?reference=${this.id} and find your dream job today!`
              const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
              window.open(url, '_blank');
          },
  },
}
</script>

<style>

</style>