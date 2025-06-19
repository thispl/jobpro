<template>
    <div class="rounded-lg mx-6 mt-7 bg-gray-100 fade-section" style="height: 575px;">
        <div class="grid grid-cols-1 md:grid-cols-5 text-center">
            <div class="col-span-3 self-center px-5 md:px-20 text-left text-2xl md:text-4xl font-sans ">
                <h1 class="font-bold whitespace-nowrap dark:text-gray-900 text-banner">
                    The <span class="md:text-blue-700 bg-wave ">Easiest Way</span><br />to Get Your New Job
                </h1>
                <p class="text-sm font-semibold text-gray-600 mt-8 px-1 leading-6">
                    Each month, more than 3 million job seekers turn to
                    <br /> our website in their search for work, making over 140,000
                    <br /> applications every single day
                </p>
                <div class="flex mt-8 bg-white rounded-lg shadow-xl h-20 p-3">
                    <div class="flex items-center px-2 py-1 hidden md:flex">
                        <svg class="h-4 w-4 text-slate-400" fill="none" viewBox="4 0 24 19" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <select v-model="selectedOptionIndustry" id="optionsIndustry" :class="{'text-custom': selectedOptionIndustry === ''}" class="rounded-sm border-0 text-sm pl-3 options-bar">
                            <option value="" class="text-custom">Industry</option>
                            <option v-for="option in optionsIndustry" :key="option" :value="option">
                                {{ option }}
                            </option>
                        </select>
                        <p class="text-sm px-2 text-slate-600">|</p>
                    </div>
                    <div class="flex items-center px-2 py-1 hidden md:flex">
                        <svg class="h-4 w-4 text-slate-400" fill="none" viewBox="2 0 24 20" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <select v-model="selectedOptionLocation" id="optionsLocation" :class="{'text-custom': selectedOptionLocation === ''}" class="rounded-sm border-0 text-sm pl-3 options-bar">
                            <option value="" class="text-custom">Location</option>
                            <option v-for="option in optionsLocation" :key="option" :value="option">
                                {{ option }}
                            </option>
                        </select>
                        <p class="text-sm px-2 text-slate-600">|</p>
                    </div>
                    <div class="flex items-center px-2 py-1">
                        <svg class="h-4 w-4 text-slate-400 hidden md:flex" width="24" height="24" viewBox="2 0 24 18" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
                        <form @submit.prevent="getData" class="mr-3 flex gap-3" style="margin-top: -5px;">
                            <input v-model="searchQuery" type="text" @input="showSuggestions = true" class="rounded-sm search-bar  font-sans" placeholder="Keywords" required />
                            <button type="submit" class="h-9 mt-2 ml-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:ml-10  flex items-center">
                                <svg class="h-4 w-4 text-white" viewBox="0 0 24 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <p class="pl-2">Search</p>
                            </button>
                        </form>
                    </div>
                </div>
                <!-- <div class="mt-8 flex flex-wrap">
                  <p class="text-sm font-semibold">Popular Searches:</p>
                  <p class="text-xs pl-2 pt-1 underline">Content Writer . Finance . Human Resource . Management</p>
              </div> -->
            </div>
            <div class="col-span-2">
                <img src="https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2023/03/hero-image.png" class="p-5 mt-6" />
            </div>
            <div class=""></div>
        </div>
    </div>
    <div>
        <ul v-if="searchQuery && showSuggestions" class="suggestions font-sans">
            <li v-for="(task, index) in filteredTasks" :key="index" @click="selectTask(task)" class="cursor-pointer">
                {{ task.subject }}
            </li>
        </ul>
    </div>
    <div class="p-2"></div>
</template>

<script>
import apiService from './services/apiService.js';

export default {
data() {
  return {
    searchQuery: '',
    showSuggestions: false,
    taskDetails: [],
    statusFilter: ['Open', 'Working', 'Overdue', 'Pending Review'],
    serviceFilter: ['REC-I', 'REC-D'],
    vacFilter: 0, // Not equals
    selectedOptionIndustry: '',
    optionsIndustry: [],
    selectedOptionLocation: '',
    optionsLocation: [],
  };
},
computed: {
  filteredTasks() {
    return this.taskDetails.filter(task => {
      const keywordMatch = task.subject.toLowerCase().includes(this.searchQuery.toLowerCase());
      const industryMatch = this.selectedOptionIndustry ? task.custom_job_category === this.selectedOptionIndustry : true;
      const locationMatch = this.selectedOptionLocation ? task.territory === this.selectedOptionLocation : true;
      
      return keywordMatch && industryMatch && locationMatch;
    });
  }
},

mounted() {
  this.fetchTasks();
},
methods: {
  async fetchTasks() {
    const filters = {
      statusFilter: this.statusFilter,
      serviceFilter: this.serviceFilter,
      vacFilter: this.vacFilter,
    };
    this.taskDetails = await apiService.fetchData(filters);
    this.showIndustryOptions()
    this.showLocationOptions()
  },
  showIndustryOptions() {
      const jobCategorySet = new Set();
      this.taskDetails.forEach(task => {
        if (task.custom_job_category) {
          jobCategorySet.add(task.custom_job_category); 
        }
      });
      this.optionsIndustry = Array.from(jobCategorySet);
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
  onVisibilityChange(isVisible, entry) {
      if (isVisible) {
        entry.target.classList.add("fade-in");
      } else {
        entry.target.classList.remove("fade-in");
      }
    },
  
  selectTask(task) {
    this.searchQuery = task.subject; 
    this.showSuggestions = false;
  },
  
  hideSuggestions() {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200); 
  },
  
  getData() {
  const filteredTasks = this.filteredTasks;
  
  if (filteredTasks.length > 0) {
    const task = filteredTasks[0]; // Use the first matched task
    this.$router.push({ name: 'JobDetails', params: { taskName: task.name } });
  } else {
    // Handle the case where no tasks match the filters
    console.log('No tasks found');
  }
}

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
  top: 530px;
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
  border: hidden;
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
</style>
