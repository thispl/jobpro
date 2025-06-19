<template>
    <!-- Block: Banner -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 m-14 w-10/12 mx-auto relative height-style capitalize fade-section"
      v-observe-visibility="{ callback: onVisibilityChange }"
    >
      <div class="container flex justify-center items-center relative">
        <img src="https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2023/03/Card.png" width="400px" class="z-10 absolute lg:top-[-30px] lg:left-[-120px] hidden md:flex " />
        <img src="https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2023/03/Medium_Safety.png" width="350px" class="z-10 absolute lg:top-[350px] lg:right-[-80px] hidden md:flex " />
        <img src="https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2023/03/about-center.png" class="rounded-lg z-0 mx-auto" />
      </div>
      <div class="flex items-center justify-center">
        <div class="pl-20 left-div">
            <p class="font-sans font-bold text-1 min-font">Millions of jobs.</p>
            <h1 class="font sans font-bold text-2 min-font1">Find the one that's<br> <span class="text-3 right-space">Right</span> for you</h1>
            <p class="font-sans text-4 min-font3">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 600,000 companies worldwide. The right job is out there.</p>
            <div class="flex mt-9 gap-10 min-font4">
                <router-link to="/find-a-job" type="button" class=" min-font5 tab-min md:py-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-4 px-8 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600 transition-transform flex flex-row">
                    <p>Apply Now</p>
                </router-link>
                <p class="text-4 underline learn-fun">Learn More</p>
            </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-4 my-10 gap-4 w-10/12 mx-auto fade-section space-div" v-observe-visibility="{ callback: onVisibilityChange }">
        <div class="text-center">
            <h1 class="text-3 font-bold max-font tab-font">25K+</h1>
            <h1 class="text-5 font-semibold max-h">Completed Cases</h1>
            <p class="text-6 max-des description">We always provide people a <br> complete solution upon focused of <br> any business</p>
        </div>
        <div class="text-center">
            <h1 class="text-3 font-bold max-font1 tab-font1">17K+</h1>
            <h1 class="text-5 font-semibold max-h1">Our Office</h1>
            <p class="text-6 max-des1 description1">We always provide people a <br> complete solution upon focused of <br> any business</p>
        </div>
        <div class="text-center">
            <h1 class="text-3 font-bold max-font2 tab-font2">86K+</h1>
            <h1 class="text-5 font-semibold max-h2">Skilled People</h1>
            <p class="text-6 max-des2 description2">We always provide people a <br> complete solution upon focused of <br> any business</p>
        </div>
        <div class="text-center">
            <h1 class="text-3 font-bold max-font3 tab-font3">28K+</h1>
            <h1 class="text-5 font-semibold max-h3">Happy Clients</h1>
            <p class="text-6 max-des3 description3">We always provide people a <br> complete solution upon focused of <br> any business</p>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    onVisibilityChange(isVisible, entry) {
      if (isVisible) {
        entry.target.classList.add("fade-in");
      } else {
        entry.target.classList.remove("fade-in");
      }
    }
  }
};
</script>

<style>
.height-style {
    height: 600px;
}
.text-1 {
    color: #a0abb8;
    font-size: 2rem;
}
.text-2 {
    color: #05264e;
    font-size: 3rem;
}
.text-3 {
    color: #3c65f5;
    font-size: 3rem;
}
.text-4 {
    margin-top: 10px;
    color: #1e4166;
    font-size: 1rem;
}
.text-5 {
    color: #05264e;
    font-size: 1.3rem;
}
.text-6 {
    margin-top: 10px;
    color: #1e4166;
    font-size: 0.9rem;
}

/* Fade-in and fade-out styles */
.fade-section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1s ease-out, transform 1s ease-out;
}

.fade-in {
    opacity: 1;
    transform: translateY(0);
}
@media (max-width: 575.98px) {
.learn-fun{
  font-size:15px;
  width:80px;
  white-space: nowrap;
  padding-right: 10px;
}
.min-font{
  font-size:30px;
  text-align: center;
  margin-left: 0px;
  margin-right: 70px;

}
.space-div{
  margin-bottom: 30px;
}
.left-div{
  padding-left: 0px;
  /* background-color: aqua; */
}
.min-font1{
  font-size:23px;
  text-align: center;
  margin-left: 0px;
  margin-right: 55px;
}
.right-space{
  font-size:30px;
  
}
.min-font3{
  font-size:10px;
  text-align: center;
  padding-right: 40px;
  
}
.min-font4{
  width:200px;
  font-size:10px;
  margin-right:90px !important;
}
.min-font5{
  margin-bottom: 100px;
  text-align: center;
  margin-left: 0px !important;
  margin-right: 0px ;
  padding-left: 25px !important;
  padding-top:10px;
  padding-bottom: 10px;
}
.max-font{
  font-size:20px;
  width:20px;
}
.max-h{
  font-size:13px;
  width:20px;
}
.max-des{
  font-size:8px;
  width:80px;
  text-align: left;
}
.max-font1{
  font-size:20px;
}
.max-h1{
  font-size:13px;
  padding-bottom: 20px;
}
.max-des1{
  font-size:8px;
  width:80px;
  text-align: left;
}
.max-font2{
  font-size:20px;
}
.max-h2{
  font-size:13px;
}
.max-des2{
  font-size:8px;
  width:80px;
  text-align: left;
}
.max-font3{
  font-size:20px;
}
.max-h3{
  font-size:13px;
}
.max-des3{
  font-size:8px;
  width:80px;
  text-align: left;
  padding-top:0px;
}
}
@media(max-width: 991.98px) {
  .tab-font{
    padding-top: 30px;
  }
  .tab-font1{
    padding-top: 30px;
  }
  .tab-font2{
    padding-top: 30px;
  }
  .tab-font3{
    padding-top: 30px;
  }
  .tab-min{
    margin-bottom: 100px;
    text-align: center;
    /* margin-left: 120px; */
  }
  .description{
    font-size:12px;
  }
  .description1{
    font-size:12px;
  }
  .description2{
    font-size:12px;
    /* padding-top:20px; */
  }
  .description3{
    font-size:12px;
    /* padding-top:20px; */
    padding-top:0px;
  }
}

</style>
