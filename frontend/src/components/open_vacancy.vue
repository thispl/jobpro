<template>
    <div class="flex m-10 gap-10">
        <div v-if="!shimmerLoadingTask" class="w-[40%]">
            <div v-for="task in filteredTasks" :key="task.name">
                <div 
                    @click="key = task.name; fetchTaskDetails(task.name)" 
                    :class="[
                        'cursor-pointer border rounded-md bg-white px-5 relative pt-2 scroll-smooth mb-5 shadow-lg hover:shadow-gray-600',
                        'transition duration-500 ease-in-out transform',
                        task.name === key ? 'scale-105' : 'scale-100'
                    ]"
                    >

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
                        <p class=" rounded-md">Vac: {{ task.vac }}</p>
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
                        <button @click="navigateToReferFriend(task.subject)" class="ml-auto flex gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[12px] px-4 py-1 text-center ml-2">
                            <svg class="h-4 w-4 pt-1" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                            </svg>
                            <p class="py-0.5">Invite Friend</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="shimmerLoadingTask" class="w-[40%]">
            <div class="flex flex-col gap-5">
                <div v-for="n in 3" :key="n" class="bg-[white] p-5 shadow-lg min-h-[233px] max-h-[233px] shadow-gray-600 rounded-lg">
                    <div class="bg-gray-300 rounded-md h-6 w-[70%] animate-pulse"></div>
                    <div class="flex gap-3 mt-5">
                        <div class="bg-gray-300 rounded-md h-6 w-[10%] animate-pulse"></div>
                        <div class="bg-gray-300 rounded-md h-6 w-[30%] animate-pulse"></div>
                    </div>
                    <div class="bg-gray-300 rounded-md mt-3 h-5 w-[60%] animate-pulse"></div>
                    <div class="flex gap-3">
                        <div class="bg-gray-300 rounded-md mt-3 h-7 w-[30%] animate-pulse"></div>
                        <div class="bg-gray-300 rounded-md mt-3 h-7 w-[20%] animate-pulse"></div>
                        <div class="bg-gray-300 rounded-md mt-3 h-7 w-[30%] animate-pulse"></div>
                    </div>
                    <div class="flex">
                        <div class="bg-gray-300 rounded-md mt-7 h-6 w-[35%] animate-pulse"></div>
                        <div class="bg-gray-300 ml-auto rounded-md mt-6 h-8 w-[35%] animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="shimmerLoadingDescription" class="w-[60%] bg-white max-h-[530px] sticky top-3 shadow-lg shadow-gray-600 rounded-lg p-5">
            <div class="bg-gray-300 rounded-md h-8 w-[50%] animate-pulse"></div>
            <div class="bg-gray-300 rounded-md h-7 mt-2 w-[70%] animate-pulse"></div>
            <div class="bg-gray-300 rounded-md h-24 mt-4 w-[100%] animate-pulse"></div>
            <div class="bg-gray-300 rounded-md h-8 mt-5 w-[40%] animate-pulse"></div>
            <div class="bg-gray-300 rounded-md h-6 ml-5 mt-4 w-[90%] animate-pulse"></div>
            <div class="bg-gray-300 rounded-md h-6 ml-5 mt-2 w-[90%] animate-pulse"></div>
            <div class="bg-gray-300 rounded-md h-6 ml-5 mt-2 w-[90%] animate-pulse"></div>
            <div class="bg-gray-300 rounded-md h-6 ml-5 mt-2 w-[40%] animate-pulse"></div>
            <div class="bg-gray-300 rounded-md h-6 ml-5 mt-4 w-[90%] animate-pulse"></div>
            <div class="bg-gray-300 rounded-md h-6 ml-5 mt-2 w-[90%] animate-pulse"></div>
            <div class="bg-gray-300 rounded-md h-6 ml-5 mt-2 w-[40%] animate-pulse"></div>
        </div>
        <div v-if="!shimmerLoadingDescription" class="w-[60%] bg-white shadow-lg max-h-[530px] sticky top-3 shadow-gray-600 rounded-lg p-5">
            <div class="mt-1">
                <h1 class="text-2xl font-semibold text-[#05264e]">{{ task.subject }}</h1>
                <h2 class="text-xl pt-3 font-semibold text-gray-700">{{ task.customer }}</h2>
            </div>
            <div class="mt-3 rounded-md p-3 bg-[#efeff5]">
                <div class="m-2">
                    <div class="flex flex-wrap text-[10px] text-[#001d4e] gap-3 font-semibold">
                        <h1 class="font-semibold text-[#000048] text-xl">Job Highlights</h1>
                    </div>
                    <ul class="font-medium mt-1.5 text-[15px] text-gray-700 pl-2 list-disc pl-6">
                        <li>Qualification: {{ task.qualification_type }}<span v-if="task.specialization"> (need specialization in {{ task.specialization }})</span></li>
                                <li v-if="task.minimum_experience>0">Experience: <span>{{ task.minimum_experience }}<span v-if="task.maximum_experience>0">-{{ task.maximum_experience }}</span> years of experience</span></li>
                                <li v-else>Experience: <span>Fresher</span></li>
                                <li v-if="task.gulf_experience>0">Gulf Experience: <span class="">{{ task.gulf_experience }} years of experience</span></li>
                            </ul>
                </div>
            </div>
            <div class="pt-6 p-2 text-[13px] text-[#000048] font-semibold max-h-[300px] overflow-y-scroll">
                <h1 class="font-semibold text-[#000048] text-xl">Job Description</h1>
                <p class="pt-2 px-2 text-gray-800 text-[15px] font-medium" v-html="task.description"></p>
                <h1 class="font-semibold text-[#000048] text-xl mt-6">Job Benefits</h1>
                <div class="flex justify-center flex-wrap text-center w-[90%] gap-6 mt-5">
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
    </div>
