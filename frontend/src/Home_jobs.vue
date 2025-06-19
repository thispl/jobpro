<template>
  <div class="my-16">
    <div class="text-center fade-section">
      <h1 class="font-bold  text_1 font-sans mt-6">Jobs of the Day</h1>
      <p class="m-3 text-md text-gray-600 font-semibold mt-3 text_2 capitalize">We are there to find you a new job</p>
    </div>

    <!-- Category Cards -->
    <div class="flex flex-wrap justify-center fade-section">
      <div v-for="task in distinctCategories" :key="task.name" @click="selectCategory(task.custom_job_category)">
        <div v-if="task.custom_job_category" class="flex border mt-8 w-auto rounded-md items-center category-card mr-10" :class="{ 'active-category': selectedCategory === task.custom_job_category, 'fade-in': true}">
          <img v-if="task.custom_jobpro_image" :src="task.custom_jobpro_image" alt="job photo" width="30px" class="pl-3"/>
          <p class="p-3 text-xs text-gray-900 font-bold">{{ task.custom_job_category }}</p>
        </div>
      </div>
    </div>


    <!-- Job Cards with Transition Group -->
    <div class="fade-section">
      <transition-group
        name="fade"
        tag="div"
        class="grid md:grid-cols-2 xl:grid-cols-3 m-14 gap-10 w-10/12 mx-auto font-sans"
      >
      <div v-for="task in filteredTasks" :key="task.name">
        <div class="border rounded-md hover:bg-white transition-colors px-5 job-card relative pt-2 scroll-smooth">
          <div v-if="expireDate(task.exp_end_date) < 12" class="expires-soon">
            <img src="https://i.postimg.cc/vZQrChGv/Red-Corner-Label-4-PNG-SVG-Design-For-T-Shirts-removebg-preview.png" class="z-10">
            <p class="rotate-45 z-20 expires-soon-text font-semibold">Expires Soon</p>
            <!-- <p v-if="expireDate(task.exp_end_date) == 1" class="rotate-45 z-20 expires-soon-text font-semibold">will expire<br>in {{ expireDate(task.exp_end_date) }} day</p> -->
          </div>
          <div v-if="newlyPosted(task.created_on)==true" class="new-post">
            <img src="https://i.postimg.cc/NF6t87zy/Conception-de-banni-re-verte-sur-fond-blanc-Vecteur-Gratuite-removebg-preview.png" class="z-10">
            <p class="z-20 new-post-text font-semibold">New Post</p>
          </div>
          <h1 class="pt-3 text-md font-sans text-gray-900 font-bold min-h-16 capitalize" style="color: #05264e;">{{ task.subject }}</h1>
          <div class="flex">
            <img v-if="task.custom_country_flag" :src="task.custom_country_flag" :alt="flag-task.name" class="image-size mr-2"/>
            <h2 class="text-sm font-sans text-[#001d4e] font-semibold pb-2 uppercase">{{ task.territory }}</h2>
          </div>
          <div class="flex flex-row text-[11px] text-gray-600 gap-3 pt-2 font-medium">
            <p>Fulltime</p>
            <p>{{ timeAgo(task.creation) }}</p>
            <p class=" rounded-md">Exp: {{ task.minimum_experience }} years</p>
          </div>
          <p class="flex flex-row text-xs text-gray-800 pt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis itaque vel maiores, modi culpa molestiae provident quos inventore beatae
          </p>
          <div class="flex flex-wrap text-[10px] text-gray-500 mt-4 gap-3 font-semibold">
            <div v-if="task.accommodation!='Included in Salary'" class="flex shadow-sm gap-1 bg-blue-200 py-1 px-2 rounded-md ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#a5a8a6" class="h-5 w-3.5" viewBox="0 0 576 512"><path d="M560 64c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16H16C7.2 0 0 7.2 0 16v32c0 8.8 7.2 16 16 16h16v384H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h240v-80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v80h240c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-16V64h16zm-304 44.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm0 96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm-128-96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zM179.2 256h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8zM192 384c0-53 43-96 96-96s96 43 96 96H192zm256-140.8c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-96c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4z"/></svg>
              <p class="mt-0.5">Accommodation</p>
            </div>
            <div v-if="task.food!='Included in Salary'" class="flex gap-1 shadow-sm bg-blue-200 py-1 px-2 rounded-md transition-full">
              <svg xmlns="http://www.w3.org/2000/svg"  class="h-5 w-3" fill="#a5a8a6" viewBox="0 0 448 512"><path d="M416 0C400 0 288 32 288 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 0-112 0-208c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7L80 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16l0 134.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8L64 16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"/></svg>
              <p class="mt-0.5">Food</p>
            </div>
            <div v-if="task.transportation!='Included in Salary'" class="flex gap-1 shadow-sm bg-blue-200 py-1 px-2 rounded-md transition-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-3" fill="#a5a8a6" viewBox="0 0 448 512"><path d="M224 0C348.8 0 448 35.2 448 80l0 16 0 320c0 17.7-14.3 32-32 32l0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32-192 0 0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32L0 96 0 80C0 35.2 99.2 0 224 0zM64 128l0 128c0 17.7 14.3 32 32 32l256 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L96 96c-17.7 0-32 14.3-32 32zM80 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>
              <p class="mt-0.5">Transportation</p>
            </div>
            <div v-if="task.over_time=='Applicable'" class="flex gap-1 shadow-sm bg-blue-200 py-1 px-2 rounded-md transition-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-3" fill="#a5a8a6" viewBox="0 0 512 512"><path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9L0 168c0 13.3 10.7 24 24 24l110.1 0c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24l0 104c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65 0-94.1c0-13.3-10.7-24-24-24z"/></svg>
              <p class="mt-0.5">OT</p>
            </div>
           </div>
          <div class="flex flex-wrap mt-6 mb-4">
            <p v-if="task.salary_type != 'Confidential'" class="pt-1"><span class="text-xs text-blue-600 font-bold">{{ task.currency }}</span> <span class="text-blue-600 text-md font-semibold">{{ task.amount }}</span><span class="text-sm text-gray-600 font-semibold">/month</span></p>
            <p v-if="task.salary_type == 'Confidential'" class="text-sm text-gray-600 pt-2 font-semibold">*Confidential</p>
            <button @click="handleApply(task.name)" class="text-blue-700 hover:text-blue-800 border border-blue-700 hover:border-blue-700 hover:shadow-sm font-medium hover:font-semibold rounded-md text-[12px] px-2 py-1 text-center ml-auto transition-full">
              <p>Job Details</p>
            </button>
            <button @click="applyViaWhatsapp(task.name, task.subject, task.custom_recruiter_contact)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[12px] px-2 py-1 text-center ml-2">
              <p>Apply Now</p>
            </button>
          </div>
        </div>
      </div>
      </transition-group>
    </div>
  </div>
