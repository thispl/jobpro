<!-- <template>
    <div>
      <Home_user  v-show="showNav" />
      <Home_banner />
      <Candidate_review />
      <Home_category />
      <Home_jobs />
      <Home_job_banner />
    </div>
</template> -->

<!-- <script setup>
  import { ref } from 'vue'
  import Home_user from "../Home_user.vue"
  import Home_banner from "../Home_banner.vue"
  import Candidate_review from "../candidate_review.vue"
  import Home_category from "../Home_category.vue"
  import Home_jobs from "../Home_jobs.vue"
  import Home_job_banner from "../Home_job_banner.vue"
  const showNav = ref(false)

</script> -->

<template>
  <!-- HOME BANNER -->
  <div>
      <div class="rounded-lg shadow-lg shadow-gray-600 mx-6 mt-7 bg-white ">
          <div class="grid grid-cols-1 md:grid-cols-5 text-center">
              <div class="round-div col-span-3 self-center px-5 md:px-20 text-left text-2xl md:text-[#6c757d]xl font-sans lg-scr fade-section">
                  <h1 class="font-bold whitespace-nowrap dark:text-gray-900 text-banner leading-28 mobile-view pt-5 md:pt-0">
                      The <span class="text-blue-700 bg-wave">Easiest Way</span><br />to Get Your New Job
                  </h1>
                  <p class="text-sm font-semibold text-gray-600 mt-8 px-1 leading-6">
                      Each month, more than 3 million job seekers turn to
                      our website in their search for work, making over 140,000
                      applications every single day
                  </p>

                  <!-- Search Form -->
                  <div class="flex flex-row mt-14 bg-white rounded-lg shadow-lg shadow-gray-600 border border-blue-500 pl-3 h-20 justify-center " style="width: 100%;">
                      <form @submit.prevent="scrollDown()" class="mr-3 py-3 mt-1 flex gap-3 zoom-out">
                          <div class="flex flex-row px-3 pt-2 hidden lg:flex ">
                              <svg class="mt-2 h-4 w-4 text-slate-400" fill="none" viewBox="4 0 24 19" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              <select v-model="selectedOptionCategory" id="optionsCategory" :class="{'text-custom': selectedOptionCategory === ''}" class="rounded-sm border-1 text-sm pl-3 options-bar">
                                  <option value="" class="text-custom ">Job Role</option>
                                  <option v-for="option in optionsCategory" :key="option" :value="option">
                                      {{ option }}
                                  </option>
                              </select>
                              <p class="text-sm px-2 pt-2  text-slate-600">|</p>
                          </div>
                          <div class="flex flex-row pt-2 hidden lg:flex ">
                              <svg class="mt-2 h-4 w-4 text-slate-400" fill="none" viewBox="2 0 24 20" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <select v-model="selectedOptionLocation" id="optionsLocation" :class="{'text-custom': selectedOptionLocation === ''}" class="rounded-sm border-1 text-sm pl-3 options-bar">
                                  <option value="" class="text-custom">Location</option>
                                  <option v-for="option in optionsLocation" :key="option" :value="option">
                                      {{ option }}
                                  </option>
                              </select>
                              <p class="text-sm px-2 pt-2  text-slate-600">|</p>
                          </div>
                          <div class="flex flex-row pl-3 mt-3">
                              <svg class="h-4 w-4 text-slate-400 mt-1" viewBox="2 0 24 18" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z" />
                                  <circle cx="5" cy="5" r="1" />
                                  <circle cx="12" cy="5" r="1" />
                                  <circle cx="19" cy="5" r="1" />
                                  <circle cx="5" cy="12" r="1" />
                                  <circle cx="12" cy="12" r="1" />
                                  <circle cx="19" cy="12" r="1" />
                                  <circle cx="5" cy="19" r="1" />
                                  <circle cx="12" cy="19" r="1" />
                                  <circle cx="19" cy="19" r="1" />
                              </svg>
                          </div>
                          <input v-model="searchQuery" type="text" class="content-search-box rounded-sm search-bar md:ml-3 font-sans keyclass" placeholder="Keywords" name="search-query" />
                          <button type="submit" class="mt-1  h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600 transition-transform flex flex-row">
                              <div class="search-icon">
                                  <svg class="h-6 w-4 text-white" viewBox="0 0 24 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                      <circle cx="11" cy="11" r="8" />
                                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                  </svg>
                              </div>
                              <p class="pl-2 pt-1.5">Search</p>
                          </button>
                      </form>
                  </div>
              </div>
              <div class="col-span-2 fade-section">
                  <img src="https://i.ibb.co/3mR9Jz0j/People-turn-to-astrology-during-appraisal-season-queries-surged-by-50-60-per-cent-Data.jpg" class="my-10 hidden md:flex w-[90%] shadow-xl rounded-xl" />
              </div>
              <div class=""></div>
          </div>
      </div>

      <div v-if="loading" class="text-center loading-overlay">
          <p><span class="loader"></span></p>
      </div>
  </div>
  <!-- Block : We are hiring -->
  <div class="my-16 mx-10 fade-section we-class">
    <div class="border border-slate-200 bg-white rounded-md md:mx-7 shadow-md block md:flex text-center justify-center md:gap-32 py-5 we-class1">
      <div>
        <img src="https://i.postimg.cc/pdRxWWS9/Screenshot-2024-10-08-114815.png" width=120px class="hidden md:flex" />
      </div>
      <div class="md:flex gap-24 mt-5 we-class2">
        <div>
          <p class="text-[#6c757d] text-[20px] font-bold">WE ARE</p>
          <h1 class="font-bold text-[35px] text-[#05264e] font-sans">HIRING</h1>
        </div>
        <div class="text-[#6c757d] text-[20px] text-gray-600 font-bold we-class5">
          <p>Let's <span class="text-[#05264e] font-bold text-[25px] we-class6">Work</span> Together</p>
          <p>& <span class="text-[#05264e] font-bold text-[25px] we-class7">Explore</span> Opportunities</p>
        </div>
        <div class="py-4 mt-2 mx-auto" style="width: 150px">
          <router-link to="/find-a-job" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600 transition-transform flex flex-row">
            <p class="text-[15px]">Explore Jobs</p>
          </router-link>
        </div>
      </div>
      <div>
        <img src="https://i.postimg.cc/TwPKPqsW/Screenshot-2024-10-08-115422.png" width=180px class=" hidden md:flex" />
      </div>
    </div>
  </div>
  <!-- Job Listings -->
  <div>
      <div class="">
          <div class="flex">
              <div v-if="filteredTaskCount > 0" class="grid md:grid-cols-2 xl:grid-cols-3 ml-[20px] mt-10 gap-y-7 gap-x-0 w-[75%] ml-auto font-sans">
                  <div v-for="task in paginatedTasks" :key="task.name">
                      <div class="border rounded-md hover:bg-white transition-colors px-5 shadow-lg shadow-gray-600 job-card relative pt-2 scroll-smooth">
                          <div v-if="expireDate(task.exp_end_date) < 12 && newlyPosted(task.created_on)==false" class="expires-soon">
                              <img src="https://i.postimg.cc/vZQrChGv/Red-Corner-Label-4-PNG-SVG-Design-For-T-Shirts-removebg-preview.png" class="z-10">
                              <p class="rotate-45 z-20 expires-soon-text font-semibold">Expires Soon</p>
                          </div>
                          <div v-if="newlyPosted(task.created_on)==true" class="new-post">
                              <img src="https://i.postimg.cc/NF6t87zy/Conception-de-banni-re-verte-sur-fond-blanc-Vecteur-Gratuite-removebg-preview.png" class="z-10">
                              <p class="z-20 new-post-text font-semibold">New Post</p>
                          </div>
                          <div class="flex">
                              <h1 class="pt-3 text-md font-sans text-gray-900 font-bold min-h-16 capitalize" style="color: #05264e;">{{ task.subject }}</h1>
                          </div>
                          <div class="flex">
                              <img v-if="task.custom_country_flag" :src="task.custom_country_flag" :alt="flag-task.name" class="image-size mr-2" />
                              <h2 class="text-sm font-sans text-[#001d4e] font-semibold pb-2 uppercase">{{ task.territory }}</h2>
                          </div>
                          <div class="flex flex-row text-[11px] text-[#001d4e] gap-3 pt-2 font-semibold">
                              <p>Fulltime</p>
                              <p>{{ timeAgo(task.creation) }}</p>
                              <p class=" rounded-md">Exp: {{ task.minimum_experience }} years</p>
                          </div>
                          <p class="flex flex-row text-xs text-gray-800 pt-4" style="min-height:55px;">
                              {{ task.custom_major_key_skills }}
                          </p>
                          <div class="flex flex-wrap text-[10px] text-[#001d4e] mt-4 gap-3 font-semibold">
                              <div v-if="task.accommodation!='Included in Salary'" class="flex shadow-sm gap-1 bg-blue-200 py-1 px-2 rounded-md ">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="#001d4e" class="h-5 w-3.5" viewBox="0 0 576 512">
                                      <path d="M560 64c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16H16C7.2 0 0 7.2 0 16v32c0 8.8 7.2 16 16 16h16v384H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h240v-80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v80h240c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-16V64h16zm-304 44.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm0 96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm-128-96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zM179.2 256h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8zM192 384c0-53 43-96 96-96s96 43 96 96H192zm256-140.8c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-96c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4z" />
                                  </svg>
                                  <p class="mt-0.5 font-semibold">Accommodation</p>
                              </div>
                              <div v-if="task.food!='Included in Salary'" class="flex gap-1 shadow-sm bg-blue-200 py-1 px-2 rounded-md transition-full">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-3" fill="#001d4e" viewBox="0 0 448 512">
                                      <path d="M416 0C400 0 288 32 288 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 0-112 0-208c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7L80 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16l0 134.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8L64 16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z" />
                                  </svg>
                                  <p class="mt-0.5">Food</p>
                              </div>
                              <div v-if="task.transportation!='Included in Salary'" class="flex gap-1 shadow-sm bg-blue-200 py-1 px-2 rounded-md transition-full">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-3" fill="#001d4e" viewBox="0 0 448 512">
                                      <path d="M224 0C348.8 0 448 35.2 448 80l0 16 0 320c0 17.7-14.3 32-32 32l0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32-192 0 0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32L0 96 0 80C0 35.2 99.2 0 224 0zM64 128l0 128c0 17.7 14.3 32 32 32l256 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L96 96c-17.7 0-32 14.3-32 32zM80 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                                  </svg>
                                  <p class="mt-0.5">Transportation</p>
                              </div>
                              <div v-if="task.over_time=='Applicable'" class="flex gap-1 shadow-sm bg-blue-200 py-1 px-2 rounded-md transition-full">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-3" fill="#001d4e" viewBox="0 0 512 512">
                                      <path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9L0 168c0 13.3 10.7 24 24 24l110.1 0c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24l0 104c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65 0-94.1c0-13.3-10.7-24-24-24z" />
                                  </svg>
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
              <div v-if="filteredTaskCount == 0" class="w-7/12 mx-auto mt-28 text-center font-sans">
                  <h1 class="text-[20px] font-semibold text-[#05264e]">Oops no jobs found <br> But you can connect with <span class="md:text-blue-700 text-bold">recruiters </span>by uploading your <span class="md:text-blue-700 text-bold">resume</span></h1>
                  <div class="border border-gray-500 bg-white border-dashed rounded-xl mt-10">
                      <div class="flex justify-center py-8 gap-3">
                          <div class="upload-btn-wrapper">
                              <p v-if="!changeUpload && !cv" class="font-medium text-[#05264e]">Already have a resume ? <span><button v-if="!changeUpload && !cv" class="text-md font-medium text-[#265df5]">Upload</button></span></p>
                              <p v-if="changeUpload || cv" class="font-medium text-[#05264e]">Need to re-upload your resume ? <span><button v-if="changeUpload || cv" class="text-md font-medium text-[#265df5]">Change</button></span></p>
                              <input v-bind:type="'file'" v-bind:name="'myfile'" ref="file" @change="handleFileUpload()" />
                          </div>
                      </div>
                  </div>
              </div>
              <!-- Filter Section -->
              <div class="mr-9 mt-10 sticky top-[90px] bg-white border rounded-md p-5 shadow-lg shadow-gray-600 register-class" :class="{'mr-[25px]': filteredTaskCount == 0}" style="max-height: 700px; width: 310px;">
                  <h1 class="font-bold whitespace-nowrap mt-4 dark:text-gray-900 text-[#05264e]xl text-center">
                      <span class="md:text-blue-700">{{ filteredTaskCount }} Jobs</span> Available Now
                  </h1>
                  <!-- Position Filters -->
                  <div class="mt-6">
                      <h1 class="font-bold text-md" style="color: #05264e;">Job Category & Position</h1>
                      <div class="flex flex-wrap justify-start mt-1">
                          <div v-for="position in positions" :key="position" @click="toggleSelection(position)" class="position-card category-card" :class="{'selected': selectedPositions.includes(position)}">
                              <p class="px-3 py-2 text-xs font-bold">{{ position }}</p>
                          </div>
                      </div>
                  </div>
                  <!-- Job Name Filters -->
                  <div class="mt-3 relative">
                        <input type="text" placeholder="Select Position" v-model="jobname" @input="filterJobnames" @focus="showAllJobnames" @blur="hideJobnameSuggestionsWithDelay" class="mb-1 border-gray-400 rounded-lg text-sm p-2.5 w-full mt-1 font-semibold" style="color: #0049f4;" />

                        <!-- Suggestions List -->
                        <ul v-show="showJobnameSuggestions && filteredJobnames.length" class="absolute bg-white border w-full rounded shadow-lg shadow-gray-600 max-h-60 overflow-y-auto scroll-smooth">
                            <li v-for="jobname in filteredJobnames" :key="jobname" @mousedown.prevent="selectJobname(jobname)" class="p-2 text-xs text-[#001647] font-semibold cursor-pointer hover:bg-gray-200">
                                {{ jobname }}
                            </li>
                        </ul>
                    </div>
                  <!-- Location Filters -->
                  <div>
                      <h1 class="font-bold text-md mt-3" style="color: #05264e;">Work Location</h1>
                      <div class="flex flex-wrap justify-start mt-1">
                          <div v-for="option in optionsLocation" :key="option" @click="selectLocation(option)" class="flex border mt-1 w-auto rounded-md items-center category-card mr-1" :class="{'selected-location text-[#0062d3]': selectedOptionLocation === option}">
                              <p class="px-3 py-2 text-xs font-bold" :class="selectedOptionLocation === option ? 'text-[#0062d3]' : 'text-custom'">
                                  {{ option }}
                              </p>
                          </div>
                      </div>
                  </div>
                  <!-- Salary Filters -->
                  <div>
                      <h1 class="font-bold text-md mt-3 mb-2" style="color: #05264e;">Salary Type</h1>
                      <select v-model="selectedOptionSalaryType" @change="filterScroll" id="optionsSalaryType" :class="{'text-custom': selectedOptionSalaryType === ''}" class="rounded-md border-1 font-bold text-xs pl-3 salary-bar">
                          <option value="" class="text-custom">Salary Type</option>
                          <option v-for="option in optionsSalaryType" :key="option" :value="option">
                              {{ option }}
                          </option>
                      </select>
                      <div class="flex gap-3 mt-2">
                          <select v-model="selectedOptionCurrency" @change="filterScroll" id="optionsCurrency" :class="{'text-custom': selectedOptionCurrency === ''}" class="rounded-md border-1 font-bold text-xs pl-3 currency-bar">
                              <option value="" class="text-custom">Currency</option>
                              <option v-for="option in optionsCurrency" :key="option" :value="option">
                                  {{ option }}
                              </option>
                          </select>
                          <input type="text" @input="filterScroll" v-model="amountQuery" name="full_name" placeholder="3000 / month" class="border border-[#d1d5db;] text-[#0062d3] font-bold rounded-lg text-xs w-2/4 mb-3" required /><br />
                      </div>
                  </div>
                  <!-- Qualification Filters -->
                  <div>
                      <h1 class="font-bold text-md mt-1 mb-2" style="color: #05264e;">Qualification</h1>
                      <select v-model="selectedOptionQualification" @change="filterScroll" id="optionsQualification" :class="{'text-custom': selectedOptionQualification === ''}" class="rounded-md border-1 font-bold text-xs pl-3 qualification-bar">
                          <option value="" class="text-custom">Select Qualification</option>
                          <option v-for="option in optionsQualification" :key="option" :value="option">
                              {{ option }}
                          </option>
                      </select>
                  </div>

                  <!-- Pagination Buttons -->
                  <div v-if="filteredTaskCount > 0" class="flex justify-center mt-10 z-[40] pb-5 sticky top-[100px]">
                      <button @click="currentPage--, filterScroll()" :disabled="currentPage === 1" class="px-3 py-1 mx-1 bg-blue-500 text-white rounded-md disabled:bg-gray-300">
                          Previous
                      </button>

                      <span class="px-4 py-1">{{ currentPage }} / {{ totalPages }}</span>

                      <button @click="currentPage++, filterScroll()" :disabled="currentPage >= totalPages" class="px-7 py-1 mx-1 bg-blue-500 text-white rounded-md disabled:bg-gray-300">
                          Next
                      </button>
                  </div>
              </div>
          </div>
      </div>
  </div>


