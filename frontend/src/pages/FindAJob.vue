<template>
  <div :class="{'opacity-[0.5]': loading}">
    <!-- <p class="text-center">{{ candidateId }}</p> -->
    <!-- Job Count Display -->
    <div class="w-10/12 mt-10 rounded-lg mx-auto search-banner text-center pt-13 fade-section font-sans">
      <h1 class="font-bold whitespace-nowrap dark:text-gray-900 text-3xl">
        <span class="md:text-blue-700">{{ filteredTaskCount }} Jobs</span> Available Now
      </h1>
      <p class="text-md font-sans mt-3 px-1" style="color: #007ba7;">Find the job that's perfect for you</p>
      
      <!-- Search Form -->
      <div class="flex justify-center font-sans">
        <div class="mob-view flex flex-row mt-6 bg-white rounded-lg shadow-lg pl-3 filter-box justify-center" style="width: 750px;">
          <form @submit.prevent="getData" class="mr-3 py-3 mt-1 flex gap-3">
            <div class="flex flex-row px-3 py-3 hidden lg:flex">
                <svg class="h-4 w-4 text-slate-400"  fill="none" viewBox="4 0 24 19" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
                <select v-model="selectedOptionCategory" id="optionsCategory" :class="{'text-custom': selectedOptionCategory === ''}" class="rounded-sm border-0 text-sm pl-3 options-bar">
                  <option value="" class="text-custom">Category</option>
                  <option v-for="option in optionsCategory" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
                <p class="text-sm px-2 pt-1  text-slate-600">|</p>
            </div>
            <div class="flex flex-row py-3 hidden lg:flex">
                <svg class="h-4 w-4 text-slate-400"  fill="none" viewBox="2 0 24 20" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <select v-model="selectedOptionLocation" id="optionsLocation" :class="{'text-custom': selectedOptionLocation === ''}" class="rounded-sm border-0 text-sm pl-3 options-bar">
                  <option value="" class="text-custom">Location</option>
                  <option v-for="option in optionsLocation" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
                <p class="text-sm px-2 pt-1  text-slate-600">|</p>
            </div>
            <div class="flex flex-row pl-3 mt-3">
                <svg class="h-4 w-4 text-slate-400 mt-1"viewBox="2 0 24 18" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
                    <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="5" cy="5" r="1" />  <circle cx="12" cy="5" r="1" />  <circle cx="19" cy="5" r="1" />  <circle cx="5" cy="12" r="1" />  <circle cx="12" cy="12" r="1" />  <circle cx="19" cy="12" r="1" />  <circle cx="5" cy="19" r="1" />  <circle cx="12" cy="19" r="1" />  <circle cx="19" cy="19" r="1" />
                </svg>
            </div>
            <input v-model="searchQuery" type="text" @input="showSuggestions = true" class="rounded-sm search-bar md:ml-3 font-sans keyclass" placeholder="Keywords" required />
            <button type="submit" class="mt-1 ml-5 h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600 transition-transform flex flex-row">
              <svg class="h-6 w-4 text-white" viewBox="0 0 24 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p class="pl-2 pt-1.5">Search</p>
            </button>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Job Listings -->
    <div class="grid md:grid-cols-2 xl:grid-cols-3 m-14 gap-10 w-10/12 mx-auto font-sans">
      <div v-for="task in filteredTasks" :key="task.name">
        <div class="border rounded-md hover:bg-white transition-colors px-5 job-card relative pt-2 scroll-smooth">
          <div v-if="expireDate(task.exp_end_date) < 12 && newlyPosted(task.created_on)==false" class="expires-soon">
            <img src="https://i.postimg.cc/vZQrChGv/Red-Corner-Label-4-PNG-SVG-Design-For-T-Shirts-removebg-preview.png" class="z-10">
            <p class="rotate-45 z-20 expires-soon-text font-semibold">Expires Soon</p>
            <!-- <p v-if="expireDate(task.exp_end_date) == 1" class="rotate-45 z-20 expires-soon-text font-semibold">will expire<br>in {{ expireDate(task.exp_end_date) }} day</p> -->
          </div>
          <div v-if="newlyPosted(task.created_on)==true" class="new-post">
            <img src="https://i.postimg.cc/NF6t87zy/Conception-de-banni-re-verte-sur-fond-blanc-Vecteur-Gratuite-removebg-preview.png" class="z-10">
            <p class="z-20 new-post-text font-semibold">New Post</p>
          </div>
          <div class="flex">
            <h1 class="pt-3 text-md font-sans text-gray-900 font-bold min-h-16 capitalize" style="color: #05264e;">{{ task.subject }}</h1>
            <!-- <img v-if="task.priority=='Urgent'" src="https://i.postimg.cc/X7QvJ9c7/com-video-to-gif-converter-unscreen.gif" class="w-20 ml-auto mt-[-10px]"> -->
          </div>
    <!-- Customer -->
          <!-- <div class="flex">
            <img v-if="task.custom_country_flag" :src="task.custom_country_flag" :alt="flag-task.name" class="image-size"/>
            <h2 v-if="task.custom_is_customer_confidential==0" class="pl-2 pt-3 text-sm text-gray-600 font-semibold min-h-10 ">{{ task.customer }}</h2>
            <h2 v-if="task.custom_is_customer_confidential==1" class="pl-2 pt-3 text-sm text-gray-700 font-semibold min-h-10"> *Confidential </h2>
          </div> -->
          <div class="flex">
            <img v-if="task.custom_country_flag" :src="task.custom_country_flag" :alt="flag-task.name" class="image-size mr-2"/>
            <h2 class="text-sm font-sans text-[#001d4e] font-semibold pb-2 uppercase">{{ task.territory }}</h2>
          </div>
          <div class="flex flex-row text-[11px] text-[#001d4e] gap-3 pt-2 font-semibold">
            <p>Fulltime</p>
            <p>{{ timeAgo(task.creation) }}</p>
            <p class=" rounded-md">Exp: {{ task.minimum_experience }} years</p>
            <!-- <p v-if="expireDate(task.exp_end_date)!='Expired'" class="text-black rounded-md">Closing in {{expireDate(task.exp_end_date)}} days</p>
            <p v-if="expireDate(task.exp_end_date)=='Expired'" class="text-black rounded-md">{{expireDate(task.exp_end_date)}}</p> -->
          </div>
          <p class="flex flex-row text-xs text-gray-800 pt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis itaque vel maiores, modi culpa molestiae provident quos inventore beatae
          </p>
          <div class="flex flex-wrap text-[10px] text-[#001d4e] mt-4 gap-3 font-semibold">
            <div v-if="task.accommodation!='Included in Salary'" class="flex shadow-sm gap-1 bg-blue-200 py-1 px-2 rounded-md ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#001d4e" class="h-5 w-3.5" viewBox="0 0 576 512"><path d="M560 64c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16H16C7.2 0 0 7.2 0 16v32c0 8.8 7.2 16 16 16h16v384H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h240v-80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v80h240c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-16V64h16zm-304 44.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm0 96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm-128-96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zM179.2 256h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8zM192 384c0-53 43-96 96-96s96 43 96 96H192zm256-140.8c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-96c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4z"/></svg>
              <p class="mt-0.5 font-semibold">Accommodation</p>
            </div>
            <div v-if="task.food!='Included in Salary'" class="flex gap-1 shadow-sm bg-blue-200 py-1 px-2 rounded-md transition-full">
              <svg xmlns="http://www.w3.org/2000/svg"  class="h-5 w-3" fill="#001d4e" viewBox="0 0 448 512"><path d="M416 0C400 0 288 32 288 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 0-112 0-208c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7L80 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16l0 134.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8L64 16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"/></svg>
              <p class="mt-0.5">Food</p>
            </div>
            <div v-if="task.transportation!='Included in Salary'" class="flex gap-1 shadow-sm bg-blue-200 py-1 px-2 rounded-md transition-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-3" fill="#001d4e" viewBox="0 0 448 512"><path d="M224 0C348.8 0 448 35.2 448 80l0 16 0 320c0 17.7-14.3 32-32 32l0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32-192 0 0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32L0 96 0 80C0 35.2 99.2 0 224 0zM64 128l0 128c0 17.7 14.3 32 32 32l256 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L96 96c-17.7 0-32 14.3-32 32zM80 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>
              <p class="mt-0.5">Transportation</p>
            </div>
            <div v-if="task.over_time=='Applicable'" class="flex gap-1 shadow-sm bg-blue-200 py-1 px-2 rounded-md transition-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-3" fill="#001d4e" viewBox="0 0 512 512"><path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9L0 168c0 13.3 10.7 24 24 24l110.1 0c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24l0 104c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65 0-94.1c0-13.3-10.7-24-24-24z"/></svg>
              <p class="mt-0.5">OT</p>
            </div>
           </div>
            <div v-if="iClick && task.name == findTask" class="flex mt-1">
              <p v-if="task.salary_type != 'Confidential'" class="pt-1"><span class="text-[10px] text-blue-600 font-bold">INR</span> <span class="text-blue-600 text-xs font-bold">{{ conAmt }}</span><span class="text-xs text-gray-600 font-semibold">/month</span></p>
            </div>
          <div class="flex flex-wrap mb-4" :class="iClick ? 'mt-0' : 'mt-6'">
            <p v-if="task.salary_type != 'Confidential'" class="pt-1"><span class="text-xs text-blue-600 font-bold">{{ task.currency }}</span> <span class="text-blue-600 text-md font-semibold">{{ task.amount }}</span><span class="text-sm text-gray-600 font-semibold">/month</span></p>
            <p v-if="task.salary_type == 'Confidential'" class="text-sm text-gray-600 pt-2 font-semibold">*Confidential</p>
            <img src="https://i.postimg.cc/SxqXPySH/info.png" class="ml-1.5 w-4 h-4 mt-2.5 opacity-50 cursor-pointer hover:opacity-100" @click="handleConversion(task)">
            <button @click="handleApply(task.name)" class="text-blue-700 hover:text-blue-800 border border-blue-700 hover:border-blue-700 hover:shadow-sm font-medium hover:font-semibold rounded-md text-[12px] px-2 py-1 text-center ml-auto transition-full">
              <p>Job Details</p>
            </button>
            <button v-if="!applied || task.name != appliedTask" @click="applyJobs(task.name, task.subject, task.custom_recruiter_contact, candidateId)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[12px] px-2 py-1 text-center ml-2">
              <p>Apply Now</p>
            </button>
            <button v-if="applied && task.name == appliedTask" class="text-white bg-blue-400 cursor-not-allowed hover:bg-blue-400 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[12px] px-2 py-1 text-center ml-2">
              <p>Applied</p>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Apply Resume if no results found -->
    <div v-if="filteredTaskCount == 0 && searchQuery" class="w-10/12 mx-auto text-center mt-[-50px] font-sans">
      <h1 class="text-[25px] font-semibold text-[#05264e]">Oops no jobs found <br> But you can connect with <span class="md:text-blue-700 text-bold">recruiters </span>by uploading your <span class="md:text-blue-700 text-bold">resume</span></h1>
      <div class="border border-gray-500 border-dashed rounded-xl mt-10">
        <div class="flex justify-center py-8 gap-3">
          <div class="upload-btn-wrapper">
          <p v-if="!changeUpload && !cv" class="font-medium text-[#05264e]">Already have a resume ? <span><button v-if="!changeUpload && !cv" class="text-md font-medium text-[#265df5]">Upload</button></span></p>
          <p v-if="changeUpload || cv" class="font-medium text-[#05264e]">Need to re-upload your resume ? <span><button v-if="changeUpload || cv" class="text-md font-medium text-[#265df5]">Change</button></span></p>
              <input 
                v-bind:type="'file'" 
                v-bind:name="'myfile'" 
                ref="file" 
                @change="handleFileUpload()"/>
          </div>
        </div>
    </div>
    </div>
  </div>
  <div v-if="loading" class="text-center loading-overlay">
    <p><span class="loader"></span></p> 
  </div>
  <div v-if="needToApplyResume" class="fixed inset-0 bg-black bg-opacity-[0.5] flex justify-center items-center z-30">
    
    <div class="bg-white p-6 rounded-md border-0 shadow-xl w-[300px]">
      <button @click="needToApplyResume=false" class="close-button h-5 w-5 ml-[90%]">
        <img src="https://i.postimg.cc/dVQFYNh9/close.png" alt="close" class="mt-[-10px]"/>
      </button>
      <div class="upload-btn-wrapper flex justify-center">
        <div class="border border-[#489eef] flex rounded-md px-4 py-1 bg-[#e9f3fd] gap-2 w-[100%]">
                                <div class="h-5 w-4.5"><img src="https://i.postimg.cc/wMkqc8sf/download-8-removebg-preview.png" width="100px" /></div>
                                <p class="pl-2 text-md text-[#3997ee] font-medium">Upload Resume</p>
                            </div>
              <input 
                v-bind:type="'file'" 
                v-bind:name="'myfile'" 
                ref="file" 
                @change="handleFileUpload()"/>
          </div>
      <center class="my-1">or</center>
      <button @click="applyViaWhatsapp(task_name, task_subject, task_contact)" class="cursor-pointer border border-[#5cc0a1] flex rounded-md px-4 py-1 bg-[#e9f7f3] gap-2 w-[100%]">
        <div class="h-6 w-6"><img src="https://i.postimg.cc/Ss6G0dg8/whatsapp.png" width="100px" /></div>
        <p class="pl-2.5 text-md text-gray-600 font-medium">Apply Via WhatsApp</p>
      </button>
      </div>
  </div>