</template>




<script>
import apiService from './services/apiService.js';
import { formatDistanceToNow } from 'date-fns';
import { formatDistance } from 'date-fns';
import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';

export default {
  data() {
    return {
      taskDetails: [],
      selectedCategory: null,
      serviceFilter: ['REC-I', 'REC-D'],
      vacFilter: 0,
      statusFilter: ['Open', 'Working', 'Overdue', 'Pending Review'],
    };
  },
  mounted() {
    this.fetchTasks();
  },
  computed: {
    distinctCategories() {
      const seen = new Set();
      return this.taskDetails.filter((task) => {
        const isDuplicate = seen.has(task.custom_job_category);
        seen.add(task.custom_job_category);
        return !isDuplicate;
      });
    },
    filteredTasks() {
      if (!this.selectedCategory) return this.taskDetails;
      return this.taskDetails.filter(
        (task) => task.custom_job_category === this.selectedCategory
      );
    },
  },
  methods: {
    async fetchTasks() {
      const filters = {
        limit: 10,
        serviceFilter: this.serviceFilter,
        vacFilter: this.vacFilter,
        statusFilter: this.statusFilter,
      };

      try {
        this.taskDetails = await apiService.fetchData(filters);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    },
    onVisibilityChange(isVisible, entry) {
      if (isVisible) {
        entry.target.classList.add("fade-in");
      } else {
        entry.target.classList.remove("fade-in");
      }
    },
    selectCategory(category) {
      if (this.selectedCategory == category) {
        this.selectedCategory = null;
      }
      else {
        this.selectedCategory = category;
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
    expireDate(expirationDate) {
      const now = new Date();
      const targetDate = new Date(expirationDate);
      if (targetDate > now) {
        const days = differenceInDays(targetDate, now)
        if (days<3) {
          return `${days}`;
        }
      }
    },
    newlyPosted(postedDate) {
      const today = new Date(); 
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(today.getDate() - 4); 

      const createdDate = new Date(postedDate); 

      if (createdDate >= twoDaysAgo && createdDate <= today) {
        console.log(createdDate)
        return true
      }
    },
    applyViaWhatsapp(taskName, taskSubject, taskContact) {
      const message = `Hello, I am interested in applying for the position of ${taskSubject} with the reference number ${taskName}.`;
      const recruiterContact = taskContact || '7305428777';
      const encodedMessage = encodeURIComponent(message);
      window.location.href = `https://wa.me/${recruiterContact}?text=${encodedMessage}`;
    }
  },
};

</script>

<style>
.fade-section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1s ease-out, transform 1s ease-out;
}

.fade-in {
    opacity: 1;
    transform: translateY(0);
}
.category-card.active-category p{
  border-color: #005ca3;
  color: #005ca3;
}

.category-card.active-category {
  transform: scale(1);
  border-color: #005ca3;
  color: #005ca3;
}

.category-card:hover {
  border-color: #0062d3;
}
.category-card:hover p {
  color: #0062d3;
}
.category-card {
  cursor: pointer;
  transition: border-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.text_1 {
  font-size: 2rem;
  color: #05264e;
}

.text_2 {
  font-size: 1rem;
  color: #6c757d;
}

.text-3 {
  font-size: 1rem;
  color: #05264e;
}

.text-4 {
  color: #6c757d;
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
.job-card:hover .expires-soon {
  transform: scale(1.05);
}
.job-card:hover .new-post {
  transform: scale(1.05);
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


</style>