</template>

<script>
  import apiService from '../services/apiService.js';
  import axios from 'axios';
  import {
      inject
  } from 'vue';
  import {
      formatDistanceToNow
  } from 'date-fns';
  import {
      differenceInDays
  } from 'date-fns';
  import {
      eventBus
  } from '../services/eventBus.js';

  export default {
      data() {
          return {
              positions: ["Engineer", "Manager", "Technician", "Plumber", "Supervisor", "Driver"],
              taskDetails: [],
              serviceFilter: ['REC-I', 'REC-D'],
              vacFilter: 0, // not equals
              statusFilter: ['Open', 'Working', 'Overdue', 'Pending Review'],
              searchQuery: '',
              amountQuery: '',
              query: '',
              selectedOptionCategory: this.$route.query.category || '', // To store the selected option value
              optionsCategory: [],
              selectedOptionLocation: '',
              selectedOptionCurrency: '',
              selectedOptionSalaryType: '',
              selectedOptionQualification: '',
              optionsLocation: [],
              optionsCurrency: [],
              optionsQualification: [],
              optionsSalaryType: [],
              loading: false,
              iClick: false,
              findTask: '',
              conAmt: '',
              currentPage: 1,
              pageSize: 12,
              selectedPositions: [],
              jobname: '',
              jobnames: [],
                filteredJobnames: [],
                showJobnameSuggestions: false,
          };
      },
      setup() {
          const candidateId = inject('candidateId');
          return {
              candidateId,
          };
      },
      computed: {
          filteredTasks() {
              this.currentPage = 1;
              return this.taskDetails.filter(task => {
                  const serviceMatch = this.serviceFilter.includes(task.service);
                  const vacMatch = task.vac !== this.vacFilter;
                  const statusMatch = this.statusFilter.includes(task.status);
                  const searchMatch = task.subject.toLowerCase().includes(this.searchQuery.toLowerCase());
                  const amountMatch = this.amountQuery === "" || String(task.amount).includes(this.amountQuery.toLowerCase());
                  const CategoryMatch = !this.selectedOptionCategory || task.custom_job_category === this.selectedOptionCategory;
                  const locationMatch = !this.selectedOptionLocation || task.territory === this.selectedOptionLocation;
                  const currencyMatch = !this.selectedOptionCurrency || task.currency === this.selectedOptionCurrency;
                  const salarytypeMatch = !this.selectedOptionSalaryType || task.salary_type === this.selectedOptionSalaryType;
                  const qualificationMatch = !this.selectedOptionQualification || task.qualification_type === this.selectedOptionQualification;
                  const jobnameMatch = !this.jobname || task.subject === this.jobname;
                  const jobRoleMatch = this.selectedPositions.length === 0 || 
          this.selectedPositions.some(position => task.subject.toLowerCase().includes(position.toLowerCase()));

                  return serviceMatch && vacMatch && statusMatch && searchMatch && CategoryMatch && locationMatch && currencyMatch && salarytypeMatch && qualificationMatch && jobRoleMatch && amountMatch && jobnameMatch;
              });
          },
          paginatedTasks() {
              let start = (this.currentPage - 1) * this.pageSize;
              let end = start + this.pageSize;
              return this.filteredTasks.slice(start, end);
          },
          totalPages() {
              return Math.ceil(this.filteredTasks.length / this.pageSize);
          },
          filteredTaskCount() {
              return this.filteredTasks.length;
          }
      },
      mounted() {
          eventBus.on('run-command', this.executeTask);
          this.fetchTasks();
          this.addIntersectionObserver();
          if (window.innerWidth === 1296 && window.innerHeight === 654) {
              document.body.style.zoom = "80%";
          }
          if (window.innerWidth === 1280 && window.innerHeight === 579) {
              document.body.style.zoom = "80%";
          }
          this.jobnameList()
      },
      beforeMount() {
          eventBus.off('run-command', this.executeTask)
      },
      methods: {
          toggleSelection(position) {
              window.scrollTo({
                  top: 815,
                  behavior: 'smooth'
              });
              const index = this.selectedPositions.indexOf(position);
              if (index === -1) {
                  this.selectedPositions.push(position); // Add if not already selected
              } else {
                  this.selectedPositions.splice(index, 1); // Remove if already selected
              }
          },
          selectLocation(option) {
              window.scrollTo({
                  top: 815,
                  behavior: 'smooth'
              });
              this.selectedOptionLocation = this.selectedOptionLocation === option ? "" : option;
          },
          async handleConversion(task) {
              this.iClick = !this.iClick;

              if (this.iClick) {
                  this.findTask = task.name
                  const response = await apiService.convertToINR(task.currency, task.amount);
                  this.conAmt = response.data.message;
              }
          },
          executeTask(query) {
              console.log('Command received: Executing task...');
              this.searchQuery = query
          },
          watch: {
              filteredTasks() {
                  this.currentPage = 1; // Reset to the first page when filters change
              }
          },
          async fetchTasks() {
              const filters = {
                  serviceFilter: this.serviceFilter,
                  vacFilter: this.vacFilter,
                  statusFilter: this.statusFilter,
              };
              this.taskDetails = await apiService.fetchData(filters);
              this.showCategoryOptions();
              this.showLocationOptions();
              this.showCurrencyOptions();
              this.showSalaryTypeOptions();
              this.showQualificationOptions();
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
          showCurrencyOptions() {
              const jobCurrencySet = new Set();
              this.taskDetails.forEach(task => {
                  if (task.currency) {
                      jobCurrencySet.add(task.currency);
                  }
              });
              this.optionsCurrency = Array.from(jobCurrencySet);
          },
          showQualificationOptions() {
              const jobQualificationSet = new Set();
              this.taskDetails.forEach(task => {
                  if (task.qualification_type) {
                      jobQualificationSet.add(task.qualification_type);
                  }
              });
              this.optionsQualification = Array.from(jobQualificationSet);
          },
          showSalaryTypeOptions() {
              const jobSalaryTypeSet = new Set();
              this.taskDetails.forEach(task => {
                  if (task.salary_type) {
                      jobSalaryTypeSet.add(task.salary_type);
                  }
              });
              this.optionsSalaryType = Array.from(jobSalaryTypeSet);
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
              let timeAgo = formatDistanceToNow(new Date(date), {
                  addSuffix: true
              });
              timeAgo = timeAgo.replace(/^about\s/, '');
              return timeAgo
          },
          expireDate(expirationDate) {
              const now = new Date();
              const targetDate = new Date(expirationDate);
              if (targetDate > now) {
                  const days = differenceInDays(targetDate, now)
                  if (days) {
                      return `${days}`;
                  } else {
                      return "Expired";
                  }
              } else {
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
          scrollDown() {
              if (this.searchQuery.length > 0 || this.selectedOptionLocation || this.selectedOptionCategory) {
                  this.scrollWin();
              }
          },
          filterScroll() {
              window.scrollTo({
                  top: 815,
                  behavior: 'smooth'
              });
          },
          scrollWin() {
              window.scrollTo({
                  top: 815,
                  behavior: 'smooth'
              });
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
                      console.log(this.candidateId.canId)
                      const response = await apiService.updateResume(fileUrl, this.candidateId.canId);
                      if (response && response.status == 200) {
                          this.changeUpload = true;
                          window.location.reload();
                      } else {
                          console.log("File not Updatated")
                      }
                  }
              } catch (error) {
                  console.error('Error uploading file:', error);
                  this.loading = false;
              }
          },
          async jobnameList() {
                try {
                    const response = await apiService.getJobnameList();
                    this.response = response.data.message;
                    if (Array.isArray(this.response)) {
                        this.jobnames = this.response;
                    } else if (typeof this.response === "string") {
                        this.jobnames = this.response.split(",").map(jobname => jobname.trim());
                    }
                    this.filteredJobnames = [...this.jobnames];
                } catch (error) {
                    console.error("Failed to fetch jobnames details:", error);
                }
            },
            hideJobnameSuggestionsWithDelay() {
                setTimeout(() => {
                    this.showJobnameSuggestions = false;
                }, 200);
            },
            filterJobnames() {
                if (this.jobname) {
                    this.filteredJobNames = this.jobnames.filter(jobname =>
                        jobname.toLowerCase().includes(this.jobname.toLowerCase())
                    );
                } else {
                    this.filteredJobnames = [...this.jobnames];
                }
                this.showJobnameSuggestions = true;
            },
            showAllJobnames() {
                this.filteredJobnames = [...this.jobnames];
                this.showJobnameSuggestions = true;
            },
            selectJobname(jobname) {
                this.jobname = jobname;
                this.showJobnameSuggestions = false;
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

  .suggestions {
      list-style-type: none;
      padding: 0;
      margin: 0;
      border: 1px solid whitesmoke;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      max-width: 272px;
      position: absolute;
      background-color: white;
      top: 815px;
      left: 425px;
      max-height: 200px;
      overflow-y: scroll;
  }

  .suggestions li {
      padding: 5px;
      cursor: pointer;
      font-size: 12px;
  }

  .suggestions li:hover {
      background-color: #f0f0f0;
  }

  .search-bar {
      font-size: 15px;
      padding-left: 10px;
      height: 35px;
      margin-top: 7.5px;
      margin-left: 10px;
      width: 230px;
      font-weight: 400
  }

  .text-banner {
      font-size: 2.8rem;
  }

  .bg-wave {
      background-image: url("https://i.postimg.cc/wTSNnF5J/wave-1.png");
      background-size: cover;
  }

  .options-bar {
      font-size: o.7rem;
      border: hidden;
      padding: 1px;
      width: 90px;
      border: 0px solid;
      height: 35px;
      margin-top: 1px;
      padding-left: 8px;
  }

  .text-custom {
      color: gray;
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

  .currency-bar {
      font-size: .7rem;
      padding: 1px;
      width: 90px;
      border: 1px solid #d1d5db;
      height: 32px;
      color: #0062d3;
      padding-left: 8px;
  }

  .salary-bar {
      font-size: .7rem;
      padding: 1px;
      width: 235px;
      border: 1px solid #d1d5db;
      height: 32px;
      color: #0062d3;
      padding-left: 8px;
  }

  .qualification-bar {
      font-size: .7rem;
      padding: 1px;
      width: 235px;
      border: 1px solid #d1d5db;
      height: 32px;
      color: #0062d3;
      padding-left: 8px;
  }

  .text-custom {
      color: gray;
  }

  .filter-box {
      height: 80px;
  }

  .selected-location {
      border: 1px solid #0062d3;
      color: #0062d3;
      background-color: #e6f0ff;
      font-weight: bold;
      transition: all 0.3s ease-in-out;
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

  .job-card {
width: 350px;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  background-color: white;
  position: relative;
}

  .job-card:hover  {
      transform: scale(1.05);
      background-color: white;
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

  .image-size {
      height: 20px;
      width: 20px;
      margin-top: -3px;
  }

  @media (max-width: 575.98px) {
      .mobile-view {
          font-size: 29px;
      }

      .keyclass {
          width: 100px;
      }

      .round-div {
          padding-bottom: 40px;
      }
  }

  @media screen and (min-width: 1280px) and (max-width: 1296px) and (min-height: 579px) and (max-height: 654px) {}

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

  .category-card:hover {
      border-color: #0062d3;
  }

  .category-card:hover h1 {
      color: #0062d3;
  }

  .category-card:hover p {
      color: #0062d3;
  }

  .category-card {
      border: 1px solid #d1d5db;
      transition: border-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  }

  .position-card {
      @apply flex border mt-1 w-auto rounded-md items-center cursor-pointer transition-all duration-300;
      border: 1px solid #d1d5db;
      margin-right: 5px;
      font-size: 0.75rem;
      color: #808080;
      font-weight: bold;
  }

  .selected {
      border: 1px solid #0062d3;
      background-color: #e6f0ff;
      color: #0062d3;
      transition: all 0.3s ease-in-out;
  }
</style>