</template>

<script>
import apiService from '../services/apiService';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { inject } from 'vue';

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
            needToApplyResume: false,
            applicantCount: 0,
            jobApplied: false,
            appliedJobs: {},
            shimmerLoadingTask: false,
            shimmerLoadingDescription: false,
            conAmt: 0,
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
        this.shimmerLoadingTask = true;
        this.shimmerLoadingDescription = true;
        this.candidateDetails();
        this.addIntersectionObserver();
        this.fetchTasks().then(() => {
            if (this.taskDetails.length > 0 && !this.$route.params.taskName) {
                this.fetchTaskDetails(this.taskDetails[0].name);
            }
        });
        setTimeout(() => {
            this.shimmerLoadingTask = false;
            this.shimmerLoadingDescription = false;
        }, 2000);
    },
    watch: {
        '$route.params.taskName': {
            immediate: true,
            handler(newTaskName) {
                this.fetchTaskDetails(newTaskName);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    },
    methods: {
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
                    this.appliedJobs[task] = true;
                }
            }
        },
        async fetchTasks() {
            const filters = {
                limit: 40,
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
        async checkIfApplied(task) {
            const response = await apiService.findAppliedJobs(task);
            this.$set(this.appliedJobs, task.name, response?.data.message === "true");
        },
        async candidateDetails() {
            try {
                if (this.profileMail.emailId) {
                    const response = await apiService.getCandidateDetails(this.profileMail.emailId);
                    this.id = response.data.message.name;
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
        async fetchTaskDetails(taskName) {
            this.shimmerLoadingDescription = true;
            setTimeout(() => {
                this.shimmerLoadingDescription = false;
            }, 2000);
            this.task = await apiService.getTaskDetails(taskName);
            this.custom_recruiter_contact = this.task.custom_recruiter_contact || null;
            const response = await apiService.getApplicantCounts(this.task.name, this.id);
            this.applicantCount = response.data.message[0];
            this.jobApplied = response.data.message[0];
        },
        applyViaWhatsapp() {
            const message = `Hello, I am interested in applying for the position of ${this.task.subject} with the reference number ${this.task.name}.`;
            const recruiterContact = this.task.custom_recruiter_contact || '7305428777';
            const url = `https://wa.me/${recruiterContact}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        },
        timeAgo(date) {
            if (!date) return "Unknown";
            let parsedDate = new Date(date);
            if (isNaN(parsedDate.getTime())) {
                parsedDate = new Date(date.replace(" ", "T") + "Z");
            }
            if (isNaN(parsedDate.getTime())) return "Invalid date";
            return formatDistanceToNow(parsedDate, { addSuffix: true }).replace(/^about\s/, '');
        },
        addIntersectionObserver() {
            const fadeSections = document.querySelectorAll('.fade-section');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    this.onVisibilityChange(entry.isIntersecting, entry);
                });
            }, { threshold: 0.1 });
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
                const fileUrl = response.data.message.file_url;
                if (fileUrl) {
                    const updateRes = await apiService.updateResume(fileUrl, this.id);
                    if (updateRes?.status === 200) {
                        window.location.reload();
                    }
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                this.loading = false;
            }
        },
        async findApplied(task) {
            const response = await apiService.findAppliedJobs(task);
            return response?.data.message === "true";
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
        navigateToReferFriend(subject) {
            if (!!localStorage.getItem('authToken'))
            {
                this.$router.push(`/referpro/refer-candidate/?position=${subject}`);
            }
            else {
                this.$router.push(`/login`);
            }
        },
        

    }
};
</script>

<style>
.image-size {
        height: 20px;
        width: 20px;
        margin-top: -3px;
    }
</style>
