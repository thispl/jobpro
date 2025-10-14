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
    <div :class="{'opacity-[0.5] blur-sm': showLoginPopup ,showRegisterPopup}">
  <!-- HOME BANNER -->
  <div class="md:hidden" >
      <div class="rounded-lg shadow-lg shadow-gray-600 mx-6 mt-7 bg-white border border-red ">
          <div class="grid grid-cols-1 md:grid-cols-5 text-center">
              <div class="round-div col-span-3 self-center px-5 md:px-20 text-left text-2xl md:text-[#6c757d]xl font-sans lg-scr fade-section">
                  <h1 class="font-bold whitespace-nowrap dark:text-gray-900 text-banner leading-28 mobile-view pt-5 md:pt-0">
                      The <span class="text-blue-700 bg-wave">Easiest Way </span>to<br /> Get Your New Job
                  </h1>
                  <p class="text-sm font-semibold text-gray-600 mt-8 px-1 leading-6">
                      Each month, more than 3 million job seekers turn to
                      our website in their search for work, making over 140,000
                      applications every single day
                  </p>
                  <!-- Search Form -->
                  <div class="hidden md:flex flex-row mt-14 bg-white rounded-lg shadow-lg shadow-gray-600 border border-blue-500 pl-3 h-20 justify-center " style="width: 100%;">
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
                          <input v-model="searchQuery" type="text" class="content-search-box rounded-sm search-bar md:ml-3 font-sans keyclass focus:outline-none" placeholder="Keywords" name="search-query" />
                          <button type="submit" class="mt-1 h-10 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600 transition-transform flex flex-row">
                              <div class="search-icon">
                                  <svg class="h-6 w-4 text-white" viewBox="0 0 24 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                      <circle cx="11" cy="11" r="8" />
                                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                  </svg>
                              </div>
                              <p class="pl-2 pt-1.5">Search</p>
                          </button>
                          <button type="submit" class="mt-1 md:hidden h-10 text-white font-medium rounded-lg text-sm px-4 py-2 text-center transition-transform flex flex-row">
                              <div class="search-icon">
                                  <svg class="h-6 w-6 text-blue-700" viewBox="0 0 24 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                      <circle cx="11" cy="11" r="8" />
                                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                  </svg>
                              </div>
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
  <!-- Search box for mobile -->
   <div class="md:hidden flex sticky top-14 bg-[#efeff5] mx-1 relative mt-4 pt-5 px-5 gap-3 md:gap-2 z-20">
        <div class="flex">
            <input v-model="searchQuery" type="search" class="w-full font-medium rounded-lg pl-12 font-sans border-none shadow-lg shadow-gray-600 focus:outline-none" placeholder="Keywords" name="search-query" />
            <svg class="h-6 w-6 text-[#0070cc] absolute bottom-2 left-8"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">
                <circle cx="11" cy="11" r="8" />  <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        </div>
        <button @click="showPopupFilter = true" class="bg-white px-3 py-1.5 rounded-md border-none shadow-lg shadow-gray-600">
            <svg class="h-7 w-7 text-[#0070cc]"  width="24" height="24" viewBox="0 0 24 24" stroke-width="1.7" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
            <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5.5 5h13a1 1 0 0 1 0.5 1.5L14 12L14 19L10 16L10 12L5 6.5a1 1 0 0 1 0.5 -1.5" />
            </svg>
        </button>
    </div>


  <!-- Block : We are hiring -->
  <div class="my-5 mx-10 fade-section hidden md:block we-class">
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
          <div class="flex flex-col md:flex-row px-8 ">

            <!-- Filter Section -->
             <div class=" sticky top-[90px] hidden md:block ml-10 md:w-1/5  mt-10  " style="max-height: 700px;">


                <div class="   bg-white border rounded-md p-5 shadow-lg shadow-gray-600 register-class " :class="{'mr-[25px]': filteredTaskCount == 0}" style="max-height: 660px;">

            
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

                  
              </div>


                <!-- Pagination Buttons -->
                  <div v-if="filteredTaskCount > 0" class="flex justify-center p-0 mt-5 z-[40] sticky top-[100px] text-gray-600 font-medium  ">
                      <button @click="currentPage--, filterScroll()" :disabled="currentPage === 1" class="px-3 py-1 mx-1 bg-blue-500 text-sm text-white rounded-md disabled:bg-gray-300">
                          Previous
                      </button>

                      <span class="px-4 py-1">{{ currentPage }} / {{ totalPages }}</span>

                      <button @click="currentPage++, filterScroll()" :disabled="currentPage >= totalPages" class="px-7 py-1 mx-1 bg-blue-500 text-sm text-white rounded-md disabled:bg-gray-300">
                          Next
                      </button>
                  </div>

             </div>
              
            <!-- Posts -->
              <!-- <div v-if="filteredTaskCount > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:ml-[15px]  mt-10 gap-y-7 gap-x-0 w-[75%]  md:ml-auto font-sans  ">
                  <div v-for="task in paginatedTasks" :key="task.name" >
                      <div class="border rounded-md hover:bg-white transition-colors px-5 shadow-lg shadow-gray-600 job-card relative pt-2 scroll-smooth ">
                          <div v-if="expireDate(task.exp_end_date) < 12 && newlyPosted(task.created_on)==false" class="expires-soon">
                              <img src="https://i.postimg.cc/vZQrChGv/Red-Corner-Label-4-PNG-SVG-Design-For-T-Shirts-removebg-preview.png" class="z-10">
                              <p class="rotate-45 z-15 expires-soon-text font-semibold">Expires Soon</p>
                          </div>
                          <div v-if="newlyPosted(task.created_on)==true" class="new-post">
                              <img src="https://i.postimg.cc/NF6t87zy/Conception-de-banni-re-verte-sur-fond-blanc-Vecteur-Gratuite-removebg-preview.png" class="z-10">
                              <p class="z-15 new-post-text font-semibold">New Post</p>
                          </div>
                          <div class="flex">
                              <h1 class="pt-3 text-md font-sans text-gray-900 font-bold min-h-16 capitalize " style="color: #05264e;">{{ task.subject }}</h1>
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
                          <p class="flex flex-row text-xs text-gray-800 pt-4  " style="min-height:80px; ">
                              {{ truncateText(task.custom_major_key_skills, 210) }}
                          </p>
                          <div class="flex text-[10px] text-[#001d4e] md:mt-4 gap-3 font-semibold pb-2 overflow-auto small-scrollbar">
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
                              <p v-if="task.salary_type != 'Confidential'" class="pt-1 hidden md:block"><span class="text-xs text-blue-600 font-bold">{{ task.currency }}</span> <span class="text-blue-600 text-md font-semibold">{{ task.amount }}</span><span class="text-sm text-gray-600 font-semibold">/month</span></p>
                              <p v-if="task.salary_type == 'Confidential'" class="text-sm text-gray-600 pt-2 font-semibold">*Confidential</p>
                              <img src="https://i.postimg.cc/SxqXPySH/info.png" class="hidden md:block ml-1.5 w-4 h-4 mt-2.5 opacity-50 cursor-pointer hover:opacity-100" @click="handleConversion(task)">
                              <button @click="handleApply(task.name)" class="text-blue-700 hover:text-blue-800 border border-blue-700 hover:border-blue-700 hover:shadow-sm font-medium hover:font-semibold rounded-md text-[12px] px-2 py-1 text-center ml-auto transition-full">
                                  <p>Job Details</p>
                              </button>
                              
                              <button v-if="!appliedJobs[task.name]"  @click="applyJobs(task.name, task.subject, task.custom_recruiter_contact, id)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[12px] px-2 py-1 text-center ml-2">
                                  <p>Apply Now</p>
                              </button>
                              <button v-else class="text-white bg-blue-400 cursor-not-allowed hover:bg-blue-400 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[12px] px-2 py-1 text-center ml-2">
                                  <p>Applied</p>
                              </button>
                          </div>
                      </div>
                  </div>


                 




                  
                  <div v-if="filteredTaskCount > 0" class="flex md:hidden justify-center mt-5 z-15 sticky top-[100px] text-gray-600 font-medium">
                      <button @click="currentPage--, filterScroll()" :disabled="currentPage === 1" class="px-3 py-1 mx-1 bg-blue-500 text-sm text-white rounded-md disabled:bg-gray-300">
                          Previous
                      </button>

                      <span class="px-4 py-1">{{ currentPage }} / {{ totalPages }}</span>

                      <button @click="currentPage++, filterScroll()" :disabled="currentPage >= totalPages" class="px-7 py-1 mx-1 bg-blue-500 text-sm text-white rounded-md disabled:bg-gray-300">
                          Next
                      </button>
                  </div>
              </div> -->
          


            <!-- Posts -->
              <div v-if="filteredTaskCount > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:ml-[15px]  mt-10 gap-y-7 gap-x-0 w-[75%]  md:ml-auto font-sans  ">
                  <div v-for="(task, index) in paginatedTasks" :key="task.name" class="job-card" >
                    <div class="card-inner">
                      <div class="border rounded-md  transition-colors px-5 shadow-lg shadow-gray-600 card-front relative pt-2 scroll-smooth  ;">
                          <div v-if="expireDate(task.exp_end_date) < 12 && newlyPosted(task.created_on)==false" class="expires-soon">
                              <img src="https://i.postimg.cc/vZQrChGv/Red-Corner-Label-4-PNG-SVG-Design-For-T-Shirts-removebg-preview.png" class="z-10">
                              <p class="rotate-45 z-15 expires-soon-text font-semibold">Expires Soon</p>
                          </div>
                          <div v-if="newlyPosted(task.created_on)==true" class="new-post">
                              <img src="https://i.postimg.cc/NF6t87zy/Conception-de-banni-re-verte-sur-fond-blanc-Vecteur-Gratuite-removebg-preview.png" class="z-10">
                              <p class="z-15 new-post-text font-semibold">New Post</p>
                          </div>
                          <div class="flex">
                              <h1 class="pt-3 text-md font-sans text-gray-900 font-bold min-h-16 capitalize " style="color: #05264e;">{{ task.subject }}</h1>
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


                          <div >
                          <p  class="flex flex-row text-xs text-gray-800 pt-4  " style="min-height:80px; ">
                              {{ truncateText(task.custom_major_key_skills, 210) }}
                          </p>
                          <div class="flex text-[10px] text-[#001d4e] md:mt-4 gap-3 font-semibold pb-2 overflow-auto small-scrollbar">
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
                           </div>


                           <!-- <img 
                                v-else
                                :src="`https://picsum.photos/400/150?random=${index}`" 
                                alt="Job Image"
                                class=" object-cover rounded-md mt-4"
                            /> -->

                            



                          <div v-if="iClick && task.name == findTask" class="flex mt-1">
                              <p v-if="task.salary_type != 'Confidential'" class="pt-1"><span class="text-[10px] text-blue-600 font-bold">INR</span> <span class="text-blue-600 text-xs font-bold">{{ conAmt }}</span><span class="text-xs text-gray-600 font-semibold">/month</span></p>
                          </div>
                          <div class="flex flex-wrap mb-4 mt-6" >
                              <p v-if="task.salary_type != 'Confidential'" class="pt-1 hidden md:block"><span class="text-xs text-blue-600 font-bold">{{ task.currency }}</span> <span class="text-blue-600 text-md font-semibold">{{ task.amount }}</span><span class="text-sm text-gray-600 font-semibold">/month</span></p>
                              <p v-if="task.salary_type == 'Confidential'" class="text-sm text-gray-600 pt-2 font-semibold">*Confidential</p>
                              <img src="https://i.postimg.cc/SxqXPySH/info.png" class="hidden md:block ml-1.5 w-4 h-4 mt-2.5 opacity-50 cursor-pointer hover:opacity-100" @click="handleConversion(task)">
                              <button @click="handleApply(task.name)" class="text-blue-700 hover:text-blue-800 border border-blue-700 hover:border-blue-700 hover:shadow-sm font-medium hover:font-semibold rounded-md text-[12px] px-2 py-1 text-center ml-auto transition-full">
                                  <p>Job Details</p>
                              </button>
                              
                              <button v-if="!appliedJobs[task.name]"  @click="applyJobs(task.name, task.subject, task.custom_recruiter_contact, id)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[12px] px-2 py-1 text-center ml-2">
                                  <p>Apply Now</p>
                              </button>
                              <button v-else class="text-white bg-blue-400 cursor-not-allowed hover:bg-blue-400 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[12px] px-2 py-1 text-center ml-2">
                                  <p>Applied</p>
                              </button>
                          </div>
                      </div>
                      

                      <div class="border rounded-md hover:bg-white transition-colors px-5 shadow-lg shadow-gray-600 card-back  relative  scroll-smooth  ;">
                             
                             <div class="flex  absolute top-[-3px]">
                              <h1 class="pt-3 text-md font-sans text-gray-900 font-bold min-h-10 capitalize" style="color: #05264e;">{{ task.subject }}</h1>
                          </div>
                          <!-- <div class="flex absolute top-[35px]">
                              <img v-if="task.custom_country_flag" :src="task.custom_country_flag" :alt="flag-task.name" class="image-size mr-2" />
                              <h2 class="text-sm font-sans text-[#001d4e] font-semibold pb-2 uppercase">{{ task.territory }}</h2>
                          </div> -->
                             
                          <img v-if="task.custom_customer_location_image" :src="task.custom_customer_location_image" alt="Job Image"class=" object-cover rounded-md mt-10  ">

                          <img v-else :src="`https://picsum.photos/400/300?random=${index}`" alt="Job Image"class=" object-cover rounded-md mt-10  ">
                             

                              <div v-if="iClick && task.name == findTask" class="flex ">
                              <p v-if="task.salary_type != 'Confidential'" class="pt-1"><span class="text-[10px] text-blue-600 font-bold">INR</span> <span class="text-blue-600 text-xs font-bold">{{ conAmt }}</span><span class="text-xs text-gray-600 font-semibold">/month</span></p>
                          </div>
                          <div class="flex flex-wrap mb-4" :class="iClick ? 'mt-0' : 'mt-6'">
                              <p v-if="task.salary_type != 'Confidential'" class="pt-1 hidden md:block"><span class="text-xs text-blue-600 font-bold">{{ task.currency }}</span> <span class="text-blue-600 text-md font-semibold">{{ task.amount }}</span><span class="text-sm text-gray-600 font-semibold">/month</span></p>
                              <p v-if="task.salary_type == 'Confidential'" class="text-sm text-gray-600 pt-2 font-semibold">*Confidential</p>
                              <img src="https://i.postimg.cc/SxqXPySH/info.png" class="hidden md:block ml-1.5 w-4 h-4 mt-2.5 opacity-50 cursor-pointer hover:opacity-100" @click="handleConversion(task)">
                              <button @click="handleApply(task.name)" class="text-blue-700 hover:text-blue-800 border border-blue-700 hover:border-blue-700 hover:shadow-sm font-medium hover:font-semibold rounded-md text-[12px] px-2 py-1 text-center ml-auto transition-full">
                                  <p>Job Details</p>
                              </button>
                              
                              <button v-if="!appliedJobs[task.name]"  @click="applyJobs(task.name, task.subject, task.custom_recruiter_contact, id)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[12px] px-2 py-1 text-center ml-2">
                                  <p>Apply Now</p>
                              </button>
                              <button v-else class="text-white bg-blue-400 cursor-not-allowed hover:bg-blue-400 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[12px] px-2 py-1 text-center ml-2">
                                  <p>Applied</p>
                              </button>
                          </div>



                      </div>

                    </div>  
                  </div>


                 




                  
                  <div v-if="filteredTaskCount > 0" class="flex md:hidden justify-center mt-5 z-15 sticky top-[100px] text-gray-600 font-medium">
                      <button @click="currentPage--, filterScroll()" :disabled="currentPage === 1" class="px-3 py-1 mx-1 bg-blue-500 text-sm text-white rounded-md disabled:bg-gray-300">
                          Previous
                      </button>

                      <span class="px-4 py-1">{{ currentPage }} / {{ totalPages }}</span>

                      <button @click="currentPage++, filterScroll()" :disabled="currentPage >= totalPages" class="px-7 py-1 mx-1 bg-blue-500 text-sm text-white rounded-md disabled:bg-gray-300">
                          Next
                      </button>
                  </div>
              </div>
          
          
          
          
          
          
          
              
              <!-- Apply Resume if no results found -->
              <div v-if="filteredTaskCount == 0" class="w-10/12 md:w-7/12 mx-auto mt-10 md:mt-28 text-center font-sans">
                  <h1 class="text-xl md:text-[20px] font-semibold text-[#05264e]">Oops no jobs found !<br> But you can connect with <span class="md:text-blue-700 text-bold">recruiters </span>by uploading your <span class="md:text-blue-700 text-bold">resume</span></h1>
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
              
          </div>
      </div>

  </div>
    <!-- Overlay -->
    <div
      v-if="showPopupFilter"
      class="fixed inset-0 bg-black bg-opacity-40 z-40"
      @click.self="showPopupFilter = false"
    ></div>

    <transition name="slide-up">
      <div
        v-if="showPopupFilter"
        class="fixed bottom-0 left-0 right-0 bg-white p-6 shadow-lg rounded-t-2xl z-50 w-full px-5"
      >
    <!-- Filter Mobile Section -->
    <!-- <div class="mr-9 mt-10 sticky top-[90px] bg-white border rounded-md p-5 shadow-lg shadow-gray-600 register-class" :class="{'mr-[25px]': filteredTaskCount == 0}" style="max-height: 700px; width: 310px;"> -->
        <h1 class="font-bold whitespace-nowrap dark:text-gray-900 text-[#05264e]xl text-center">
            <span class="text-blue-700">{{ filteredTaskCount }} Jobs</span> Available Now
        </h1>
        <!-- Position Filters -->
        <div class="mt-3">
            <h1 class="font-semibold text-md" style="color: #05264e;">Job Category & Position</h1>
            <div class="flex flex-wrap gap-1 justify-start mt-1">
                <div v-for="position in positions" :key="position" @click="toggleSelection(position)" class="position-card category-card" :class="{'selected': selectedPositions.includes(position)}">
                    <p class="px-3 py-2 text-xs font-semibold">{{ position }}</p>
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
            <h1 class="font-semibold text-md mt-3" style="color: #05264e;">Work Location</h1>
            <div class="flex flex-wrap gap-1 justify-start mt-1">
                <div v-for="option in optionsLocation" :key="option" @click="selectLocation(option)" class="flex border mt-1 w-auto rounded-md items-center mr-1 category-card" :class="{'selected-location text-[#0062d3]': selectedOptionLocation === option}">
                    <p class="px-3 py-2 text-xs font-semibold" :class="selectedOptionLocation === option ? 'text-[#0062d3]' : 'text-custom'">
                        {{ option }}
                    </p>
                </div>
            </div>
        </div>
        <!-- Qualification Filters -->
        <div>
            <h1 class="font-semibold text-md mt-3 mb-2" style="color: #05264e;">Qualification</h1>
            <select v-model="selectedOptionQualification" @change="filterScroll" id="optionsQualification" :class="{'text-custom': selectedOptionQualification === ''}" class="rounded-md border-1 border-[#d1d5db;] text-[#0062d3] font-semibold text-xs pl-3 w-full">
                <option value="" class="text-custom">Select Qualification</option>
                <option v-for="option in optionsQualification" :key="option" :value="option">
                    {{ option }}
                </option>
            </select>
        </div>
        <!-- Salary Filters -->
        <div>
            <h1 class="font-semibold text-md mt-3 mb-2" style="color: #05264e;">Salary Type</h1>
            <select v-model="selectedOptionSalaryType" @change="filterScroll" id="optionsSalaryType" :class="{'text-custom': selectedOptionSalaryType === ''}" class="rounded-md border-1 border-[#d1d5db;] text-[#0062d3] font-semibold text-xs pl-3 w-full">
                <option value="" class="text-custom">Salary Type</option>
                <option v-for="option in optionsSalaryType" :key="option" :value="option">
                    {{ option }}
                </option>
            </select>
            <div class="flex mt-2">
                <select v-model="selectedOptionCurrency" @change="filterScroll" id="optionsCurrency" :class="{'text-custom': selectedOptionCurrency === ''}" class="rounded-md border-1 font-semibold text-xs pl-3 currency-bar">
                    <option value="" class="text-custom">Currency</option>
                    <option v-for="option in optionsCurrency" :key="option" :value="option">
                        {{ option }}
                    </option>
                </select>
                <input type="text" @input="filterScroll" v-model="amountQuery" name="full_name" placeholder="3000 / month" class="ml-3 border border-[#d1d5db;] text-[#0062d3] font-bold rounded-md text-xs w-2/4 mb-3" required /><br />
            </div>
        </div>
        <button
          @click="showPopupFilter = false"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-2.5 text-center w-full"
        >
          Apply Filters
        </button>
        <button
            @click="clearFilters(); showPopupFilter = false"
            class="text-white mt-2 bg-red-500 hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm px-2 py-2.5 text-center w-full"
            >
            Clear Filters
        </button>

    </div>
      <!-- </div> -->
    </transition>
