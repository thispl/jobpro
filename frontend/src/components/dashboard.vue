<template>
    
    <ConfettiEffect ref="confettiRef" :triggerOnMount="false" />
    <!-- Shimmer -->
    <div v-if="topSection" class="flex mt-10 mx-10 gap-5 justify-center font-sans">
        <div v-for="i in 5" :key="i" class="bg-white shadow-lg shadow-gray-600 rounded-lg px-6 py-4 w-60 flex">
            <div class="w-11 h-11 animate-pulse bg-gray-300 rounded-full"></div>
            <div class="pl-4">
                <!-- <p class="text-[#777b76] font-semibold text-xs">Earnables</p> -->
                <div class="bg-gray-300 rounded-md h-4 w-16 animate-pulse"></div>
                <div class="bg-gray-300 rounded-md mt-2 h-5 w-20 animate-pulse"></div>
            </div>
        </div>
    </div>

    <!-- <transition> -->
    <div v-if="!topSection" class="flex mt-10 mx-10 gap-5 justify-center font-sans">
        <div class="bg-white shadow-lg shadow-gray-600 rounded-lg px-6 py-4 w-60 flex">
            <div class="flex items-center bg-[whitesmoke] rounded-full px-2.5 py-2.5">
                <svg class="h-6 w-6 text-blue-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />
                    <path d="M12 3v3m0 12v3" />
                </svg>
            </div>
            <div class="pl-4">
                <p class="text-[#777b76] font-semibold text-xs">Earnables</p>
                <h1 class="text-[#05264e] text-xl font-bold mt-2">₹{{ totalEarnables }}/-</h1>
            </div>
        </div>
        <div class="bg-white shadow-lg shadow-gray-600 rounded-lg px-6 py-4 w-60 flex">
            <div class="flex items-center bg-[whitesmoke] rounded-full px-2.5 py-2.5">
                <svg class="h-6 w-6 text-blue-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                </svg>
            </div>
            <div class="pl-4">
                <p class="text-[#777b76] font-semibold text-xs">Referrals</p>
                <h1 class="text-[#05264e] text-xl font-bold mt-2">{{ referrals }}</h1>
            </div>
        </div>
        <div class="bg-white shadow-lg shadow-gray-600 rounded-lg px-6 py-4 w-60 flex">
            <div class="flex items-center bg-[whitesmoke] rounded-full px-2.5 py-2.5">
                <svg class="h-6 w-6 text-blue-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="9" y1="15" x2="15" y2="9" />
                    <circle cx="9.5" cy="9.5" r=".5" fill="currentColor" />
                    <circle cx="14.5" cy="14.5" r=".5" fill="currentColor" />
                    <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7a2.2 2.2 0 0 0 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1a2.2 2.2 0 0 0 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55 v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55 v-1" />
                </svg>
            </div>
            <div class="pl-4">
                <p class="text-[#777b76] font-semibold text-xs">Points</p>
                <h1 class="text-[#05264e] text-xl font-bold mt-2">{{ points }}</h1>
            </div>
        </div>
        <div class="bg-white shadow-lg shadow-gray-600 rounded-lg px-6 py-4 w-60 flex">
            <div class="flex items-center bg-[whitesmoke] rounded-full px-2.5 py-2.5">
                <svg class="h-6 w-6 text-blue-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />
                    <path d="M12 3v3m0 12v3" />
                </svg>
            </div>
            <div class="pl-4">
                <p class="text-[#777b76] font-semibold text-xs">Received</p>
                <h1 class="text-[#05264e] text-xl font-bold mt-2">₹{{ received }}/-</h1>
            </div>
        </div>
        <div class="bg-white shadow-lg shadow-gray-600 rounded-lg px-6 py-4 w-60 flex">
            <div class="flex items-center bg-[whitesmoke] rounded-full px-2.5 py-2.5">
                <svg class="h-6 w-6 text-blue-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />
                    <path d="M12 3v3m0 12v3" />
                </svg>
            </div>
            <div class="pl-4">
                <p class="text-[#777b76] font-semibold text-xs">Outstanding</p>
                <h1 class="ml-auto text-[#05264e] text-xl font-bold mt-2">₹{{ outstanding }}/-</h1>
            </div>
        </div>
    </div>
    <!-- </transition> -->

    <!-- Shimmer -->
    <div v-if="middleSection" class="flex justify-center">
        <div class="mt-10 grid grid-cols-12 gap-8 w-full m-10">
            <div class="col-span-8 bg-white shadow-lg shadow-gray-600 rounded-xl p-6 pb-14">
                <div class="flex">
                    <div class="bg-gray-300 rounded-md h-6 w-[62%] mb-4 animate-pulse"></div>
                    <div class="bg-gray-300 mt-[-5px] ml-auto w-[30%] rounded-lg h-8 w-16 animate-pulse"></div>
                </div>
                <div class="flex justify-center gap-5 mt-6 w-full">
                    <div v-for="i in 4" :key="i" class="w-[25%] text-center">
                        <div class="flex justify-center">
                            <div class="bg-gray-300 rounded-full h-16 w-16 animate-pulse"></div>
                        </div>
                        <div class="flex justify-center mt-3">
                            <div class="bg-gray-300 rounded-md h-5.5 w-[75%] animate-pulse"></div>
                        </div>
                        <div class="flex justify-center mt-1">
                            <div class="bg-gray-300 rounded-md h-5 w-[90%] animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div to="/referpro/refer-candidate" class="col-span-4 bg-white shadow-lg shadow-gray-600 rounded-xl p-6">
                <div class="bg-gray-300 rounded-md h-6 w-[45%] animate-pulse mb-4"></div>
                <div class="bg-gray-300 rounded-md h-5 w-full animate-pulse mt-1"></div>
                <div class="bg-gray-300 rounded-md h-5 w-full animate-pulse mt-1"></div>
                <div class="bg-gray-300 rounded-md h-5 w-full animate-pulse mt-1"></div>
                <div class="bg-gray-300 rounded-md h-5 w-[60%] animate-pulse mt-1"></div>
                <div class="mt-8 text-white bg-gray-300 h-8 rounded-sm w-full"></div>
            </div>
        </div>
    </div>

    <!-- <transition> -->
    <div v-if="!middleSection" class="flex justify-center">
        <div class="mt-10 grid grid-cols-12 gap-8 w-full m-10">
            <div class="col-span-8 bg-white shadow-lg shadow-gray-600 rounded-xl p-6 pb-14">
                <div class="flex">
                    <h1 class="text-[#05264e] font-semibold text-xl mb-5 capitalize">Help your friends get a job and get rewarded</h1>
                    <div class="ml-auto w-[200px] mt-[-4px]">
                        <img src="https://i.postimg.cc/3JyRDgdL/Artboard-2.png" width="250px" />
                    </div>
                </div>
                <div class="flex mr-1 text-center w-full justify-center gap-5 mt-6">
                    <div class="w-[25%]">
                        <div class="flex justify-center">
                            <svg class="h-16 w-16 rounded-full pl-1 py-5 bg-white shadow-lg shadow-gray-600" xmlns="http://www.w3.org/2000/svg" fill="#0070cc" viewBox="0 20 576 512">
                                <path d="M352 224l-46.5 0c-45 0-81.5 36.5-81.5 81.5c0 22.3 10.3 34.3 19.2 40.5c6.8 4.7 12.8 12 12.8 20.3c0 9.8-8 17.8-17.8 17.8l-2.5 0c-2.4 0-4.8-.4-7.1-1.4C210.8 374.8 128 333.4 128 240c0-79.5 64.5-144 144-144l80 0 0-61.3C352 15.5 367.5 0 386.7 0c8.6 0 16.8 3.2 23.2 8.9L548.1 133.3c7.6 6.8 11.9 16.5 11.9 26.7s-4.3 19.9-11.9 26.7l-139 125.1c-5.9 5.3-13.5 8.2-21.4 8.2l-3.7 0c-17.7 0-32-14.3-32-32l0-64zM80 96c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-48c0-17.7 14.3-32 32-32s32 14.3 32 32l0 48c0 44.2-35.8 80-80 80L80 512c-44.2 0-80-35.8-80-80L0 112C0 67.8 35.8 32 80 32l48 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L80 96z" />
                            </svg>
                        </div>
                        <p class="mt-4 text-[#05264e] font-semibold">Send Invitation</p>
                        <p class="mt-1 text-sm text-[#70756f] text-center">Fill the referral form</p>
                    </div>
                    <div class="w-[25%]">
                        <div class="flex justify-center ">
                            <svg class="h-16 w-16 rounded-full pl-1 py-5 bg-white shadow-lg shadow-gray-600" fill="#0070cc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                            </svg>
                        </div>
                        <p class="mt-4 text-[#05264e] font-semibold">Registration</p>
                        <p class="mt-1 text-sm text-[#70756f] text-center">Let your friends register</p>
                    </div>
                    <div class="w-[25%]">
                        <div class="flex justify-center ">
                            <svg class="h-16 w-16 rounded-full py-5 bg-white shadow-lg shadow-gray-600" fill="#0070cc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M184 48l144 0c4.4 0 8 3.6 8 8l0 40L176 96l0-40c0-4.4 3.6-8 8-8zm-56 8l0 40L64 96C28.7 96 0 124.7 0 160l0 96 192 0 128 0 192 0 0-96c0-35.3-28.7-64-64-64l-64 0 0-40c0-30.9-25.1-56-56-56L184 0c-30.9 0-56 25.1-56 56zM512 288l-192 0 0 32c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-32L0 288 0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-128z" />
                            </svg>
                        </div>
                        <p class="mt-4 text-[#05264e] font-semibold">Got Placed</p>
                        <p class="mt-1 text-sm text-[#70756f] text-center">Let your friends get jobs</p>
                    </div>
                    <div class="w-[25%]">
                        <div class="flex justify-center ">
                            <svg class="h-16 w-16 rounded-full py-5 bg-white shadow-lg shadow-gray-600" fill="#0070cc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                            </svg>
                        </div>
                        <p class="mt-4 text-[#05264e] font-semibold">Get Reward</p>
                        <p class="mt-1 text-sm text-[#70756f] text-center">Claim your reward</p>
                    </div>
                </div>
            </div>
            <router-link to="/referpro/refer-candidate" class="col-span-4 bg-white shadow-lg shadow-gray-600 rounded-xl p-6">
                <h1 class="text-[#05264e] font-semibold text-xl mb-5">Invite friends!</h1>
                <p class="text-[#05264e] font-medium text-[15px]">At <span class="text-[#0070cc] font-semibold">REFERPRO</span>, we believe in the power of connections! Now, you can help your friends discover amazing job opportunities while earning exciting rewards for yourself</p>
                <div class="flex justify-center gap-2 mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 font-medium rounded-sm text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400 w-full">
                    <svg class="h-4 w-4" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                    </svg>
                    <p>Invite Friend</p>
                </div>
            </router-link>
        </div>
    </div>
    <!-- </transition> -->

    <!-- Shimmer -->
    <div v-if="bottomSection" class="bg-white min-h-20 mb-10 shadow-lg shadow-gray-600 rounded-lg mx-10 p-5">
        <div class="bg-gray-300 rounded-md h-6 w-28 animate-pulse mt-1"></div>
        <div class="mt-5">
            <div class="flex w-full justify-center text-[#808080] font-medium">
                <div class="w-[25%]">
                    <p class="h-6 w-20 rounded-lg bg-gray-300 animate-pulse"></p>
                </div>
                <div class="w-[13%]">
                    <p class="h-6 w-10 rounded-lg bg-gray-300"></p>
                </div>
                <div class="w-[25%]">
                    <p class="h-6 w-20 rounded-lg bg-gray-300 animate-pulse"></p>
                </div>
                <div class="w-[10%]">
                    <p class="h-6 w-20 rounded-lg bg-gray-300 animate-pulse"></p>
                </div>
                <div class="w-[13%]">
                    <p class="h-6 w-20 rounded-lg bg-gray-300 animate-pulse"></p>
                </div>
                <div class="w-[12%]">
                    <p class="h-6 w-20 rounded-lg bg-gray-300 animate-pulse"></p>
                </div>
            </div>
            <hr class="mt-3">
            <div v-for="i in 3" :key="i" class="flex w-full mt-3 justify-center text-[#05264e] font-medium">
                <div class="w-[25%] animate-pulse flex gap-4">
                    <img src="https://i.ibb.co/ss8RQ38/user.png" width="50px" class="rounded-full" />
                    <div class="pt-3 ">
                        <p class="h-6 w-[170px] rounded-lg bg-gray-300 animate-pulse"></p>
                    </div>
                </div>
                <div class="pt-3 w-[13%]">
                    <p class="h-6 w-24 rounded-lg bg-gray-300 animate-pulse"></p>
                </div>
                <div class="pt-3 w-[25%]">
                    <p class="h-6 w-[90%] rounded-lg bg-gray-300 animate-pulse"></p>
                </div>
                <div class="pt-3 w-[10%]">
                    <p class="h-6 w-[60%] rounded-lg bg-gray-300 animate-pulse"></p>
                </div>
                <div class="pt-3 w-[13%]">
                    <p class="h-6 w-[80%] rounded-lg bg-gray-300 animate-pulse"></p>
                </div>
                <div class="pt-2 w-[12%]">
                    <p class="h-8 w-[80%] rounded-lg bg-gray-300 animate-pulse"></p>
                </div>
            </div>
        </div>
    </div>
    <!-- <transition> -->
    <div v-if="!bottomSection" v-show="index" class="bg-white min-h-20 mb-10 shadow-lg shadow-gray-600 rounded-lg mx-10 p-5">
        <p class="text-xl text-[#05264e] font-semibold">Referrals</p>
        <div class="mt-5">
            <div class="flex w-full justify-center text-[#808080] font-medium">
                <p class="w-[25%]">Name</p>
                <p class="w-[13%]">ID</p>
                <p class="w-[25%]">Email</p>
                <p class="w-[10%]">Points</p>
                <p class="w-[13%]">Status</p>
                <p class="w-[12%]">Action</p>
            </div>
            <hr class="mt-3">
            <div v-if="this.candidateDetails.length>0" v-for="candidate in this.candidateDetails" :key="candidate" class="flex w-full mt-3 justify-center text-[#05264e] font-medium">
                <div class="w-[25%] flex gap-4">
                    <img v-if="candidate.candidate_image" :src="'https://erp.teamproit.com/'+candidate.candidate_image" width="50px" class="rounded-full shadow-lg shadow-gray-400"/>
                    <img v-else src="https://i.ibb.co/ss8RQ38/user.png" width="50px" class="rounded-full shadow-lg shadow-gray-400" />
                    <p class="pt-3">{{ candidate.given_name }}</p>
                </div>
                <div class="w-[13%] pt-3">{{ candidate.name }}</div>
                <div class="w-[25%] pt-3">{{ candidate.mail_id }}</div>
                <div class="w-[10%] pt-3">{{ candidate.points }}</div>
                <div class="w-[13%] pt-3">{{ candidate.converted_status || 'Loading...' }}</div>
                <div class="w-[12%] pt-2" v-if="candidate.converted_status == 'Invitation Sent'">
                    <button @click="remindEvent(candidate.mobile_number, candidate.given_name, candidate.mail_id, candidate.position)" class="w-full flex items-center px-3 gap-2 py-1 border border-[#4ace57] rounded-md bg-[#e9f7f3]">
                        <img src="https://i.postimg.cc/Ss6G0dg8/whatsapp.png" width="20px" />
                        <p class="text-md pr-1 font-medium text-[#31bb45]">Remind</p>
                    </button>
                </div>
                <div v-else-if="candidate.converted_status == 'Proposed PSL'" class="w-[12%] pt-2">
                    <button @click="claimEvent(userCandidate, candidate.name)" class="w-full flex items-center px-3 gap-2 py-1 border border-[#d97400] rounded-md bg-[#fffbea]">
                        <img src="https://d2rj3iig8nko29.cloudfront.net/staging/media/invite-and-earn-images/rupee.png" width="20px" />
                        <p class="text-md pr-1 font-medium text-[#faa300]">Claim</p>
                    </button>
                </div>
                <div v-else class="w-[12%] pt-2">
                    <button class="w-full cursor-not-allowed opacity-[0.6] flex items-center px-3 gap-2 py-1 border border-[#d97400] rounded-md bg-[#fffbea]">
                        <img src="https://d2rj3iig8nko29.cloudfront.net/staging/media/invite-and-earn-images/rupee.png" width="20px" />
                        <p class="text-md pr-1 font-medium text-[#faa300]">Claim</p>
                    </button>
                </div>
            </div>
            <div v-else class="ml-5 text-center justify-center mt-5">
                <p class="font-semibold leading-[2] text-xl text-[#05264e]">Still waiting to make your first referral?<br> Now’s the perfect time! Share the opportunity and help someone grow.</p>
                <!-- <button class="text-white bg-[#0070cc] px-5 mt-3 py-2.5 text-sm font-medium rounded-sm">Start Referring Now</button> -->
            </div>
        </div>
    </div>
    <div v-if="loading" class="text-center loading-overlay">
        <p><span class="loader"></span></p>
    </div>
    <!-- </transition> -->
