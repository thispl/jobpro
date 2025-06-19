<template>
    <div class="border bg-[#efeff5] mx-5 rounded-lg font-sans scroll-smooth" :class="{'opacity-[0.5] blur-sm': showLoginPopup}">
        <div class="flex m-10 mx-20 gap-5">
            <div class="w-[65%]">
                <div class="bg-white shadow-lg shadow-gray-600 p-5 rounded-lg">
                    <div class="mt-1">
                        <h1 class="text-3xl font-semibold text-[#05264e]">{{ task.subject }}</h1>
                        <h2 class="text-xl pt-3 font-semibold text-[#474d6a]">{{ task.customer }}</h2>
                    </div>
                    <div class="flex gap-2 text-sm mt-2">
                        <div class="flex mt-2">
                            <svg class="h-4 w-4 text-[#05264e] mt-[-1px]" fill="none" viewBox="0 0 24 19.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <p v-if="task.minimum_experience > 0" class="font-medium text-[#474d6a] pl-1 pt-0.5">{{ task.minimum_experience }} <span v-if="task.maximum_experience > 0">- {{ task.maximum_experience }}</span> years</p>
                            <p v-else class="font-medium text-[#474d6a] pl-1 pt-0.5">Fresher</p>
                        </div>
                        <div class="mt-2">
                            <p class="text-xs py-1 text-[#474d6a]">|</p>
                        </div>
                        <div class="flex mt-2">
                            <h1 class="font-semibold text-[#05264e] pl-1 pt-0.5">{{task.currency}}</h1>
                            <p class="font-medium text-[#474d6a] pl-1 pt-0.5">{{ task.amount }} / month</p>
                        </div>
                    </div>
                    <div class="flex text-sm">
                        <img :src="task.custom_country_flag" alt="country flag" class="h-5 w-5" />

                        <h2 class="font-semibold text-[#474d6a] pl-1 pt-1 uppercase">{{ task.territory }}</h2>
                    </div>
                    <div class="flex gap-3 text-xs mt-3">
                        <div v-if="task.accommodation!='Included in Salary'" class="flex shadow-sm gap-1 bg-[#e3f1fd] py-1 px-2 rounded-md ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#001d4e" class="h-5 w-3.5" viewBox="0 0 576 512">
                                <path d="M560 64c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16H16C7.2 0 0 7.2 0 16v32c0 8.8 7.2 16 16 16h16v384H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h240v-80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v80h240c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-16V64h16zm-304 44.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm0 96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm-128-96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zM179.2 256h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8zM192 384c0-53 43-96 96-96s96 43 96 96H192zm256-140.8c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-96c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4z" />
                            </svg>
                            <p class="mt-1 font-semibold text-[#002a5d]">Accommodation</p>
                        </div>
                        <div v-if="task.food!='Included in Salary'" class="flex gap-1 shadow-sm bg-[#e3f1fd] py-1 px-2 rounded-md transition-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-3" fill="#001d4e" viewBox="0 0 448 512">
                                <path d="M416 0C400 0 288 32 288 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 0-112 0-208c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7L80 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16l0 134.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8L64 16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z" />
                            </svg>
                            <p class="mt-1 font-semibold text-[#002a5d]">Food</p>
                        </div>
                        <div v-if="task.transportation!='Included in Salary'" class="flex gap-1 shadow-sm bg-[#e3f1fd] py-1 px-2 rounded-md transition-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-3" fill="#001d4e" viewBox="0 0 448 512">
                                <path d="M224 0C348.8 0 448 35.2 448 80l0 16 0 320c0 17.7-14.3 32-32 32l0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32-192 0 0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32L0 96 0 80C0 35.2 99.2 0 224 0zM64 128l0 128c0 17.7 14.3 32 32 32l256 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L96 96c-17.7 0-32 14.3-32 32zM80 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                            </svg>
                            <p class="mt-1 font-semibold text-[#002a5d]">Transportation</p>
                        </div>
                        <div v-if="task.over_time=='Applicable'" class="flex gap-1 shadow-sm bg-[#e3f1fd] py-1 px-2 rounded-md transition-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-3" fill="#001d4e" viewBox="0 0 512 512">
                                <path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9L0 168c0 13.3 10.7 24 24 24l110.1 0c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24l0 104c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65 0-94.1c0-13.3-10.7-24-24-24z" />
                            </svg>
                            <p class="mt-1 font-semibold text-[#002a5d]">OT</p>
                        </div>
                    </div>
                    <hr class="mt-4">
                    <div class="flex mt-5">
                        <div class="flex text-sm text-[#474d6a] mt-1 gap-1 mt-2.5">
                            <p class="font-medium text-[#474d6a] pl-1">Posted: <span class="font-semibold">{{ timeAgo(task.creation) }}</span></p>
                            <p>|</p>
                            <p class="font-medium text-[#474d6a] pl-1">Openings: <span class="font-semibold">{{ task.vac }}</span></p>
                            <p>|</p>
                            <p class="font-medium text-[#474d6a] pl-1">Applicants: <span class="font-semibold">Less than {{ applicantCount }}</span></p>

                        </div>
                        <div class="flex ml-auto gap-3">
                            <button v-if="!jobApplied" class="flex gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 ml-auto text-[white] font-sans px-3 p-1 text-sm rounded-full font-semibold" @click="applyJobs(task.name, task.subject, task.custom_recruiter_contact, id)">
                                <p class="px-2 py-2">Apply Now</p>
                            </button>
                            <button v-if="jobApplied" class="flex cursor-not-allowed jobs-applied gap-3 ml-auto text-[white] font-sans px-3 p-1 text-sm rounded-full font-semibold">
                                <p class="px-2 py-2">Applied</p>
                            </button>
                            <button class="flex gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 ml-auto text-[white] font-sans px-3 p-1 text-sm rounded-full font-semibold" @click="referJob()">
                                <!-- <img src="https://i.postimg.cc/DZrm79ct/output-onlinepngtools.png" width="30px" /> -->
                                <p class="px-2 py-2">Refer a friend</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="bg-white shadow-lg shadow-gray-600 rounded-lg mt-5 pb-5 mb-5">
                    &nbsp;
                    <div class="rounded-md shadow p-3 mx-6 bg-[#efeff5]">
                        <div class="m-3">
                            <div class="flex flex-wrap text-[10px] text-[#001d4e] gap-3 font-semibold">
                                <h1 class="font-semibold text-[#000048] text-2xl">Job Highlights</h1>
                            </div>
                            <ul class="font-medium mt-1.5 text-[15px] text-gray-700 pl-2 list-disc pl-6">
                                <li>Qualification: {{ task.qualification_type }}<span v-if="task.specialization"> (need specialization in {{ task.specialization }})</span></li>
                                <li v-if="task.minimum_experience>0">Experience: <span>{{ task.minimum_experience }}<span v-if="task.maximum_experience>0">-{{ task.maximum_experience }}</span> years of experience</span></li>
                                <li v-else>Experience: <span>Fresher</span></li>
                                <li v-if="task.gulf_experience>0">Gulf Experience: <span class="">{{ task.gulf_experience }} years of experience</span></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div class="rounded-md my-6 mx-7">
                            <div class="text-[13px] text-[#000048] font-semibold">
                                <h1 class="font-semibold text-[#000048] text-2xl">Job Description</h1>
                                <p class="pt-2 px-2 text-gray-800 text-[15px] font-medium" v-html="task.description"></p>
                                <!-- <div class="font-medium text-[#000048] pl-2 text-[15px]">
                                    <p v-if="task.working_days">Working Hours: <span class="text-[#394264]">{{ task.working_days }} hrs</span></p>
                                    <p v-if="task.contract_period_year">Contract Period: <span class="text-[#394264]">{{ task.contract_period_year }} years of contract</span></p>
                                    <p v-if="task.joining_ticket">Joining Ticket: <span class="text-[#394264]">Flight ticket will be booked by {{ task.joining_ticket }}</span></p>
                                    <p v-if="task.transportation">Transportation:
                                        <span class="text-[#394264]" v-if="task.transportation=='Free'">Free transportation</span>
                                        <span class="text-[#394264]" v-if="task.transportation=='Allowance'">Allowance of {{ task.currency }} {{ task.transportation_allowance }}</span>
                                        <span class="text-[#394264]" v-if="task.transportation=='Included in Salary'">Allowance will be {{ task.transportation }}</span>
                                    </p>
                                    <p v-if="task.food">Food:
                                        <span class="text-[#394264]" v-if="task.food=='Free'">Free food</span>
                                        <span class="text-[#394264]" v-if="task.food=='Allowance'">Allowance of {{ task.currency }} {{ task.food_allowance }}</span>
                                        <span class="text-[#394264]" v-if="task.food=='Included in Salary'">Allowance will be {{ task.food }}</span>
                                    </p>
                                    <p v-if="task.accommodation">Accommodation:
                                        <span class="text-[#394264]" v-if="task.accommodation=='Free'">Free accommodation</span>
                                        <span class="text-[#394264]" v-if="task.accommodation=='Allowance'">Allowance of {{ task.currency }} {{ task.accommodation_allowance }}</span>
                                        <span class="text-[#394264]" v-if="task.accommodation=='Included in Salary'">Allowance will be {{ task.accommodation }}</span>
                                    </p>
                                    <p v-if="task.over_time">Over Time: <span class="text-[#394264]">{{ task.over_time }}</span></p>
                                    <p v-if="task.any_other_allowance">Other Allowance: <span class="text-[#394264]">{{ task.any_other_allowance }}</span></p>
                                    &nbsp;
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="shadow-lg shadow-gray-600 bg-white rounded-lg p-5">
                    <p class="text-2xl font-medium text-[#000048]">Job Benefits</p>
                    <div class="flex">
                        <div class="flex flex-wrap text-center w-full m-6">
                            <!-- Working Hours -->
                            <div class="w-[25%]">
                                <div class="flex justify-center">
                                    <svg class="h-16 w-16 rounded-full py-5 bg-white shadow-lg shadow-gray-600" xmlns="http://www.w3.org/2000/svg" fill="#0070cc" viewBox="0 0 512 512">
                                        <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                                    </svg>
                                </div>
                                <p class="mt-4 text-[#05264e] text-[15px] font-semibold">Working Hours</p>
                                <p v-if="task.working_days!='Others'" class="mt-1 text-sm text-[#70756f] font-medium text-center">{{ task.working_days}} of work each day </p>
                                <p v-else class="mt-1 text-sm text-[#70756f] font-medium text-center">{{ task.other_working_hours}} of work each day </p>
                            </div>
                            <!-- Transportation -->
                            <div class="w-[25%]">
                                <div class="flex justify-center">
                                    <svg class="h-16 w-16 rounded-full py-5 bg-white shadow-lg shadow-gray-600" xmlns="http://www.w3.org/2000/svg" fill="#0070cc" viewBox="0 0 448 512">
                                        <path d="M224 0C348.8 0 448 35.2 448 80l0 16 0 320c0 17.7-14.3 32-32 32l0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32-192 0 0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32L0 96 0 80C0 35.2 99.2 0 224 0zM64 128l0 128c0 17.7 14.3 32 32 32l256 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L96 96c-17.7 0-32 14.3-32 32zM80 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                                    </svg>
                                </div>
                                <p class="mt-4 text-[#05264e] text-[15px] font-semibold">Transportation</p>
                                <p v-if="task.transportation=='Allowance'" class="mt-1 text-sm text-[#70756f] font-medium text-center">{{ task.transportation_allowance}} will be provided as allowance </p>
                                <p v-else class="mt-1 text-sm text-[#70756f] font-medium text-center">Transportation will be <span class="lowercase">{{ task.transportation}}</span></p>
                            </div>
                            <!-- Contract Period -->
                            <div class="w-[25%]">
                                <div class="flex justify-center">
                                    <svg class="h-16 w-16 rounded-full py-5 bg-white shadow-lg shadow-gray-600" xmlns="http://www.w3.org/2000/svg" fill="#0070cc" viewBox="0 0 640 512">
                                        <path d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8 512 128l-.7 0-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48 0 224 28.2 0 91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123zM16 128c-8.8 0-16 7.2-16 16L0 352c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-224-80 0zM48 320a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM544 128l0 224c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-208c0-8.8-7.2-16-16-16l-80 0zm32 208a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z" />
                                    </svg>
                                </div>
                                <p class="mt-4 text-[#05264e] text-[15px] font-semibold">Contract Period</p>
                                <p v-if="task.contract_period_year>0" class="mt-1 text-sm text-[#70756f] font-medium text-center">{{ task.contract_period_year}} years<span v-if="task.contract_period__month>0">& {{ task.contract_period__month }} months</span> of contract </p>
                            </div>
                            <!-- Joining Ticket -->
                            <div class="w-[25%]">
                                <div class="flex justify-center">
                                    <svg class="h-16 w-16 rounded-full py-5 bg-white shadow-lg shadow-gray-600" xmlns="http://www.w3.org/2000/svg" fill="#0070cc" viewBox="0 0 576 512">
                                        <path d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z" />
                                    </svg>
                                </div>
                                <p class="mt-4 text-[#05264e] text-[15px] font-semibold">Flight Ticket</p>
                                <p v-if="task.joining_ticket!='Reimbursable'" class="mt-1 text-sm text-[#70756f] font-medium text-center">Ticket will be booked by {{ task.joining_ticket }}</p>
                                <p v-else class="mt-1 text-sm text-[#70756f] font-medium text-center">Ticket cost will be repaid</p>
                            </div>
                            <!-- Food -->
                            <div class="w-[25%]">
                                <div class="flex justify-center">
                                    <svg class="h-16 w-16 rounded-full py-5 bg-white shadow-lg shadow-gray-600" xmlns="http://www.w3.org/2000/svg" fill="#0070cc" viewBox="0 0 448 512">
                                        <path d="M416 0C400 0 288 32 288 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 0-112 0-208c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7L80 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16l0 134.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8L64 16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z" />
                                    </svg>
                                </div>
                                <p class="mt-4 text-[#05264e] text-[15px] font-semibold">Food</p>
                                <p v-if="task.food=='Allowance'" class="mt-1 text-sm text-[#70756f] font-medium text-center">{{ task.food_allowance }} will be provided as food allowance</p>
                                <p v-else class="mt-1 text-sm text-[#70756f] font-medium text-center">Food cost will be <span class="lowercase">{{ task.food }}</span></p>
                            </div>
                            <!-- Accomodation -->
                            <div class="w-[25%]">
                                <div class="flex justify-center">
                                    <svg class="h-16 w-16 rounded-full py-5 bg-white shadow-lg shadow-gray-600" xmlns="http://www.w3.org/2000/svg" fill="#0070cc" viewBox="0 0 384 512">
                                        <path d="M48 0C21.5 0 0 21.5 0 48L0 464c0 26.5 21.5 48 48 48l96 0 0-80c0-26.5 21.5-48 48-48s48 21.5 48 48l0 80 96 0c26.5 0 48-21.5 48-48l0-416c0-26.5-21.5-48-48-48L48 0zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm112-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM80 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM272 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z" />
                                    </svg>
                                </div>
                                <p class="mt-4 text-[#05264e] text-[15px] font-semibold">Accommodation</p>
                                <p v-if="task.accommodation=='Allowance'" class="mt-1 text-sm text-[#70756f] font-medium text-center">{{ task.accommodation_allowance }} will be provided as food allowance</p>
                                <p v-else class="mt-1 text-sm text-[#70756f] font-medium text-center">Accomodation cost will be <span class="lowercase">{{ task.accommodation }}</span></p>
                            </div>
                            <!-- OT -->
                            <div class="w-[25%]">
                                <div class="flex justify-center">
                                    <svg class="h-16 w-16 rounded-full py-5 bg-white shadow-lg shadow-gray-600" xmlns="http://www.w3.org/2000/svg" fill="#0070cc" viewBox="0 0 384 512">
                                        <path d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64l0 11c0 42.4 16.9 83.1 46.9 113.1L146.7 256 78.9 323.9C48.9 353.9 32 394.6 32 437l0 11c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 256 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-11c0-42.4-16.9-83.1-46.9-113.1L237.3 256l67.9-67.9c30-30 46.9-70.7 46.9-113.1l0-11c17.7 0 32-14.3 32-32s-14.3-32-32-32L320 0 64 0 32 0zM96 75l0-11 192 0 0 11c0 19-5.6 37.4-16 53L112 128c-10.3-15.6-16-34-16-53zm16 309c3.5-5.3 7.6-10.3 12.1-14.9L192 301.3l67.9 67.9c4.6 4.6 8.6 9.6 12.1 14.9L112 384z" />
                                    </svg>
                                </div>
                                <p class="mt-4 text-[#05264e] text-[15px] font-semibold">Over Time</p>
                                <p v-if="task.over_time=='Applicable'" class="mt-1 text-sm text-[#70756f] font-medium text-center">Over time is <span class="lowercase">{{ task.over_time }}</span></p>
                                <p v-else class="mt-1 text-sm text-[#70756f] font-medium text-center">Over time is <span class="lowercase">{{ task.over_time }}</span></p>
                            </div>
                            <!-- Other Allowance -->
                            <div v-if="task.any_other_allowance" class="w-[25%]">
                                <div class="flex justify-center">
                                    <svg class="h-16 w-16 rounded-full py-5 bg-white shadow-lg shadow-gray-600" xmlns="http://www.w3.org/2000/svg" fill="#0070cc" viewBox="0 0 448 512">
                                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                                    </svg>
                                </div>
                                <p class="mt-4 text-[#05264e] text-[15px] font-semibold">Other Allowance</p>
                                <p class="mt-1 text-sm text-[#70756f] font-medium text-center">{{ task.any_other_allowance }}</p>
                            </div>
                            <!-- Visa Type -->
                            <div v-if="task.visa_type" class="w-[25%]">
                                <div class="flex justify-center">
                                    <svg class="h-16 w-16 rounded-full py-5 bg-white shadow-lg shadow-gray-600" xmlns="http://www.w3.org/2000/svg" fill="#0070cc" viewBox="0 0 576 512">
                                        <path d="M470.1 231.3s7.6 37.2 9.3 45H446c3.3-8.9 16-43.5 16-43.5-.2 .3 3.3-9.1 5.3-14.9l2.8 13.4zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM152.5 331.2L215.7 176h-42.5l-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1H32.7l-.7 3.1c15.8 4 29.9 9.8 42.2 17.1l35.8 135h42.5zm94.4 .2L272.1 176h-40.2l-25.1 155.4h40.1zm139.9-50.8c.2-17.7-10.6-31.2-33.7-42.3-14.1-7.1-22.7-11.9-22.7-19.2 .2-6.6 7.3-13.4 23.1-13.4 13.1-.3 22.7 2.8 29.9 5.9l3.6 1.7 5.5-33.6c-7.9-3.1-20.5-6.6-36-6.6-39.7 0-67.6 21.2-67.8 51.4-.3 22.3 20 34.7 35.2 42.2 15.5 7.6 20.8 12.6 20.8 19.3-.2 10.4-12.6 15.2-24.1 15.2-16 0-24.6-2.5-37.7-8.3l-5.3-2.5-5.6 34.9c9.4 4.3 26.8 8.1 44.8 8.3 42.2 .1 69.7-20.8 70-53zM528 331.4L495.6 176h-31.1c-9.6 0-16.9 2.8-21 12.9l-59.7 142.5H426s6.9-19.2 8.4-23.3H486c1.2 5.5 4.8 23.3 4.8 23.3H528z" />
                                    </svg>
                                </div>
                                <p class="mt-4 text-[#05264e] text-[15px] font-semibold">Visa Type</p>
                                <p class="mt-1 text-sm text-[#70756f] font-medium text-center">{{ task.visa_type }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-5 shadow-lg shadow-gray-600 rounded-lg bg-white p-6">
                    <h1 class="font-semibold text-[#000048] text-2xl">About Company</h1>

                    <div class="pl-3">
                        <p class="font-medium text-[#394264]">{{ task.customer }}</p>
                        <div class="flex">
                            <img v-if="task.custom_country_flag" :src="task.custom_country_flag" :alt="flag-task.name" class="image-size mr-2" />
                            <h2 class="text-sm font-sans text-[#001d4e] font-semibold pb-2 uppercase">{{ task.territory }}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-[35%]">
                <div v-for="task in filteredTasks" :key="task.name">
                    <div class="border rounded-md bg-white shadow-lg shadow-gray-600 transition-colors px-5 relative pt-2 scroll-smooth mb-5">

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
                            <img src="https://i.postimg.cc/SxqXPySH/info.png" class="ml-1.5 w-4 h-4 mt-2.5 opacity-50 cursor-pointer hover:opacity-100" @click="handleConversion()">
                            <button @click="handleApply(task.name)" class="text-blue-700 hover:text-blue-800 border border-blue-700 hover:border-blue-700 hover:shadow-sm font-medium hover:font-semibold rounded-md text-[12px] px-2 py-1 text-center ml-auto transition-full">
                                <p>Job Details</p>
                            </button>
                            <button v-if="!appliedJobs[task.name]" @click="applyJobs(task.name, task.subject, task.custom_recruiter_contact, id)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[12px] px-2 py-1 text-center ml-2">
                                <p>Apply Now</p>
                            </button>
                            <button v-if="appliedJobs[task.name]" class="text-white jobs-applied cursor-not-allowed hover:bg-blue-400 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[12px] px-2 py-1 text-center ml-2">
                                <p>Applied</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Transition name="fade-scale">
        <div v-if="showLoginPopup" class="fixed inset-0 flex justify-center items-center z-30">
            <div class="bg-white p-6 rounded-md border-0 shadow-lg shadow-gray-600 w-[300px]">
                <button @click="showLoginPopup=false" class="close-button h-5 w-5 ml-[90%]">
                    <img src="https://i.postimg.cc/dVQFYNh9/close.png" alt="close" class="mt-[-10px]" />
                </button>
                <p class="text-left font-semibold text-[#05264e]">You haven't signed in yet. Sign In to apply for a job.</p>
                <button class="bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 text-[white] font-sans px-3 p-1 text-sm rounded-md w-full mt-3 font-semibold" @click="pushToLoginPage()">
                    <p class="px-2 py-2 text-center">Sign In</p>
                </button>
            </div>

        </div>
    </Transition>
    <div v-if="needToApplyResume" class="fixed inset-0 bg-black bg-opacity-[0.5] flex justify-center items-center z-30">

        <div class="bg-white p-6 rounded-md border-0 shadow-xl w-[300px]">
            <button @click="needToApplyResume=false" class="close-button h-5 w-5 ml-[90%]">
                <img src="https://i.postimg.cc/dVQFYNh9/close.png" alt="close" class="mt-[-10px]" />
            </button>
            <div class="upload-btn-wrapper flex justify-center">
                <div class="border border-[#489eef] flex rounded-md px-4 py-1 bg-[#e9f3fd] gap-2 w-[100%]">
                    <div class="h-5 w-4.5"><img src="https://i.postimg.cc/wMkqc8sf/download-8-removebg-preview.png" width="100px" /></div>
                    <p class="pl-2 text-md text-[#3997ee] font-medium">Upload Resume</p>
                </div>
                <input v-bind:type="'file'" v-bind:name="'myfile'" ref="file" @change="handleFileUpload()" />
            </div>
            <center class="my-1">or</center>
            <button @click="applyViaWhatsapp(task_name, task_subject, task_contact)" class="cursor-pointer border border-[#5cc0a1] flex rounded-md px-4 py-1 bg-[#e9f7f3] gap-2 w-[100%]">
                <div class="h-6 w-6"><img src="https://i.postimg.cc/Ss6G0dg8/whatsapp.png" width="100px" /></div>
                <p class="pl-2.5 text-md text-gray-600 font-medium">Apply Via WhatsApp</p>
            </button>
        </div>

    </div>
    <div v-if="loading" class="z-40 text-center loading-overlay">
        <p><span class="loader"></span></p>
    </div>
</template>

<script>
    import apiService from './services/apiService';
    import axios from 'axios';
    import {
        formatDistanceToNow,
        min
    } from 'date-fns';
    import {
        inject
    } from 'vue';
    import {
        routeLocationKey
    } from 'vue-router';
    export default {
        data() {
            return {
                taskDetails: [],
                selectedCategory: null,
                serviceFilter: ['REC-I', 'REC-D'],
                vacFilter: 0,
                statusFilter: ['Open', 'Working', 'Overdue', 'Pending Review'],
                task: {
                    subject: '',
                    name: '',
                    description: '',
                    customer: '',
                    territory: '',
                    custom_recruiter_contact: null,
                },
                loading: false,
                id: '',
                full_name: '',
                image: '',
                company: '',
                position: '',
                conAmt: 0,
                needToApplyResume: false,
                applicantCount: 0,
                jobApplied: false,
                appliedJobs: {},
                isloggedIn: 0,
                showLoginPopup: false,
            };
        },
        computed: {
            filteredTasks() {
                if (!this.selectedCategory) return this.taskDetails;
                return this.taskDetails.filter(
                    (task) => task.custom_job_category === this.selectedCategory
                );
            },
        },
        setup() {
            const profileMail = inject('profileMail');
            return {
                profileMail
            };
        },
        mounted() {
            this.isloggedIn = localStorage.length
            console.log(this.isloggedIn)
            this.candidateDetails();
            this.fetchTaskDetails();
            this.addIntersectionObserver();
            this.fetchTasks();
            this.loadAppliedJobs();
        },
        watch: {
            '$route.params.taskName': {
                immediate: true,
                handler(newTaskName) {
                    this.fetchTaskDetails(newTaskName);
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }
        },
        methods: {
            async applyJobs(task, subject, contact, candidate) {
                if (this.isloggedIn > 0) {
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
                        this.loadAppliedJobs()
                    }
                } else {
                    this.showLoginPopup = true;
                }
            },
            async fetchTasks() {
                const filters = {
                    limit: 5,
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
            async handleConversion() {
                try {
                    const response = await apiService.convertToINR(this.task.currency, this.task.transportation_allowance);
                    if (response?.data?.message) {
                        this.conAmt = response.data.message;
                    } else {
                        console.error("Invalid response format:", response);
                        this.conAmt = "Conversion failed";
                    }
                } catch (error) {
                    console.error("Error converting currency:", error);
                    this.conAmt = "Conversion error";
                }
            },
            async checkIfApplied(task, id) {
                if (this.isloggedIn > 0) {
                    const response = await apiService.findAppliedJobs(task, id);
                    if (response && response.data.message === "true") {
                        this.$set(this.appliedJobs, task.name, true);
                    } else {
                        this.$set(this.appliedJobs, task.name, false);
                    }
                } else {
                    this.$set(this.appliedJobs, task.name, false);
                }
            },
            async loadAppliedJobs() {
                for (const task of this.filteredTasks) {
                    await this.checkIfApplied(task, this.id);
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
            handleApply(taskName) {
                this.$router.push(`/job-details/${taskName}`);

            },
            async fetchTaskDetails() {
                const taskName = this.$route.params.taskName;
                this.task = await apiService.getTaskDetails(taskName);
                this.custom_recruiter_contact = this.task.custom_recruiter_contact || null;
                const response = await apiService.getApplicantCounts(this.task.name, this.id);
                this.applicantCount = response.data.message[0];
                this.jobApplied = response.data.message[0];
                // const response = await apiService.convertToINR(this.task.currency, this.task.amount);
                // this.conAmt = response.data.message;
            },
            applyViaWhatsapp() {
                const message = `Hello, I am interested in applying for the position of ${this.task.subject} with the reference number ${this.task.name}.`;
                const recruiterContact = this.task.custom_recruiter_contact || '7305428777';
                const url = `https://wa.me/${recruiterContact}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
            },

            timeAgo(date) {
                if (!date) return "Unknown"; // Handle null/undefined values

                let parsedDate = new Date(date);

                // If the date is invalid, try formatting it properly
                if (isNaN(parsedDate.getTime())) {
                    parsedDate = new Date(date.replace(" ", "T") + "Z"); // Fix space issue
                }

                // If still invalid, return a fallback
                if (isNaN(parsedDate.getTime())) return "Invalid date";

                return formatDistanceToNow(parsedDate, {
                    addSuffix: true
                }).replace(/^about\s/, '');
            },

            referJob() {
                const message = `Hi John,
I came across a job vacancy post in JOBPRO application and thought it might be a great fit for you. Here's the position:

 *Job Title*: Marketing Manager  
 *Location*: New York  

You can check out the details and apply here: 

http://139.5.190.19:8080/registration/?reference=${this.id}

http://example.com`
                const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
            },
            addIntersectionObserver() {
                const fadeSections = document.querySelectorAll('.fade-section');

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        this.onVisibilityChange(entry.isIntersecting, entry);
                    });
                }, {
                    threshold: 0.1 // Adjust as needed
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
                        const response = await apiService.updateResume(fileUrl, this.id);
                        if (response && response.status == 200) {
                            this.changeUpload = true;
                            window.location.reload();
                        } else {
                            console.log("Hellloooooo")
                        }
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                    this.loading = false;
                }
            },
            async findApplied(task) {
                const response = await apiService.findAppliedJobs(task);
                if (response) {
                    console.log(response.data.message)
                    if (response.data.message == "true") {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            pushToLoginPage() {
                this.$router.push('/login')
            }

        }
    };
</script>

<style scoped>
    .image-size {
        height: 20px;
        width: 20px;
        margin-top: -3px;
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

    .jobs-applied {
        background-image: linear-gradient(to right, #32cd32, #648c11);
        transition: background-image 1s ease-in-out;
    }

    .jobs-applied:hover {
        background-image: linear-gradient(to left, #32cd32, #648c11);
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
</style>