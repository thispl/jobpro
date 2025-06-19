<template>
  <div>
    <!-- Block : category -->
    <div class="fade-section">
      <div class="text-center">
        <h1 class="font-bold text-1 font-sans mt-6 text-category mobile-view">Browse by Category</h1>
        <p class="m-3 text-md text-gray-600 font-semibold mt-3 text_2 capitalize">Find the job that's perfect for you, about 800+ new jobs everyday</p>
      </div>
      <div class="justify-center flex flex-row flex-wrap gap-5 md:gap-14 mt-14 w-10/12 mx-auto fade-section ">
        <div v-for="task in distinctCategories" :key="task.custom_job_category">
          <router-link :to="{ path: '/find-a-job', query: { category: task.custom_job_category } }">
            <div v-if="task.custom_job_category" class="border border-slate-200 rounded-lg max-w-52 py-3 category-card fade-in category-mob">
              <div class="flex flex-row pl-4 category-img" style="width: 230px">
                <!-- <img :src="task.custom_jobpro_image" :alt="category-task.name"><br /> -->
                <div class="pl-3 md:pl-6">
                  <h1 class="font-sans font-bold text-3 category-min">{{ task.custom_job_category }}</h1>
                  <p class="text-xs text-gray-600 font-semibold category-count">{{ categoryCount(task.custom_job_category) }} Jobs Available</p>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Block : We are hiring -->
    <div class="my-16 fade-section we-class">
      <div class="border border-slate-200 bg-white rounded-md mx-10 md:mx-52 shadow-md block md:flex text-center justify-center md:gap-24 py-5 we-class1">
        <div>
          <img src="https://i.postimg.cc/pdRxWWS9/Screenshot-2024-10-08-114830.png" width=100px class="hidden md:flex" />
        </div>
        <div class="md:flex gap-16 mt-5 we-class2">
          <div>
            <p class="text-4 font-bold we-class3">WE ARE</p>
            <h1 class="font-bold dark:text-gray-900 text-1 font-sans  we-class4">HIRING</h1>
          </div>
          <div class="text-4 text-gray-600 font-bold py-3 we-class5">
            <p>Let's <span class="text-3 dark:text-gray-900 we-class6">Work</span> Together</p>
            <p>& <span class="text-3 dark:text-gray-900 we-class7">Explore</span> Opportunities</p>
          </div>
          <div class="py-4 mx-auto" style="width: 100px">
            <router-link to="/find-a-job" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600 transition-transform flex flex-row">
              <p>Apply Now</p>
            </router-link>
          </div>
        </div>
        <div>
          <img src="https://i.postimg.cc/TwPKPqsW/Screenshot-2024-10-08-115422.png" width=150px class="mt-2 hidden md:flex" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from './services/apiService.js';

export default {
  data() {
    return {
      taskDetails: [],  
      statusFilter: ['Open', 'Working', 'Overdue', 'Pending Review'],
      serviceFilter: ['REC-I', 'REC-D'],
      vacFilter: 0, 
    };
  },
  mounted() {
    this.fetchTasks();
    this.addIntersectionObserver(); 
  },
  computed: {
    distinctCategories() {
      const seen = new Set();
      return this.taskDetails.filter(task => {
        const isDuplicate = seen.has(task.custom_job_category);
        seen.add(task.custom_job_category);
        return !isDuplicate;
      });
    },
  },
  methods: {
    async fetchTasks() {
      const filters = {
        statusFilter: this.statusFilter,
        serviceFilter: this.serviceFilter,
        vacFilter: this.vacFilter,
      };
      this.taskDetails = await apiService.fetchData(filters);
    },
    categoryCount(category) {
      // Count the number of jobs in a specific category
      return this.taskDetails.filter(task => task.custom_job_category === category).length;
    },
    addIntersectionObserver() {
      const fadeSections = document.querySelectorAll('.fade-section');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.onVisibilityChange(entry.isIntersecting, entry);
        });
      }, {
        threshold: 0.1 // Adjust as needed (this means 10% of the element must be visible to trigger)
      });

      fadeSections.forEach(section => observer.observe(section));
    },
    onVisibilityChange(isVisible, entry) {
      if (isVisible) {
        entry.target.classList.add('fade-in');
      } else {
        entry.target.classList.remove('fade-in');
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
  transition: border-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.text-category {
  font-size: 2rem;
}

.text-1 {
  font-size: 2rem;
  color: #05264e;
}

.text-2 {
  font-size: 1rem;
  color: #6c757d;
}

.text-3 {
  font-size: 0.9rem;
  color: #05264e;
}

.text-4 {
  color: #6c757d;
}
@media (max-width: 575.98px) {
  .mobile-view {
    font-size: 25px;
  }
  .category-min{
    font-size:9px;
  }
  .category-mob{
    width:122px;
    padding-top: 8px;
    padding-left: 10px;
  }
  .category-img{
    max-width:30px;
  }
  .category-count{
    font-size:7px;
    width:80px;
  }
  .we-class1{
    width: 250px;
    padding:10px;
  }
  .we-class{
    margin-left:20px;
  }
  /* .we-class2{
    font-size:10px;
    padding-left: 0px;
  }  */
  /* .we-class4{
    font-size:10px;
  }
  .we-class5{
    font-size:10px;
  }
  .we-class6{
    font-size:10px;
  }
  .we-class7{
    font-size:10px;
  } */ 
  
}

</style>