</template>
<script>
    import { ref } from 'vue';
    import apiService from '../services/apiService';
    import confetti from "https://cdn.skypack.dev/canvas-confetti";
    import ConfettiEffect from './confetti.vue';

    import {
        inject
    } from 'vue';
    export default {
        components: {
            ConfettiEffect
        },
        data() {
            return {
                inputName: "",
                isNameFocused: false,
                isMailFocused: false,
                isMobileFocused: false,
                isPassportFocused: false,
                isPositionFocused: false,
                position: '',
                positions: [],
                filteredPositions: [],
                showPositionSuggestions: false,
                referrals: 0,
                earnings: 0,
                points: 0,
                totalEarnables: 0,
                outstanding: 0,
                index: 3,
                received: 0,
                candidate: null,
                ownerFilter: [],
                candidateDetails: [],
                topSection: true,
                middleSection: true,
                bottomSection: true,
                userCandidate: null,
                loading: false,
            };
        },
        mounted() {
            this.positionList();
            this.fetchReferredCandidate();
            this.loadShimmer();
            this.getCandidateFromMail(localStorage.emailId).then((result) => {
                this.userCandidate = result;
            });
        },
        setup() {
            const confettiRef = ref(null);
            const launchConfetti = () => {
                confettiRef.value?.trigger();
            };

            return {
                confettiRef,
                launchConfetti
            };
        },

        methods: {
            handleBlur() {
                if (!this.inputName) {
                    this.isNameFocused = false;
                }
                if (!this.inputMail) {
                    this.isMailFocused = false;
                }
                if (!this.inputMobile) {
                    this.isMobileFocused = false;
                }
                if (!this.inputPassport) {
                    this.isPassportFocused = false;
                }
                if (!this.inputPosition) {
                    this.isPositionFocused = false;
                    this.showPositionSuggestions = false;
                }
            },

            handleFocusPosition() {
                this.isPositionFocused = true;
                this.showAllPositions();
            },
            handleBlurPosition() {
                if (!this.position) {
                    this.isPositionFocused = false;
                }

                this.showPositionSuggestions = false;
            },
            filterPositions() {
                if (this.position) {
                    this.filteredPositions = this.positions.filter(position =>
                        position.toLowerCase().includes(this.position.toLowerCase())
                    );
                } else {
                    this.filteredPositions = [...this.positions];
                }
                this.showPositionSuggestions = true;
            },
            showAllPositions() {
                this.filteredPositions = [...this.positions];
                this.showPositionSuggestions = true;
            },
            selectPosition(position) {
                this.position = position;
                this.showPositionSuggestions = false;
            },

            async positionList() {
                try {
                    const response = await apiService.getPositionList();
                    this.response = response.data.message;
                    if (Array.isArray(this.response)) {
                        this.positions = this.response;
                    } else if (typeof this.response === "string") {
                        this.positions = this.response.split(",").map(position => position.trim());
                    }
                    this.filteredPositions = [...this.positions];
                } catch (error) {
                    console.error("Failed to fetch position details:", error);
                }
            },

            inviteFriend() {
                this.referrals += 1;
                this.totalEarnables += 1000;
                this.outstanding += 1000;
                this.points += 100;
                this.index += 1;
            },

            async claimEvent(supplier, item) {
                this.loading = true;
                try {
                    const response = await apiService.createPurchaseInvoice(supplier, item);
                    if (response.data.message === "ok") {
                        this.launchConfetti()
                    }
                } catch (error) {
                    console.error("Failed to create Invoice", error);
                } finally {
                    this.loading = false;
                }
            },


            // async claimEvent(item, ) {
            //     console.log(userMail)
            //     try {
            //         const response = await apiService.getCandidateID(userMail);
            //         this.response = response.data.message;
            //         return this.response;
            //     } catch (error) {
            //         console.error("Failed to fetch Candidate ID", error);
            //     }
            // },

            async fetchReferredCandidate() {
                const filters = {
                    ownerFilter: localStorage.emailId,
                };

                // Step 1: Fetch candidates from API
                const data = await apiService.fetchCandidateDirectly(filters);
                this.candidateDetails = data;
                // Step 2: Add converted_status field
                for (let candidate of this.candidateDetails) {
                    if (candidate.pending_for === "Sourced") {
                        try {
                            const status = await this.CheckConvertedStatus(candidate.mail_id);
                            candidate.converted_status = status; 
                            if (status == "Invitation Sent") {
                                this.action = '';
                            }
                        } catch (err) {
                            console.error("Error resolving status for", candidate.mail_id, err);
                            candidate.converted_status = "Error";
                        }
                    } else {
                        candidate.converted_status = candidate.pending_for;
                    }
                    if (candidate.task) {   
                        try {
                            const points = await this.getPoints(candidate.task);
                            candidate.points = points
                            this.points += points;
                            this.totalEarnables += points * 10
                            this.outstanding = this.totalEarnables - this.received
                        } catch (err) {
                            console.error("Error resolving status for", candidate.task, err);
                            this.points = 0;
                            candidate.points = points
                        }
                    }
                    else {
                        candidate.points = 0
                    }
                }

                // Step 3: Update other state
                this.referrals = this.candidateDetails.length;

                if (!!this.candidateDetail) {
                    this.topSection = false;
                    this.middleSection = false;
                    this.bottomSection = false;
                } else {
                    this.topSection = false;
                    this.middleSection = false;
                    this.bottomSection = false;
                }
            },


            loadShimmer() {
                setTimeout(() => {}, 2000);
            },
            async CheckConvertedStatus(email) {
                const response = await apiService.getConvertedStatus(email);
                return response.data.message === true ? "Sourced" : "Invitation Sent";
            },

            async getPoints(task) {
                const response = await apiService.pointsCalculation(task);
                return response.data.message
            },

            remindEvent(mobile, name, email, position) {
                const encodedName = encodeURIComponent(name);
                const encodedEmail = encodeURIComponent(email);
                const encodedPhone = encodeURIComponent('+91' + mobile);
                
                const message = `Hello ${name},\n\nI have referred you for the position *${position}*. If you're interested, please register here:\n\nhttp://139.5.190.19:8080/registration/?reference=${encodedName}&email=${encodedEmail}&name=${encodedName}&phone=${encodedPhone}`;
                
                const url = `https://wa.me/${encodedPhone}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
            },

            triggerConfetti() {
                confetti();
            },

            async getCandidateFromMail(userMail) {
                try {
                    const response = await apiService.getCandidateID(userMail);
                    this.response = response.data.message;
                    return this.response;
                } catch (error) {
                    console.error("Failed to fetch Candidate ID", error);
                }
            },

        },
    };
</script>

<style>
    .input-group {
        position: relative;
        width: 100%;
        max-width: 300px;
        height: 18px;
        font-size: 1.25rem;
        --primary: #0070cc;
    }

    .input {
        all: unset;
        width: 90%;
        height: 18px;
        padding: 8px;
        border: 1px solid gray;
        font-size: 10px;
        transition: border-color 0.3s ease;
        background-color: transparent;
        color: #05264e;
        font-size: 1.25rem;
    }

    /* Floating Label */
    .label {
        position: absolute;
        top: 7px;
        padding-left: 5px;
        left: 1rem;
        color: gray;
        font-size: 14px;
        transition: all 0.3s ease-in-out;
        pointer-events: none;
    }

    /* Move label on focus or when input has value */
    .label-active {
        top: -10px;
        left: 15px;
        font-size: 0.8rem;
        color: var(--primary);
        background-color: white;
        padding: 0px 3px;
        font-style: bold;
    }

    .input-active .input {
        border: 2px solid #0070cc;
    }

    .input:focus {
        border: 1px solid #0070cc;
        border-width: 1px;
        outline: none !important;
    }

    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.1s ease-in-out;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
</style>