</template>

<script>
import apiService from '../services/apiService.js';
import { formatDistanceToNow } from 'date-fns';
import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
import axios from 'axios';
import { inject } from 'vue';

export default {
  data() {
    return {
      taskDetails: [],
      serviceFilter: ['REC-I', 'REC-D'],
      vacFilter: 0, // not equals
      statusFilter: ['Open', 'Working', 'Overdue', 'Pending Review'],
      searchQuery: '',
      showSuggestions: false,
      selectedOptionCategory: this.$route.query.category || '', // To store the selected option value
      optionsCategory: [],
      selectedOptionLocation: '', 
      optionsLocation: [],
      loading: false,
      id: '',
      flagImg: '',
      iClick: false,
      conAmt: '',
      findTask: '',
      needToApplyResume: false,
      profileMail: null,
      task_name: '',
      candidate_name: '',
      task_subject: '',
      task_contact: '',
      applied: false,
      appliedTask: ''
    };
  },
  setup() {
          const profileMail = inject('profileMail');
            return {
              profileMail,
            };
        },
  computed: {
    filteredTasks() {
      return this.taskDetails.filter(task => {
        const serviceMatch = this.serviceFilter.includes(task.service);
        const vacMatch = task.vac !== this.vacFilter;
        const statusMatch = this.statusFilter.includes(task.status);
        const searchMatch = task.subject.toLowerCase().includes(this.searchQuery.toLowerCase());
        const CategoryMatch = !this.selectedOptionCategory || task.custom_job_category === this.selectedOptionCategory;
        const locationMatch = !this.selectedOptionLocation || task.territory === this.selectedOptionLocation;
        
        return serviceMatch && vacMatch && statusMatch && searchMatch && CategoryMatch && locationMatch;
      });
    },
    filteredTaskCount() {
      return this.filteredTasks.length;
    }
  },
  mounted() {
    this.fetchTasks();
    this.candidateDetails();
    this.addIntersectionObserver();
    if (window.innerWidth === 1296 && window.innerHeight === 654) {
      document.body.style.zoom = "80%";
    }
  },
  methods: {
    async fetchTasks() {
      const filters = {
        serviceFilter: this.serviceFilter,
        vacFilter: this.vacFilter,
        statusFilter: this.statusFilter,
      };
      this.taskDetails = await apiService.fetchData(filters);
      // this.fetchTerritoryData();
      this.showCategoryOptions()
      this.showLocationOptions()
    },
    async candidateDetails() {
                try {
                    if (this.profileMail && this.profileMail.emailId) {
                        const response = await apiService.getCandidateDetails(this.profileMail.emailId);
                        this.candidateId = response.data.message.name;

                    } else {
                        console.error("No email provided in profileMail.");
                    }
                } catch (error) {
                    console.error("Failed to fetch candidate details:", error);
                }
            },
    showCategoryOptions() {
      const jobCategorySet = new Set();
      this.taskDetails.forEach(task => {
        if (task.custom_job_category) {
          jobCategorySet.add(task.custom_job_category); 
        }
      });
      this.optionsCategory = Array.from(jobCategorySet);
    },
    
    showLocationOptions() {
      const jobTerritorySet = new Set();
      this.taskDetails.forEach(task => {
        if (task.territory) {
          jobTerritorySet.add(task.territory);
        }
      });
      this.optionsLocation = Array.from(jobTerritorySet);
    },
    getData() {
      console.log('Category selected:', this.selectedOptionCategory);
      console.log('Location selected:', this.selectedOptionLocation);
    },
    addIntersectionObserver() {
      const fadeSections = document.querySelectorAll('.fade-section');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.onVisibilityChange(entry.isIntersecting, entry);
        });
      }, {
        threshold: 0.1 
      });

      fadeSections.forEach(section => observer.observe(section));
    },
    onVisibilityChange(isVisible, entry) {
      if (isVisible) {
        entry.target.classList.add('fade-in');
      } else {
        entry.target.classList.remove('fade-in');
      }
    },
    handleApply(taskName) {
      this.$router.push(`/job-details/${taskName}`);
    },
    timeAgo(date) {
      let timeAgo =  formatDistanceToNow(new Date(date), {addSuffix: true});
      timeAgo = timeAgo.replace(/^about\s/, '');
      return timeAgo
    },
    async handleConversion(task) {
      this.iClick = !this.iClick;
      
      if (this.iClick) {
        this.findTask = task.name
        const response = await apiService.convertToINR(task.currency, task.amount);
        this.conAmt = response.data.message;
      }
    },
    expireDate(expirationDate) {
      const now = new Date();
      const targetDate = new Date(expirationDate);
      if (targetDate > now) {
        const days = differenceInDays(targetDate, now)
        if (days) {
          return `${days}`;
        }
        else {
          return "Expired";
        }
      }
      else {
        return "Expired";
      }
    },
    newlyPosted(postedDate) {
      const today = new Date(); // Current date
      const twoDaysAgo = new Date(); // Clone the current date
      twoDaysAgo.setDate(today.getDate() - 4); // Subtract 2 days from the current date

      const createdDate = new Date(postedDate); // Convert postedDate to Date object

      // Check if createdDate is between twoDaysAgo and today (inclusive)
      if (createdDate >= twoDaysAgo && createdDate <= today) {
        // console.log(createdDate)
        return true
      }
              else {
                return false
              }
    },
    applyViaWhatsapp(taskName, taskSubject, taskContact) {
      const message = `Hello, I am interested in applying for the position of ${taskSubject} with the reference number ${taskName}.`;
      const recruiterContact = taskContact || '7305428777';
      const encodedMessage = encodeURIComponent(message);
      window.location.href = `https://wa.me/${recruiterContact}?text=${encodedMessage}`;
    },
    async applyJobs(task, subject, contact, candidate) {
      this.loading = true;
      const response = await apiService.applyJobs(task, candidate);
      if (response) {
        this.loading = false;
        if (response.data.message == 'false') {
          this.needToApplyResume = true;
          this.task_name = task;
          this.task_subject = subject;
          this.task_contact = contact;
          this.candidate_name = candidate;
        }
        if (response.data.message == 'true') {
          this.applied = true;
          this.appliedTask = task;
        }
      }
    },
    handleFileUpload() {
        const files = this.$refs.file.files[0];
        if (files) {
            this.loading = true;
            this.uploadResume(files);
        } else {
            console.error('No files selected');
            this.loading = false;
        }
    },