</div>

 <!-- Signup through apply now -->
                   <Transition name="fade-scale">
                        <div v-if="showLoginPopup" class="fixed inset-0 flex justify-center items-center z-30">
                            <div class="bg-white p-6 rounded-md border-0 shadow-lg shadow-gray-600 w-[300px] h-[450px] w-[400px]">
                                <p class="cursor-default" @click="showRegisterPopup=true,showLoginPopup=false,success=false ,showForgotPassword=false, otpLogin=true">Not Registered ? Register here</p>
                                <button @click="showLoginPopup=false ,success=false ,showForgotPassword=false, otpLogin=true" class="close-button h-5 w-5 ml-[90%]">
                                    <img src="https://i.postimg.cc/dVQFYNh9/close.png" alt="close" class="mt-[-10px]" />
                                </button>
                                <!-- <p class="text-left font-semibold text-[#05264e]">You haven't signed in yet. Sign In to apply for a job.</p>
                                <router-link to="/login"><button class="bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 text-[white] font-sans px-3 p-1 text-sm rounded-md w-full mt-3 font-semibold" @click="pushToLoginPage()">
                                    <p class="px-2 py-2 text-center">Sign In</p>
                                </button></router-link> -->

                                  <!-- OTP LOGIN -->
                                    <div v-if="otpLogin">
                                        <form class="mt-10 mb-10" @submit.prevent="handleOtpLogin">
                                        <div class="relative">
                                            <label for="otp" class="text-md font-semibold" style="color: #05264e;">Mobile Number </label><br>
                                            <input type="tel" v-model="phone" id="phone" name="phone" pattern="[0-9]{10}" required placeholder="Enter your mobile number" class="border-gray-400 rounded-md text-sm p-3 pl-10 mt-2 w-full mb-4 font-medium text-[#05264e]"><br>
                                            <p class="absolute top-[38px] md:top-[40px] pl-2.5 mt-0.5 text-[#05264e] text-[15px] font-medium">+91</p>
                                            <p class="text-sm text-[#7680a2]">You will receive an OTP on this number</p>
                                            <input type="submit" class="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 font-medium rounded-sm text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400 w-full" style="font-size: 15px;" value="Get OTP" />
                                            <p @click="emailLogin = true, otpLogin = false" class="cursor-pointer mt-5 text-[#007be0] focus:ring-1 font-medium rounded-sm text-sm px-4 py-2.5 text-center border border-[#007be0] hover:scale-105 w-full transition-all">Use Email to Login</p>
                                    
                                        </div>
                                        </form>
                                    </div>


                                  <!-- EMAIL LOGIN -->
                                    <div v-if="emailLogin">
                                        <form class="mt-5 mb-10" @submit.prevent="handleLogin">
                                        <label for="email" class="text-md font-semibold" style="color: #05264e;">Email ID </label><span class="text-red-500">*</span><br>
                                        <input type="text" v-model="email" id="email" name="email" placeholder="Enter Email ID" class="border-gray-400 rounded-md text-sm p-3 mt-2 w-full mb-4 font-medium text-[#05264e]" required><br>
                                        <label for="password" class="text-md font-semibold" style="color: #05264e;">Password </label><span class="text-red-500">*</span><br>
                                        <div class="relative w-full">
                                            <input :type="show ? 'text' : 'password'" v-model="password" id="password" name="password" placeholder="Enter Password" class="border-gray-400 border rounded-md text-sm p-3 mt-2 w-full pr-14 font-medium text-[#05264e]" required><br>
                                            <svg v-if="!show" @click="togglePassword" class="h-5 w-5 absolute right-5 top-5" fill="#7680a2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                                <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                                            </svg>
                                            <svg v-if="show" @click="togglePassword" class="h-5 w-5 absolute right-5 top-5" fill="#7680a2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                        </svg>
                                        </div>
                                        <p class="text-xs text-blue-800 mt-2 text-right font-medium cursor-pointer" @click="showForgotPassword = true">Forgot Password?</p>
                                        <p v-if="loginFailed" class="text-sm text-red-500 text-center font-semibold mt-4">Invalid login credentials</p>
                                        <input type="submit" class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 font-medium rounded-sm text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400 w-full" style="font-size: 15px;" value="Login" />
                                        <p @click="otpLogin = true, emailLogin = false" class="text-[13px] text-center text-[#007be0] cursor-pointer mt-3 font-medium hover:scale-105 transition-all">Use OTP to Login</p>
                                        <!-- <div class="separator mt-4">
                                            <span class="text-xs mx-2 text-gray-600">Or</span>
                                        </div>
                                        <div class="flex rounded-lg shadow-lg px-2 mt-3 mb-10 pb-1">
                                            <img src="https://i.postimg.cc/bvMnv7cQ/google-icon-logo-svgrepo-com.png" class="mt-2 pl-2" style="height: 17px;" />
                                            <p class="text-gray-700 text-sm p-2 ml-16">Sign in with Google</p>
                                        </div> -->
                                        </form>
                                    </div>
                                    <!-- OTP VERIFICATION -->
                                    <div v-if="otpVerification">
                                        <form class="mt-5 mb-10" @submit.prevent="handleOtpVerification">
                                        <p class="text-sm text-[#7680a2] leading-5 mb-5">We have sent a 6 digit OTP to your mobile<br> number +91 {{ this.phone }}</p>
                                        <label for="email" class="text-[15px] font-semibold" style="color: #05264e;">One Time Passcode </label><br>
                                        <div class="flex justify-center item-center">
                                            <div class="flex gap-4">
                                            <input v-for="(digit, index) in otp" :key="index" v-model="otp[index]" placeholder="*" maxlength="1" @input="handleOtp(index)" :ref="`otp-${index}`" 
                                            class="w-10 h-10 rounded-sm mt-6 transition-all font-medium text-center text-[#007be0]" :disabled="disabled[index]"/>
                                            </div>
                                        </div>
                                        <p @click="resendOtp()" class="cursor-pointer mt-3 text-sm font-medium text-[#007be0]">Resend OTP</p>
                                        <p v-if="otpMismatched" class="text-red-500 text-center text-sm font-medium my-3">Invalid OTP. Please enter a valid OTP</p>
                                        <input :disabled="disableVerify" :class="{'cursor-not-allowed': disableVerify, 'mt-0': otpMismatched}" type="submit" class="disabled:opacity-[0.5] mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 font-medium rounded-sm text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400 w-full" style="font-size: 15px;" value="Verify & Login" />
                                        <p @click="otpVerification = false, otpLogin = true, emailLogin = false" class="cursor-pointer mt-5 text-[#007be0] focus:ring-1 font-medium rounded-sm text-sm px-4 py-2.5 text-center border border-[#007be0] hover:scale-105 w-full transition-all">Change Mobile Number</p>
                                        </form>
                                    </div>   


                                    <div v-if="!isLoggedIn && handleSuccess()" class="text-center mt-[100px] mx-8">
                                        <h1 class="text-xl font-semibold" style="color: #05264e;">Password Email Sent</h1>
                                        <p class="text-md mt-3 font-medium" style="color: #05264e;">Password reset instructions have been sent to your email</p>
                                    </div>

                                    

                                    <!-- Forgot Password Modal -->
                                    <div v-if="showForgotPassword && !success" class="fixed inset-0 bg-black bg-opacity-[0.5] flex justify-center items-center">
                                    <div class="bg-white p-6 rounded-md border-0 shadow-xl w-[300px]">
                                        <h2 class="text-md font-semibold" style="color: #05264e;">Forgot Password</h2>
                                        <form @submit.prevent="submitForgotPassword" id="forgotPassword" class="mt-3">
                                        <label for="email" class="text-sm font-semibold" style="color: #05264e;">Email ID </label><span class="text-red-500"></span><br>
                                        <input type="email" v-model="forgotPassword.email" placeholder="Enter your email" class="mb-1 border-gray-400 rounded-md text-sm p-3 w-full mt-1 font-medium text-[#05264e]" required />
                                        <p v-if="errorField=='mail'" class="text-red-500 text-sm font-medium my-3">{{ error }}</p>
                                        <button type="submit" class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 font-medium rounded-sm text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400 w-full" style="font-size: 15px;">Confirm</button>
                                        </form>
                                        <button @click="showForgotPassword = false" class="text-[13px] text-center text-blue-800 mt-2 font-medium">Cancel</button>
                                    </div>
                                    </div>
                                

                                <div v-if="loading" class="text-center mt-4 absolute top-[40%] right-[50%]">
                                    <p><span class="loader"></span></p> 
                                </div>
                                <div v-if="successfull" class="success-message absolute right-[50px] top-[50%]">
                                    <div class="bg-gradient-to-r from-[#0bda51] to-[#0bda51] rounded-sm shadow-xl h-10 pt-2 w-[250px] ">
                                    <p class="text-white font-semibold text-center">Password Updated Successfully</p>
                                    </div>
                                </div>
                                <div class="g_id_signin" data-onsuccess="onSignIn"></div>
                                <div v-if="redirecting" class="text-center mt-[50px]">
                                        <h1 class="text-xl font-semibold" style="color: #05264e;">The mobile number is not registered</h1>
                                        <p class="text-md mt-3 font-medium" style="color: #05264e;">redirecting to registration...</p>
                                    </div>



                            </div>

                        </div>


                                


                    

                    </Transition>

                <!-- RegisterPopup -->    
                    <Transition>                        

                    <div v-if="showRegisterPopup" class="fixed inset-0 flex justify-center items-center z-30">
                            <div class="bg-white p-6 rounded-md border-0 shadow-lg shadow-gray-600   w-[500px]">

                                 <button @click="showRegisterPopup=false " class="close-button h-5 w-5 ml-[90%]">
                                    <img src="https://i.postimg.cc/dVQFYNh9/close.png" alt="close" class="mt-[-10px]" />
                                </button>

                            <form @submit.prevent="submitUser" id="newUser" class="mt-5">
                            <label for="full_name" class="text-md font-semibold " style="color: #05264e;">Full name </label><span class="text-red-500">*</span><br />
                            <input type="text" v-model="newUser.full_name" name="full_name" placeholder="What is your name ?" class="border text-[#05264e] font-medium rounded-lg text-sm p-3 mt-2 w-full mb-3" required /><br />
                            <label for="email" class="text-md font-semibold " style="color: #05264e;">Email ID </label><span class="text-red-500">*</span><br />
                            <input type="text" v-model="newUser.email" name="email" placeholder="Tell us your Email ID" class="border text-[#05264e] font-medium rounded-lg text-sm p-3 mt-2 w-full mb-3" required /><br />
                            <p v-if="errorField=='email'" class="text-red-500 mb-3 text-sm font-medium">{{ error }}</p>
                            <label for="password" class="text-md font-semibold " style="color: #05264e;">Password </label><span class="text-red-500">*</span><br />
                            <input type="password" v-model="newUser.password" name="password" placeholder="(minimum 8 characters)" class="border text-[#05264e] font-medium rounded-lg text-sm p-3 mt-2 w-full mb-3" required /><br />
                            <div class="relative mb-3 w-full  ">
                                <label for="mobile_no" class="text-md font-semibold  " style="color: #05264e;">Phone </label>
                                <span class="text-red-500">*</span><br />
                                <input type="tel" ref="phoneInput" v-model="newUser.mobile_no" id="phone" name="mobile_no" placeholder="Enter your mobile number"  class="border  text-[#05264e] font-medium rounded-lg text-sm px-[200px] py-3 w-full mt-2" required />
                            </div>
                            <!-- <div class="relative">
                                <label for="mobile_no" class="text-md font-semibold " style="color: #05264e;">Phone </label><span class="text-red-500">*</span><br />
                                <input type="tel" v-model="newUser.mobile_no" name="mobile_no" placeholder="Enter your mobile number" pattern="[0-9]{10}" class="border text-[#006fdd] font-medium rounded-lg text-sm p-3 pl-10 mt-2 w-full mb-3 phone-box" required /><br />
                                <p class="absolute top-[40px] pl-2.5 mt-0.5 text-[#05264e] text-[15px] font-medium">+91</p>
                            </div> -->
                            
                            <p v-if="errorField=='mobile'" class="text-red-500 text-sm font-medium">{{ error }}</p>
                            <div v-if="newUser.source">
                                <label for="source" class="text-md font-semibold mt-3" style="color: #05264e;">
                                Source
                            </label>
                            <!-- <span class="text-red-500">*</span> -->
                            <br />
                            <select 
                                :disabled="isReadOnly"
                                :class="{
                                'text-black': newUser.source === '', 
                                'text-white': newUser.source !== '',
                                'cursor-not-allowed': isReadOnly
                                }" 
                                class="border font-medium rounded-lg text-sm p-3 mt-2 w-full mb-3 font-sans source-box" 
                                v-model="newUser.source" 
                                style="color: #05264e; opacity: 1; pointer-events: none;" 
                            >
                                <option value="" disabled>Where did you hear about us?</option>
                                <option class="font-medium text-sm" value="Paper Advertisement">Paper Advertisement</option>
                                <option class="font-medium text-sm" value="Reference">Reference</option>
                                <option class="font-medium text-sm" value="Social Media">Social Media</option>
                                <option class="font-medium text-sm" value="Direct">Direct</option>
                                <option class="font-medium text-sm" value="REFERPRO">REFERPRO</option>
                            </select>
  
                            </div>
                            <!-- Additional Input if Reference is Selected -->
                            <div v-if="newUser.source === 'Reference' || newUser.source === 'REFERPRO'">
                                <label for="referenceSource" class="text-md text-[#05264e] font-semibold" style="color: #05264e;">
                                    Referred by
                                </label>
                                <span class="text-red-500">*</span><br />
                                <input type="text" id="referenceSource" readonly v-model="newUser.referenceSource" class="border text-sm text-[#05264e] font-medium rounded-lg p-3 mt-2 w-full mb-3 font-sans" placeholder="Enter referred Candidate ID" />
                            </div>
  
                            <div v-if="newUser.source === 'Social Media'">
                                <label for="mediaSource" class="text-md font-semibold" style="color: #05264e;">
                                    Social media platform
                                </label>
                                <span class="text-red-500">*</span><br />
                                <input type="text" id="mediaSource" v-model="newUser.mediaSource" class="border text-sm font-medium rounded-lg p-3 mt-2 w-full mb-3 font-sans" placeholder="e.g., Facebook, LinkedIn" />
                            </div>
  
                            <p class="text-gray-500 text-xs mt-4" style="color: #7680a2;">By clicking Register, you agree to the <span class="text-sm font-semibold" style="color: #007fcf;">Terms and Conditions</span> & <span class="text-sm font-semibold" style="color: #007fcf;">Privacy Policy</span> of <span class="font-semibold" style="color: #05264e;">jobpro.com</span></p>
                            <input type="submit" id="saveNewUser" class="rounded-full mt-4 mb-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:ring-1 focus:ring-blue-500 px-5 py-2 w-full md:w-full transition-full" style="font-size: 15px;" value="Register Now" />
                        </form>



                            </div>
                    </div>
                    </Transition>