async uploadResume(file) {
    this.loading = true;
    if (!file) {
        console.error('File is undefined');
        return;
    }

    const fd = new FormData();
    fd.append('file', file);
    fd.append('file_name', file.name); 
    
    try {
        const response = await axios.post('https://erp.teamproit.com/api/method/upload_file', fd, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Expect': ''
            }
        });
        this.loading = false;
        const fileUrl = response.data.message.file_url
        if (fileUrl) {
            const response = await apiService.updateResume(fileUrl, this.candidateId);
            if (response && response.status == 200) {
                this.changeUpload = true;
                window.location.reload();
            }
            else {
              console.log("Hellloooooo")
            }
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        this.loading = false;
    }
},
  }
};
</script>

<style scoped>
.fade-section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1s ease-out, transform 1s ease-out;
}

.fade-in {
    opacity: 1;
    transform: translateY(0);
}
.job-card {
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  background-color: rgb(248, 250, 252);
  position: relative;
  border: 1px solid skyblue;
}

.job-card:hover {
  background-color: white;
  transform: scale(1.05);
}
.search-banner {
  height: 270px;
  background-color: #f2f6fd;
} 
.search-bar {
    font-size: 15px;
    border: hidden;
    padding: 1px;
    width: 210px;
    border: 0px solid;
    height: 35px;
    margin-top: 7px;
    padding-left: 8px;
    font-weight: 500;
}
.options-bar {
    font-size: o.7rem;
    border: hidden;
    padding: 1px;
    width: 100px;
    border: 0px solid;
    height: 35px;
    margin-top: -5px;
    padding-left: 8px;
}
.text-custom {
  color: gray;
}
.expires-soon {
  position: absolute;
  width: 90px;
  right: -11px;
  top: -10px;
  transition: transform 0.3s ease-in-out;
}
.new-post {
  position: absolute;
  width: 100px;
  right: 10px;
  top: -14px;
  transition: transform 0.3s ease-in-out;
}

.job-card:hover .expires-soon {
  transform: scale(1.05);
}
.job-card:hover .new-post {
  transform: scale(1.05);
}
.expires-soon-text {
  color: white;
  font-size: 0.6rem;
  position: absolute;
  top: 21px;
  right: 0.5px;
}
.new-post-text {
  color: white;
  font-size: 0.65rem;
  position: absolute;
  top: 16px;
  right: 28px;
}

.filter-box {
  height: 80px;
}
.image-size {
  height: 25px;
  width: 25px;
}
.loader {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid #0070cc;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
.loading-overlay {
    position: fixed; 
    top: 0;
    left: 0; 
    width: 100%; 
    height: 100%; 
    background-color: rgba(255, 255, 255, 0.8); 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    z-index: 10; 
}
.upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
@media (max-width: 575.98px) {
  .keyclass{
    width:100px;
  }
  .mob-view{
    width:5px;
    height:80px;
  } 
 
 }
 .close-button {
  position: relative;
  top: 0px
 }
</style>