</template>

<script>
import apiService from '../services/apiService.js';
import axios from 'axios';
import { useRouter } from 'vue-router';
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';

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
import { id } from 'intl-tel-input/i18n';

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
              otpLogin: true,
              emailLogin: false,
              currentPage: 1,
              pageSize: 12,
              selectedPositions: [],
              jobname: '',
              jobnames: [],
            filteredJobnames: [],
            showJobnameSuggestions: false,
            showPopupFilter: false,
            showLoginPopup: false,
            showRegisterPopup: false,
            isloggedIn: 0,
            applied: false,
            appliedTask: null,
            appliedJobs: {},
            needToApplyResume: false,
            applicantCount: 0,
            jobApplied: false,
            email: '',
      password: '',
      loginFailed: false,
      isLoggedIn: false,
      loading: false, 
      showForgotPassword: false,
      forgotEmail: '',
      error:'',
      success: false,
      successfull: false,
      errorField: '',
      otpLogin: true,
      emailLogin: false,
      forgotPassword: {
        email: '',
        full_name: ''
      },
      otp: ['', '', '', '', '', ''],
      disabled: [false, false, false, false, false, false],
      disableVerify: true,
      otpSent: '',
      otpEntered: '',
      otpMismatched: false,
      redirecting: false,
      loginBox: true,
      show: false,
      phoneNumber: "", // Stores input value
                iti: null,
                newUser: {
                    full_name: '',
                    email: '',
                    password: '',
                    mobile_no: '',
                    source: '',
                    mediaSource: '',
                    referenceSource: '',
                },
                loading: false,
                success: false,
                error: '',
                errorField: '',
                 flippedCards: {},
                flipInterval: null,
                currentFlipIndex: 0,
                 flippedCards: [],  
    showDetails: true,   
    currentCard: 0,
    custom_customer_location:null,
    project:null,  
            
          };
      },

    watch: {
    showRegisterPopup(newVal) {
      if (newVal) {
        this.$nextTick(() => {
        //   if (this.$refs.phoneInput) {
        //     if (!this.iti) {
        //       this.iti = intlTelInput(this.$refs.phoneInput, {
        //         initialCountry: "in",
        //         separateDialCode: true,
        //         nationalMode: false,
        //         utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.8/build/js/utils.js"
        //       });
        //     }
        //   }
        
          if (this.$refs.phoneInput) {
    if (!this.iti) {
      this.iti = intlTelInput(this.$refs.phoneInput, {
        initialCountry: "in",
        separateDialCode: true,
        nationalMode: false,
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.8/build/js/utils.js"
      });

      // Force reset width after plugin sets it
    //   this.$refs.phoneInput.style.width = "100%";
    }
  }




        });
      }
    }
  },

      
      setup() {
          const state = inject('state');
          const profileName = inject('profileName');
          const candidateId = inject('candidateId');
          const profileMail = inject('profileMail');
          const router = useRouter();
          console.log(candidateId)


          const handleLogout = () => {
            state.isLoggedIn = false;
            localStorage.removeItem('authToken');
            localStorage.removeItem('fullName');
            localStorage.removeItem('candidateToken');
            router.push('/login');
            window.location.reload();
            };


          return {
              state, 
              profileName,
              candidateId,
              profileMail,
              handleLogout
          };
      },
      computed: {

          filteredTasks() {
              this.currentPage = 1;
              return this.taskDetails.filter(task => {
                //  console.log(task)
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
          this.project = task.project || null;
          this.fetchProjectImage = task.custom_customer_location_image || null;
          
          

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
          },

          isReadOnly() {
            return this.newUser.source === 'Reference' || this.newUser.source === 'REFERPRO';
            }

         



      },
      mounted() {
          this.isloggedIn = localStorage.length

          
        //    this.startSequentialFlip();
        //    this.startAutoFlip()

        //    this.showDetails = Array(this.paginatedTasks.length).fill(true);

            // flip every 10 seconds
            // setInterval(() => {
            // this.showDetails = this.showDetails.map(val => !val);
            // }, 10000);

            // setInterval(() => {
            // this.showDetails = !this.showDetails
            // }, 5000);



        //   this.fetchTaskDetails();
        //   this.loadAppliedJobs();
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

          this.checkLoginStatus(); 
    this.addIntersectionObserver();
    window.gapi.load('auth2', () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({
          client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
        });
      }
    });

      this.candidateDetails();



            this.addIntersectionObserver();
            const referenceMessage = this.$route.query.reference;
            const mobileMessage = this.$route.query.mobile;
            const mediaMessage = this.$route.query.media;
            const referenceEmail = this.$route.query.email;

            if (mobileMessage) {
                this.newUser = {
                    full_name: '',
                    email: '',
                    password: '',
                    mobile_no: mobileMessage,
                    mediaSource: '',
                    referenceSource: '',
                    source: '',
                };
            }
            if (referenceMessage) {
                this.newUser = {
                    full_name: this.$route.query.name,
                    email: referenceEmail,
                    password: '',
                    mobile_no: this.$route.query.phone,
                    mediaSource: '',
                    referenceSource: referenceMessage,
                    source: 'REFERPRO',
                };
            }
            if (mediaMessage) {
                this.newUser = {
                    full_name: '',
                    email: '',
                    password: '',
                    mobile_no: '',
                    mediaSource: mediaMessage,
                    referenceSource: '',
                    source: 'Social Media',
                };
            }
            
  


      },
      beforeMount() {
          eventBus.off('run-command', this.executeTask)
      },

      beforeUnmount() {
        clearInterval(this.flipInterval);
        },
      methods: {


    startAutoFlip() {
  // Initialize arrays based on task count
  this.flippedCards = Array(this.paginatedTasks.length).fill(false);
  this.showDetails = Array(this.paginatedTasks.length).fill(true);

  setInterval(() => {
    // toggle between details and image for the current card
    this.$set(this.showDetails, this.currentCard, !this.showDetails[this.currentCard]);

    // move to next card only when we return to "details"
    if (this.showDetails[this.currentCard]) {
      this.currentCard = (this.currentCard + 1) % this.paginatedTasks.length;
    }
  }, 10000); // every 10s
},
  
  

// startSequentialFlip() {
//   this.flipInterval = setInterval(() => {
//     const tasks = this.paginatedTasks;
//     if (tasks.length === 0) return;

//     // reset all other cards to "front"
//     tasks.forEach((task, idx) => {
//       this.$set(this.flippedCards, task.name, false);
//     });

//     // flip the current card to back
//     const task = tasks[this.currentFlipIndex];
//     this.$set(this.flippedCards, task.name, true);

//     // flip it back after 3s (optional)
//     setTimeout(() => {
//       this.$set(this.flippedCards, task.name, false);
//     }, 3000);

//     // move to next card
//     this.currentFlipIndex = (this.currentFlipIndex + 1) % tasks.length;

//   }, 10000); // every 10s
// },


      truncateText(text, length) {
      return text && text.length > length
        ? text.substring(0, length) + "..."
        : text;
    },


        handleSuccess() {
            if (this.success && this.emailLogin) {
            this.emailLogin = false;
            return true;
            }
            return this.success;
        },
        

        clearFilters() {
    this.selectedPositions = [];
    this.jobname = "";
    this.filteredJobnames = [];
    this.selectedOptionLocation = "";
    this.selectedOptionQualification = "";
    this.selectedOptionSalaryType = "";
    this.selectedOptionCurrency = "";
    this.amountQuery = "";
    this.filterScroll();
  },
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
              await this.loadAppliedJobs();
              
          },
          async applyJobs(task, subject, contact, candidate) {
            if (this.isloggedIn > 0) { 
              this.loading = true;
              
              const response = await apiService.applyJobs(task, candidate);
              if (response) {
                  this.appliedJobs[task] = true;
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

                  this.loadAppliedJobs()
              }
            }else { 
                   
                    this.showLoginPopup = true;
                }
          },


        //    async fetchTaskDetails() {
        //         // const taskName = this.$route.params.taskName;
        //         this.task = await apiService.getTaskDetails(task.name);
        //         this.custom_recruiter_contact = this.task.custom_recruiter_contact || null;
        //         const response = await apiService.getApplicantCounts(this.task.name, this.id);
        //         this.applicantCount = response.data.message[0];
        //         this.jobApplied = response.data.message[0];
        //         // const response = await apiService.convertToINR(this.task.currency, this.task.amount);
        //         // this.conAmt = response.data.message;
        //     },

       

        onSignIn(googleUser) {
      const profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId());
      console.log('Full Name: ' + profile.getName());
      console.log('Given Name: ' + profile.getGivenName());
      console.log('Family Name: ' + profile.getFamilyName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());

      const id_token = googleUser.getAuthResponse().id_token;
      console.log('ID Token: ' + id_token);
    },

    checkLoginStatus() {
      const token = localStorage.getItem('authToken');
      this.loginFailed = false; 
      this.isLoggedIn = !!token; 
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
    async handleLogin() {
      this.loading = true; 
      try {
        const response = await axios.post('/api/method/login', {
          usr: this.email,
          pwd: this.password,
        });
        if (response.status === 200 && response.data.message) {
          localStorage.setItem('authToken', response.data.message);
          localStorage.setItem('fullName', response.data.full_name);
          localStorage.setItem('emailId', this.email)
          this.$router.push('/');
          setTimeout(() => {
            window.location.reload(); 
          }, 0);
        } else {
          this.loginFailed = true;
        }
      } catch (error) {
        this.loginFailed = true;
      } finally {
        this.loading = false; 
      }
    },
    
    async submitForgotPassword() {
      this.loading = true;
      this.error = '';
      this.errorField = '';
      this.success = false;
        const { email } = this.forgotPassword;
        const responseData = await apiService.changePassword(email);
        if (responseData) {
          this.loading = false;
          if (responseData.status == 200 && responseData.statusText) {
            this.success = true;
          }
        }
        if (responseData.statusText == "EXPECTATION FAILED") {
          this.error = "user not found";
          this.loading = false;
          this.errorField = 'mail';
          this.success = false;
        }
       
      
    },


    async handleOtpLogin() {
      this.loading = true;
      const mobile = this.phone
      try {
          const response = await await apiService.otpLogin(mobile);
        if (response.status == 200 && response.data.message != 'Failed to send OTP. Please try again.') {
          this.emailLogin = false;
          this.otpLogin = false;
          this.otpVerification = true;
          this.otpSent = response.data.message
          console.log(response.data.message)
        } else {
          console.log("HIIII")
          this.loginFailed = true;
        }
      } catch (error) {
        this.loginFailed = true;
      } finally {
        this.loading = false; 
      }
    },
    async resendOtp() {
      this.loading = true;
      const mobile = this.phone
      try {
          const response = await await apiService.otpLogin(mobile);
        if (response.status == 200 && response.data.message != 'Failed to send OTP. Please try again.') {
          this.otp = ['', '', '', '', '', ''],
          this.emailLogin = false;
          this.otpLogin = false;
          this.otpVerification = true;
          this.otpSent = response.data.message
        } else {
          this.loginFailed = true;
        }
      } catch (error) {
        this.loginFailed = true;
      } finally {
        this.loading = false; 
      }
    },


    handleOtp(index) {
        const currentValue = this.otp[index];
        const isValidInput = currentValue.match(/[0-9a-z]/gi);
        this.otp[index] = isValidInput ? currentValue[0] : '';
        if (isValidInput && index < this.otp.length - 1) {
          this.$nextTick(() => {
            this.$refs[`otp-${index + 1}`][0].focus();
          });
        }
        if (currentValue === '' && index > 0) {
          this.$nextTick(() => {
            this.$refs[`otp-${index - 1}`][0].focus();
          });
        }
        this.disableVerify = this.otp.some(digit => digit === '');
      },





    async handleOtpVerification() {
        this.loading = true;
        const otpValue = this.otp.join('');
        this.otp.forEach((_, index) => {
          this.disabled[index] = false;
        });
        console.log(otpValue);
        const response = await apiService.otpVerification(this.otpSent, otpValue, this.phone)
        
        console.log(response.data.message)
        if (response.data.message == "invalid") {
          this.otpMismatched = true;
          this.loading = false;
        }
        if (response.data.message == 'candidate not found' || response.data.message == 'user not found') {
          console.log(response.data.message)
          this.loading = false;
          this.redirecting = true;
          this.loginBox = false;
          setTimeout(() => {
            this.$router.push({
              path: '/registration',
              query: { mobileMessage: this.phone },
            }); 
          }, 5000);
          
        }
        if (response.data.message.message.includes("CD")) {
          localStorage.setItem('candidateToken', response.data.message.message);
          localStorage.setItem('authToken', response.data.message.auth_token);
          localStorage.setItem('fullName', response.data.message.full_name);
          localStorage.setItem('emailId', response.data.message.user);
          this.candidateId = response.data.message.message;
          this.profileMail = response.data.message.user;
          this.loading = false;
          this.redirecting = true;
          this.loginBox = false;
          this.$router.push('/');
          setTimeout(() => {
            window.location.reload(); 
          }, 0);
        }
      },

      togglePassword() {
        this.show = !this.show;
      },

         


           async checkIfApplied(task, id) {
                
                
                
                if (this.isloggedIn > 0) {
                    const response = await apiService.findAppliedJobs(task, id);
                    if (response && response.data.message === "true") {
                       this.appliedJobs[task] = true;
                       this.appliedTask = task
                    //    console.log(this.appliedTask)
                    } else {
                       this.appliedJobs[task] = false;
                    }
                } else {
                   this.appliedJobs[task] =false;
                }
            },
            async loadAppliedJobs() {
                
                

                for (const task of this.filteredTasks) {
                    // console.log(task.name)
                    // console.log(this.profileMail.emailId)
                    await this.checkIfApplied(task.name, this.id);
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


          async candidateDetails() {
                try {
                    if (this.profileMail.emailId) {
                        const response = await apiService.getCandidateDetails(this.profileMail.emailId);
                        this.id = response.data.message.name
                    } else {
                        console.error("No email provided in profileMail.");
                    }
                } catch (error) {
                    console.error("Failed to fetch candidate details:", error);
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
                      const response = await apiService.updateResume(fileUrl, this.id);
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

            // Register


            async submitUser() {
                let countryData = this.iti.getSelectedCountryData().name;
                this.loading = true;
                this.error = '';
                this.errorFiled = '';
                this.success = false;
  
                const {
                    full_name,
                    email,
                    password,
                    mobile_no,
                    source,
                    referenceSource,
                    mediaSource,
                } = this.newUser;
                const responseData = await apiService.createUser(full_name, email, password, mobile_no, source, referenceSource, mediaSource, countryData);
                const emailDup = /Duplicate entry '(.+?)' for key 'PRIMARY'/;
                const mobileDup = /Duplicate entry '(.+?)' for key 'mobile_no'/;
  
                if (typeof responseData === 'string') {
                    if (responseData.match(emailDup)) {
                        this.loading = false;
                        this.success = false;
                        this.errorField = 'email';
                        const emialAddress = responseData.match(emailDup)[1];
                        this.error = `${emialAddress} already exists.`;
                    } else if (responseData.match(mobileDup)) {
                        this.loading = false;
                        this.success = false;
                        this.errorField = 'mobile';
                        const mobileNo = responseData.match(mobileDup)[1];
                        this.error = `${mobileNo} already exists.`;
                    } else if (responseData.includes('InvalidEmailAddressError')) {
                        this.loading = false;
                        this.success = false;
                        this.errorField = 'email';
                        this.error = 'invalid email address';
                    } else {
                        this.loading = false;
                        this.success = true;
                        this.errorField = '';
                        this.newUser = {
                            full_name: '',
                            email: '',
                            password: '',
                            mobile_no: '',
                            source: '',
                            referenceSource: '',
                            mediaSource: '',
                        };
                        this.error = '';
                        setTimeout(() => {
                            this.$router.push('/login');
                        }, 1000);
                    }
                } else {
                    this.loading = false;
                    this.success = true;
                    this.errorField = '';
                    this.newUser = {
                        full_name: '',
                        email: '',
                        password: '',
                        mobile_no: '',
                        source: '',
                        referenceSource: '',
                        mediaSource: '',
                    };
                    this.error = '';
                    setTimeout(() => {
                        this.$router.push('/login');
                    }, 1000);
                }
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
      }
  };
</script>

<style scoped>


/* .flip-card {
  perspective: 1000px;
  width: 100%;
  height: 100%;         
  position: relative;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;         
  transform-style: preserve-3d;
  transition: transform 0.8s;
}

.flip-card-inner.flipped {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
 position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;         
  backface-visibility: hidden;
}

.flip-card-front {
  z-index: 2;
  transform: rotateY(0deg);
  transition: transform 1s;
}

.flip-card-back {
  transform: rotateY(180deg);
}

.flipped {
  transform: rotateY(180deg);
} */

/* .flip-card {
  perspective: 1000px;
  
}

.flip-inner {
  position: relative;
  width: 100%;
  min-height: 350px;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-inner.flipped {
  transform: rotateY(180deg);
}

.flip-front,
.flip-back {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  backface-visibility: hidden;
}

.flip-front {
  z-index: 2;
  transform: rotateY(0deg);
}

.flip-back {
  transform: rotateY(180deg);
} */



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
      width: 50%;
      border: 1px solid #d1d5db;
      height: 32px;
      color: #0062d3;
      padding-left: 8px;
  }
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
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

  .small-scrollbar::-webkit-scrollbar {
  height: 4px; /* for horizontal scroll */
  width: 4px;  /* for vertical scroll */
}

.small-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.small-scrollbar::-webkit-scrollbar-thumb {
  background-color: #c0c0c0;
  border-radius: 9999px;
}

.small-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #c0c0c0;
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
min-height: 350px;
  /* transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out; */
  /* background-color: white; */
  perspective: 1000px;
  position: relative;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.8s ease-in-out;
}

/* Flip the card on hover */
.job-card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  padding: 20px;
}

/* Front of the card */
.card-front {
  z-index: 2;
}

/* Back of the card */
.card-back {
  transform: rotateY(180deg);
}


  /* .job-card:hover  {
      transform: scale(1.05);
      background-color: white;
      transform: rotateY(180deg);
      transition: transform 1s;
      transform-style: preserve-3d;
  } */
  /* .job-card:hover .expires-soon {
  transform: scale(1.05);

  transform: rotateY(180deg);
      transition: transform 1s;
      transform-style: preserve-3d;
} */
/* .job-card:hover .new-post {
  transform: scale(1.05);
  
} */
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
      .job-card {
        width: 315px;
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
/* .iti {
  display: block !important;
  width: 100% !important;
} */

/* Make the input itself full width */
/* .iti .iti__tel-input,
.iti input {
  width: 100% !important;
  box-sizing: border-box !important;
} */

  

</style>