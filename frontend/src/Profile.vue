<template>
    <div :class="{'opacity-[0.5]': loading}">
        <div class="mt-10 mx-auto w-10/12 font-sans">
            <div class="shadow-lg shadow-gray-600 rounded-lg bg-white p-10">
                <div class="flex gap-10 w-full">
                    <div class="w-[15%] relative hover:opacity-[0.7] ease-in transition-all">
                        <div class="w-[170px] h-[170px] rounded-full overflow-hidden">
                            <img v-if="candidateProfile" :src="candidateProfile" alt="profile" class="z-0 rounded-full" />
                            <img v-else src="https://i.ibb.co/ss8RQ38/user.png" alt="profile" class="z-0" />
                        </div>
                        <div v-if="this.hired" class="w-[250px] badge">
                            <img src="https://i.postimg.cc/508kzjsm/Screenshot-2025-01-22-102526-removebg-preview.png" alt="hired" />
                        </div>
                        <div v-if="this.openToWork" class="w-[250px] badge">
                            <img src="https://i.postimg.cc/MGdZ8SpB/Screenshot-2025-01-30-102218-removebg-preview.png" alt="open-to-work" />
                        </div>
                        <div class="cursor-pointer absolute inset-0 left-[60px] top-[80px] opacity-0 text-[#05264e] font-medium hover:opacity-100 transition-opacity duration-300">
                            <div class="upload-btn-wrapper">
                                <button>Change</button>
                                <input v-bind:type="'file'" v-bind:name="'profile'" ref="profile" @change="changeProfile()" />
                            </div>
                        </div>
                    </div>
                    <div class="w-[50%]">
                        <div class="flex">
                            <h1 class="text-3xl text-[#05264e] font-semibold">{{ profileName.fullName }}</h1><svg @click="showEdit = true" class="h-5 w-5 mt-1 ml-3 edit-icon" fill="#474d6a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
                            </svg>
                        </div>
                        <p v-if="id" class="text-lg font-medium text-[#474d6a] mt-2">{{ id }}</p>
                        <hr class="border-1 border-gray-300 my-3">
                        <div class="flex gap-5 w-ful">
                            <div class="w-[45%]">
                                <div class="flex mt-3 gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-[2px]" fill="#c6c3bd" viewBox="0 0 384 512">
                                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                                    </svg>
                                    <p v-if="location" class="text-md text-[#474d6a] font-semibold">{{ location }}</p>
                                    <p v-else class="text-md text-[#265df5] font-semibold">Add location</p>
                                </div>
                                <div class="flex gap-2 mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-[2px]" fill="#c6c3bd" viewBox="0 0 512 512">
                                        <path d="M184 48l144 0c4.4 0 8 3.6 8 8l0 40L176 96l0-40c0-4.4 3.6-8 8-8zm-56 8l0 40L64 96C28.7 96 0 124.7 0 160l0 96 192 0 128 0 192 0 0-96c0-35.3-28.7-64-64-64l-64 0 0-40c0-30.9-25.1-56-56-56L184 0c-30.9 0-56 25.1-56 56zM512 288l-192 0 0 32c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-32L0 288 0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-128z" />
                                    </svg>
                                    <p v-if="totalExp==0" class="text- text-[#474d6a] font-semibold">Fresher</p>
                                    <p v-else class="text- text-[#474d6a] font-semibold">Experienced</p>
                                </div>
                                <div class="flex gap-2 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-[2px]" fill="#c6c3bd" viewBox="0 0 448 512">
                                        <path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm80 64c-8.8 0-16 7.2-16 16l0 96c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16l0-96c0-8.8-7.2-16-16-16l-96 0z" />
                                    </svg>
                                    <p class="text- text-[#265df5] font-semibold">Add availability to join</p>
                                </div>
                            </div>
                            <div class="mt-3" style="border-left: 1px solid lightgray;height: 100px;"></div>
                            <div class="w-45%">
                                <div>
                                    <div class="flex gap-2 mt-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-[2px]" fill="#c6c3bd" viewBox="0 0 512 512">
                                            <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                                        </svg>
                                        <p v-if="mobile" class="text- text-[#474d6a] font-semibold">{{ this.country_code }} {{ this.mobile }}</p>
                                        <p v-else class="text-md text-[#265df5] font-semibold">Add mobile number</p>
                                    </div>
                                    <div class="flex gap-2 mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-[3px]" fill="#c6c3bd" viewBox="0 0 512 512">
                                            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                                        </svg>
                                        <p v-if="profileMail.emailId" class="text- text-[#474d6a] font-semibold">{{ profileMail.emailId }}</p>
                                        <p v-else class="text-md text-[#265df5] font-semibold">Add your email</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-[#fff2e3] w-[30%] rounded-lg p-5">
                        <div class="my-auto">
                            <div class="flex gap-2">
                                <div class="bg-white p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="#c6c3bd" viewBox="0 0 384 512">
                                        <path d="M80 0C44.7 0 16 28.7 16 64l0 384c0 35.3 28.7 64 64 64l224 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L80 0zm80 432l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                                    </svg>
                                </div>
                                <p class="font-semibold text-md text-[#474d6a] mt-1">Verify mobile number</p>
                            </div>
                            <div class="flex gap-2 mt-3">
                                <div class="bg-white p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="#c6c3bd" viewBox="0 0 384 512">
                                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                                    </svg>
                                </div>
                                <p class="font-semibold text-md text-[#474d6a] mt-1">Add preferred location</p>
                            </div>
                            <div class="flex gap-2 mt-3">
                                <div class="bg-white p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="#c6c3bd" viewBox="0 0 384 512">
                                        <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z" />
                                    </svg>
                                </div>
                                <p class="font-semibold text-md text-[#474d6a] mt-1">Add resume</p>
                            </div>
                            <div class="text-center mx-auto mt-3">
                                <button class="bg-[#f05537] text-white rounded-xl py-1 px-4 font-semibold">Add missing details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-8 gap-5 mt-7">
                <div class="col-span-2">
                    <div class="shadow-lg shadow-gray-600 bg-white rounded-lg p-4 sticky top-[100px]">
                        <h1 class="text-[#05264e] text-xl font-semibold">Quick Links</h1>
                        <div class="flex mt-8 ml-4 w-full">
                            <p class="text-md text-[#05264e] font-medium">Resume</p>
                            <a :href="'https://erp.teamproit.com/' + cv" target="_blank" v-if="changeUpload || cv" class="text-md font-medium text-[#265df5] text-right ml-auto">View</a>

                            <div class="upload-btn-wrapper text-right ml-auto mr-[35px]">
                                <button v-if="!changeUpload && !cv" class="text-md font-medium text-[#265df5] ">Upload</button>
                                <button v-if="changeUpload || cv" class="text-md font-medium text-[#265df5]">Change</button>
                                <input v-bind:type="'file'" v-bind:name="'myfile'" ref="file1" @change="handleFileUpload()" />
                            </div>
                        </div>
                        <div class="flex mt-8 ml-4 w-full">
                            <p class="text-md text-[#05264e] font-medium">Personal details</p>
                            <button @click="showPersonalDetails = true" class="text-md font-medium text-[#265df5] text-right ml-auto mr-[35px]">Add details</button>
                        </div>
                        <div class="flex mt-8 ml-4 w-full">
                            <p class="text-md text-[#05264e] font-medium">Contact details</p>
                            <button @click="showContactDetails = true" class="text-md font-medium text-[#265df5] text-right ml-auto mr-[35px]">Add details</button>
                        </div>
                        <div class="flex mt-8 ml-4 w-full">
                            <p class="text-md text-[#05264e] font-medium">Education details</p>
                            <button @click="showEducationDetails = true" class="text-md font-medium text-[#265df5] text-right ml-auto mr-[35px]">Add details</button>
                        </div>
                        <div class="flex mt-8 ml-4 w-full">
                            <p class="text-md text-[#05264e] font-medium">Experience details</p>
                            <button @click="showExperienceDetails = true" class="text-md font-medium text-[#265df5] text-right ml-auto mr-[35px]">Add details</button>
                        </div>
                        <div class="flex mt-8 mb-6 ml-4 w-full">
                            <p class="text-md text-[#05264e] font-medium">Passport details</p>
                            <button @click="showPassportDetails = true" class="text-md font-medium text-[#265df5] text-right ml-auto mr-[35px]">Add details</button>
                        </div>
                    </div>
                </div>
                <div class="col-span-6 ">
                    <div class="shadow-lg shadow-gray-600 bg-white rounded-lg pb-2">
                        <h1 class="text-[#05264e] text-xl font-medium p-4">Resume</h1>
                        <div class="m-6">
                            <div class="border relative flex bg-gradient-to-t from-[#feeef8] to-[white] overflow-hidden rounded-xl">
                                <div class="absolute z-0 h-[250px] left-[-100px] top-[-50px]">
                                    <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                                        <circle r="45" cx="50" cy="50" fill="#feecf1" />
                                    </svg>
                                </div>
                                <div class="flex">
                                    <img src="https://i.postimg.cc/wMkqc8sf/download-8-removebg-preview.png" width="100px" class="bg-white m-5 z-10 rounded-lg" />
                                    <div class="flex ml-[90px]  mt-[60px]">
                                        <h1 class="text-[#05264e] text-[30px] font-bold">Create Your <span class="text-[40px]">Resume</span></h1>
                                        <div class=" ml-[80px]  mt-[15px]">
                                            <button class="border rounded-full bg-[#1654f5] text-white px-3 py-1 font-semibold hover:bg-[#567bf3]">Create Resume</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="border border-gray-500 border-dashed rounded-xl mt-3">
                                <div class="flex justify-center py-8 gap-3">
                                    <div class="flex upload-btn-wrapper">

                                        <p v-if="!changeUpload && !cv" class="font-medium text-[#05264e]">Already have a resume ? <span><button v-if="!changeUpload && !cv" class="text-md font-medium text-[#265df5]">Upload</button></span></p>
                                        <p v-if="changeUpload || cv" class="font-medium text-[#05264e]">Need to re-upload your resume ? <span><button v-if="changeUpload || cv" class="text-md font-medium text-[#265df5]">Change</button></span></p>

                                        <input v-bind:type="'file'" v-bind:name="'myfile'" ref="file2" @change="handleFileUpload()" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Personal Details -->
                    <div class="shadow-lg shadow-gray-600 bg-white rounded-lg mt-4 p-5">
                        <div class="flex">
                            <h1 class="text-[#05264e] text-xl font-medium">Personal details</h1>
                            <button class="text-[#265df5] text-md font-medium ml-auto" @click="showPersonalDetails = true">
                                <h1>Add personal details</h1>
                            </button>
                        </div>
                        <p class="text-lg text-[#697499] mt-3">This information is important for employers to know you better</p>
                    </div>
                    <!-- Contact Details -->
                    <div class="shadow-lg shadow-gray-600 bg-white rounded-lg mt-4 p-5">
                        <div class="flex">
                            <h1 class="text-[#05264e] text-xl font-medium">Contact details</h1>
                            <button class="text-[#265df5] text-md font-medium ml-auto" @click="showContactDetails = true">
                                <h1>Add contact details</h1>
                            </button>
                        </div>
                        <p class="text-lg text-[#697499] mt-3">Add a contact details so that recruiters can reach you</p>
                    </div>
                    <!-- Education Details -->
                    <div class="shadow-lg shadow-gray-600 bg-white rounded-lg mt-4 p-5">
                        <div class="flex">
                            <h1 class="text-[#05264e] text-xl font-medium">Education details</h1>
                            <button class="text-[#265df5] text-md font-medium ml-auto" @click="showEducationDetails = true">
                                <h1>Add education details</h1>
                            </button>
                        </div>
                        <p class="text-lg text-[#697499] mt-3">Your qualifications help employers know your educational background</p>
                        <div v-if="degree" @click="showEducationDetails = true">
                            <button class="text-[#00014a] text-[15px] font-semibold mt-2">Degree details</button>
                            <p class="text-[#697499] text-[14px]">{{ qualification }} {{ specialization }}, Passed out in {{ year }} Year</p>
                        </div>
                        <div v-else @click="showEducationDetails = true">
                            <button class="text-[#265df5] text-[15px] font-semibold mt-2">Add Degree details</button>
                            <p class="text-[#697499] text-[14px]">Qualification, Passed out in Passing Year</p>
                        </div>
                        <div v-if="hsc" @click="showEducationDetailsHSC = true">
                            <button class="text-[#00014a] text-[15px] font-semibold mt-2">HSC details</button>
                            <p class="text-[#697499] text-[14px]">Scored {{ percentageHSC }}, Passed out in {{ yearHSC }} Year</p>
                        </div>
                        <div v-else @click="showEducationDetailsHSC = true">
                            <button class="text-[#265df5] text-[15px] font-semibold mt-2">Add HSC details</button>
                            <p class="text-[#697499] text-[14px]">Scored Percentage, Passed out in Passing Year</p>
                        </div>
                        <div v-if="sslc" @click="showEducationDetailsSSLC = true">
                            <button class="text-[#00014a] text-[15px] font-semibold mt-2">SSLC details</button>
                            <p class="text-[#697499] text-[14px]">Scored {{ percentageSSLC }}, Passed out in {{ yearSSLC }} Year</p>
                        </div>
                        <div v-else @click="showEducationDetailsSSLC = true">
                            <button class="text-[#265df5] text-[15px] font-semibold mt-2">Add SSLC details</button>
                            <p class="text-[#697499] text-[14px]">Scored Percentage, Passed out in Passing Year</p>
                        </div>
                    </div>
                    <!-- Experience details -->
                    <div class="shadow-lg shadow-gray-600 bg-white rounded-lg mt-4 p-5">
                        <div class="flex">
                            <h1 class="text-[#05264e] text-xl font-medium">Experience details</h1>
                            <button class="text-[#265df5] text-md font-medium ml-auto" @click="showExperienceDetails = true">Add experience details</button>
                        </div>
                        <p class="text-lg text-[#697499] mt-3">Your employment details will help recruiters understand your experience</p>
                    </div>
                    <!-- Passport Details-->
                    <div class="shadow-lg shadow-gray-600 bg-white rounded-lg mt-4 p-5">
                        <div class="flex">
                            <h1 class="text-[#05264e] text-xl font-medium">Passport details</h1>
                            <button class="text-[#265df5] text-md font-medium ml-auto" @click="showPassportDetails = true">Add passport details</button>
                        </div>
                        <p class="text-lg text-[#697499] mt-3">Add a passport details to showcase your eligibility for international opportunities</p>
                    </div>
                </div>
            </div>
            <!-- Edit Modal -->
            <div v-show="showEdit" class="z-50 fixed inset-0 bg-black bg-opacity-[0.5] flex justify-center items-center">
                <div class="bg-white p-10 rounded-md border-0 shadow-lg shadow-gray-600 bg-white w-[50%]">
                    <div class="flex">
                        <h2 class="text-xl font-semibold mb-5" style="color: #05264e;">Basic Details</h2>
                        <div class="ml-auto"><button class="h-5 w-5" @click="showEdit = false">
                                <img src="https://i.postimg.cc/dVQFYNh9/close.png" alt="close" />
                            </button></div>
                    </div>
                    <div class="flex gap-10">
                        <div class="w-[100%]">
                            <label for="name" class="text-md font-semibold" style="color: #05264e;">Name</label><span class="text-red-500">*</span><br />
                            <input v-if="profileName.fullName" type="text" placeholder="Enter your name" v-model="profileName.fullName" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" required />
                            <input v-else type="text" placeholder="Enter your name" v-model="profileName.fullName" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1" style="color: #7680a2;" required />

                            <div class="mt-3">
                                <label for="badge" class="text-md font-semibold" style="color: #05264e;">Profile Badge</label> <br />
                                <select class="rounded-lg border-gray-400 text-sm p-3 pl-3 mt-2 w-[100%] font-semibold" v-model="profileBadge" style="color: #0049f4;">
                                    <option value=""></option>
                                    <option value="HIRED">HIRED</option>
                                    <option value="OPEN TO WORK">OPEN TO WORK</option>
                                </select>
                            </div>

                            <p class="text-md font-semibold mt-4" style="color: #05264e;">Work Status</p>
                            <div class="option-toggle mt-3">
                                <label :class="{ checked: workStatus === 'Fresher' }" class="text-[#999999] font-medium">
                                    <input type="radio" value="Fresher" v-model="workStatus" /> Fresher
                                </label>
                                <label :class="{ checked: workStatus === 'Experienced' }" class="text-[#999999] font-medium">
                                    <input type="radio" value="Experienced" v-model="workStatus" /> Experienced
                                </label>
                            </div>
                        </div>
                        <div class="w-[100%]">
                            <div class="mb-3">
                                <label for="location" class="text-md font-semibold" style="color: #05264e;">Current Location</label><span class="text-red-500"></span><br />
                                <input type="text" placeholder="District" v-model="location" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold uppercase" style="color: #0049f4;" />
                            </div>
                            <label for="country" class="text-md font-semibold" style="color: #05264e;">Country</label><br />
                            <input type="text" placeholder="Enter your country" v-model="country" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[100%] mt-1 font-semibold" style="color: #0049f4;" />

                            <div class="relative mt-3">
                                <label for="mobile_no" class="text-md font-semibold" style="color: #05264e;">Mobile number</label><span class="text-red-500">*</span><br />
                                <input type="tel" name="mobile_no" v-model="mobile" placeholder="Enter your mobile number" pattern="[0-9]{10}" class="rounded-lg border-gray-400 text-sm pl-12 p-3 mt-2 w-full mb-3 font-semibold" style="color: #0049f4;" required />
                                <!-- <input type="tel" v-model="mobile" id="phone" name="mobile_no" placeholder="Enter your mobile number" class="border-gray-400 text-[#006fdd] font-medium rounded-lg text-sm p-3 pl-10 mt-2 w-[128%] mb-3 phone-box" required /> -->
                                <p class="absolute top-[40px] pl-2.5 mt-0.5 text-[#05264e] text-[15px] font-medium">{{ country_code }}</p>
                            </div>
                            <div class="mt-1">
                                <label for="email" class="text-md font-semibold" style="color: #05264e;">Email address</label><span class="text-red-500">*</span><br />
                                <input v-if="profileMail.emailId" type="text" placeholder="Enter your email" v-model="profileMail.emailId" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" required readonly />
                                <input v-else type="text" placeholder="Enter your email" v-model="profileMail.emailId" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1" style="color: #7680a2;" required readonly />
                            </div>
                        </div>
                    </div>
                    <p class="text-md font-semibold mt-3" style="color: #05264e;">Availability to join</p>
                    <div class="option-toggle mt-3">
                        <label :class="{ checked: availability === '15_days' }" class="text-[#999999] font-medium">
                            <input type="radio" value="15_days" v-model="availability" /> 15 Days or less
                        </label>
                        <label :class="{ checked: availability === '1_month' }" class="text-[#999999] font-medium">
                            <input type="radio" value="1_month" v-model="availability" /> 1 Month
                        </label>
                        <label :class="{ checked: availability === '2_months' }" class="text-[#999999] font-medium">
                            <input type="radio" value="2_months" v-model="availability" /> 2 Months
                        </label>
                        <label :class="{ checked: availability === '3_months' }" class="text-[#999999] font-medium">
                            <input type="radio" value="3_months" v-model="availability" /> 3 Months
                        </label>
                        <label :class="{ checked: availability === 'more_than_3_months' }" class="text-[#999999] font-medium">
                            <input type="radio" value="more_than_3_months" v-model="availability" /> More than 3 Months
                        </label>
                    </div>


                    <div class="text-right mt-3">
                        <button @click="showEdit = false" class="text-md text-right text-blue-800 mt-3 font-medium">Cancel</button>
                        <button class="border rounded-full bg-[#1654f5] text-white px-3 py-0.5 font-semibold hover:bg-[#567bf3] ml-3" @click="updateEditProfile()">Save</button>
                    </div>
                </div>
            </div>
            <!-- Add Personal Details Modal -->
            <div v-if="showPersonalDetails" class="z-30 fixed inset-0 bg-black bg-opacity-[0.5] flex justify-center items-center">
                <div class="bg-white p-10 rounded-md border-0 shadow-lg shadow-gray-600 bg-white w-[50%]">

                    <div class="flex">
                        <h2 class="text-xl font-semibold mb-5" style="color: #05264e;">Personal Details</h2>
                        <div class="ml-auto"><button class="h-5 w-5" @click="showPersonalDetails = false">
                                <img src="https://i.postimg.cc/dVQFYNh9/close.png" alt="close" />
                            </button></div>
                    </div>

                    <label for="name" class="text-md font-semibold" style="color: #05264e;">Name</label><span class="text-red-500">*</span><br />
                    <input v-if="profileName.fullName" type="text" placeholder="Enter your name" v-model="profileName.fullName" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" required />
                    <input v-else type="text" placeholder="Enter your name" v-model="profileName.fullName" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1" style="color: #7680a2;" required />
                    <div class="grid grid-cols-2">
                        <div>
                            <div class="mt-3">
                                <label for="dob" class="text-md font-semibold" style="color: #05264e;">DOB</label><br />
                                <input v-if="dob" type="date" placeholder="District" v-model="dob" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-2 font-semibold" style="color: #0049f4;" />
                                <input v-else type="date" placeholder="District" v-model="dob" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-2" style="color: #7680a2;" required />
                            </div>
                            <div class="mt-3">
                                <label for="vaccination_status" class="text-md font-semibold" style="color: #05264e;">Vaccination Status</label> <br />
                                <select class="rounded-lg border-gray-400 text-sm p-3 pl-3 mt-2 w-[80%] font-semibold" v-model="vacStatus" style="color: #0049f4;">
                                    <option value="Dose 1">Dose 1</option>
                                    <option value="Dose 2">Dose 2</option>
                                    <option value="Dose 3">Dose3</option>
                                    <option value="No vaccination">No vaccination</option>
                                </select>
                            </div>

                            <div class="mt-3">
                                <label for="location" class="text-md font-semibold" style="color: #05264e;">Location</label><br />
                                <input v-if="location" type="text" placeholder="District" v-model="location" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-1 font-semibold uppercase" style="color: #0049f4;" />
                                <input v-else type="text" placeholder="District" v-model="location" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-1 uppercase" style="color: #7680a2;" />
                            </div>

                        </div>
                        <div>
                            <div class="mt-3">
                                <label for="gender" class="text-md font-semibold" style="color: #05264e;">Gender</label> <br />
                                <select class="rounded-lg border-gray-400 text-sm p-3 pl-3 mt-2 w-[80%] font-semibold" v-model="gender" style="color: #0049f4;">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Prefer Not To Say">Prefer Not To Say</option>
                                </select>
                            </div>
                            <div class="mt-4">
                                <label for="ecr_status" class="text-md font-semibold" style="color: #05264e;">ECR Status</label> <br />
                                <select class="rounded-lg border-gray-400 text-sm p-3 pl-3 mt-2 w-[80%] font-semibold" v-model="ecrStatus" style="color: #0049f4;">
                                    <option value="ECR">ECR</option>
                                    <option value="ECNR">ECNR</option>
                                </select>
                            </div>
                            <div class="mt-3">
                                <label for="nationality" class="text-md font-semibold" style="color: #05264e;">Nationality</label><br />
                                <input v-if="nationality" type="text" placeholder="Nationality" v-model="nationality" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-2 font-semibold" style="color: #0049f4;" />
                                <input v-else type="text" placeholder="Nationality" v-model="nationality" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-2" style="color: #7680a2;" required />
                            </div>

                        </div>
                    </div>



                    <div class="text-right mt-3">
                        <button @click="showPersonalDetails = false" class="text-md text-right text-blue-800 mt-3 font-medium">Cancel</button>
                        <button class="border rounded-full bg-[#1654f5] text-white px-3 py-0.5 font-semibold hover:bg-[#567bf3] ml-3" @click="updatePersonalDetails()">Save</button>
                    </div>
                </div>
            </div>
            <!-- Add Contact Details Modal -->
            <div v-show="showContactDetails" class="z-30 fixed inset-0 bg-black bg-opacity-[0.5] flex justify-center items-center">
                <div class="bg-white p-10 rounded-md border-0 shadow-lg shadow-gray-600 bg-white w-[50%]">

                    <div class="flex">
                        <h2 class="text-xl font-semibold mb-5" style="color: #05264e;">Contact Details</h2>
                        <div class="ml-auto"><button class="h-5 w-5" @click="showContactDetails = false">
                                <img src="https://i.postimg.cc/dVQFYNh9/close.png" alt="close" />
                            </button></div>
                    </div>
                    <div class="grid grid-cols-2">

                        <div>
                            <label for="country" class="text-md font-semibold" style="color: #05264e;">Country</label><br />
                            <input type="text" placeholder="Enter your country" v-model="country" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-1 font-semibold" style="color: #0049f4;" />

                            <div class="relative mt-3">
                                <label for="mobile_no" class="text-md font-semibold" style="color: #05264e;">Primary mobile number</label><span class="text-red-500">*</span><br />
                                <input type="tel" name="mobile_no" v-model="mobile" placeholder="Enter your mobile number" pattern="[0-9]{10}" class="rounded-lg pl-12 border-gray-400 text-sm p-3 mt-2 w-[80%] mb-3 font-semibold" style="color: #0049f4;" required />
                                <p class="absolute top-[40px] pl-2.5 mt-0.5 text-[#05264e] text-[15px] font-medium">{{ country_code }}</p>
                            </div>

                            <!-- <div class="relative">
                                <label for="mobile_no" class="text-md font-semibold" style="color: #05264e;">Primary Mobile number</label><span class="text-red-500">*</span><br />
                                <input type="tel" id="phone" name="mobile_no" placeholder="Enter your mobile number" class="border-gray-400 text-[#006fdd] font-medium rounded-lg text-sm p-3 pl-10 mt-2 w-[85%] mb-3" required />
                            </div> -->
                            <div class="relative mt-3">
                                <label for="sec_mobile_no" class="text-md font-semibold" style="color: #05264e;">Secondary mobile number</label><br />
                                <input v-if="secMobile" type="tel" name="sec_mobile_no" v-model="secMobile" placeholder="Enter your mobile number" pattern="[0-9]{10}" class="rounded-lg border-gray-400 text-sm p-3 pl-3 mt-2 w-[80%] mb-3 font-semibold" style="color: #0049f4;" />
                                <input v-else type="tel" name="sec_mobile_no" placeholder="Enter your mobile number" pattern="[0-9]{10}" class="rounded-lg border-gray-400 text-sm p-3 pl-3 mt-2 w-[80%] mb-3" style="color: #7680a2;" required />
                            </div>
                        </div>

                        <div>
                            <div class="relative">
                                <label for="mobile_no" class="text-md font-semibold" style="color: #05264e;">Whatsapp number</label><br />
                                <input v-if="whatsappNo" type="tel" name="mobile_no" v-model="whatsappNo" placeholder="Eg. +91-9890989076" pattern="[0-9]{10}" class="rounded-lg border-gray-400 text-sm p-3 pl-3 mt-2 w-[80%] mb-3 font-semibold" style="color: #0049f4;" />
                                <input v-else type="tel" name="mobile_no" placeholder="Eg. +91-9890989076" v-model="whatsappNo" pattern="[0-9]{10}" class="rounded-lg border-gray-400 text-sm p-3 pl-3 mt-2 w-[80%] mb-3" style="color: #7680a2;" required />
                            </div>
                            <div class="">
                                <label for="email" class="text-md font-semibold" style="color: #05264e;">Email address</label><span class="text-red-500">*</span><br />
                                <input v-if="profileMail.emailId" type="text" placeholder="Enter your email" v-model="profileMail.emailId" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-1 font-semibold" style="color: #0049f4;" required readonly />
                                <input v-else type="text" placeholder="Enter your email" v-model="profileMail.emailId" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-1" style="color: #7680a2;" required />
                            </div>


                        </div>
                    </div>
                    <div class="text-right mt-3">
                        <button @click="showContactDetails = false" class="text-md text-right text-blue-800 mt-3 font-medium">Cancel</button>
                        <button class="border rounded-full bg-[#1654f5] text-white px-3 py-0.5 font-semibold hover:bg-[#567bf3] ml-3" @click="updateContactDetails()">Save</button>
                    </div>
                </div>
            </div>
            <!-- Add Educational Details Modal -->
            <div v-if="showEducationDetails" class="z-30 fixed inset-0 bg-black bg-opacity-[0.5] flex justify-center items-center">
                <div class="bg-white p-10 rounded-md border-0 shadow-lg shadow-gray-600 bg-white w-[50%]">

                    <div class="flex">
                        <h2 class="text-xl font-semibold mb-5" style="color: #05264e;">Education - Degree Details</h2>
                        <div class="ml-auto"><button class="h-5 w-5" @click="showEducationDetails = false">
                                <img src="https://i.postimg.cc/dVQFYNh9/close.png" alt="close" />
                            </button></div>
                    </div>

                    <div class="mt-3 relative">
                        <label for="qualification" class="text-md font-semibold" style="color: #05264e;">Course name</label><br />
                        <input type="text" placeholder="BTech/BE, BCOM, ..." v-model="qualification" @input="filterQualifications" @focus="showAllQualifications" @blur="hideQualificationSuggestionsWithDelay" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" />

                        <!-- Suggestions List -->
                        <ul v-show="showQualificationSuggestions && filteredQualifications.length" class="absolute bg-white border w-full rounded shadow-lg max-h-40 overflow-y-auto scroll-smooth">
                            <li v-for="qualification in filteredQualifications" :key="qualification" @mousedown.prevent="selectQualification(qualification)" class="p-2 text-sm text-[#001647] font-semibold cursor-pointer hover:bg-gray-200">
                                {{ qualification }}
                            </li>
                        </ul>
                    </div>
                    <div class="mt-3">
                        <label for="name" class="text-md font-semibold" style="color: #05264e;">Specialization</label><br />
                        <input type="text" placeholder="Computer Science, Civil, ..." v-model="specialization" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" />
                    </div>
                    <div class="mt-3">
                        <label for="name" class="text-md font-semibold" style="color: #05264e;">Year of passing</label><br />
                        <input type="text" placeholder="YYYY" v-model="year" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" />
                    </div>
                    <div class="text-right mt-3">
                        <button @click="showEducationDetails = false" class="text-md text-right text-blue-800 mt-3 font-medium">Cancel</button>
                        <button class="border rounded-full bg-[#1654f5] text-white px-3 py-0.5 font-semibold hover:bg-[#567bf3] ml-3" @click="updateEducationDetails()">Save</button>
                    </div>
                </div>
            </div>
            <!-- Add +2 Details Modal -->
            <div v-if="showEducationDetailsHSC" class="z-30 fixed inset-0 bg-black bg-opacity-[0.5] flex justify-center items-center">
                <div class="bg-white p-10 rounded-md border-0 shadow-lg shadow-gray-600 bg-white w-[50%]">

                    <div class="flex">
                        <h2 class="text-xl font-semibold mb-5" style="color: #05264e;">Education - HSC Details</h2>
                        <div class="ml-auto"><button class="h-5 w-5" @click="showEducationDetailsHSC = false">
                                <img src="https://i.postimg.cc/dVQFYNh9/close.png" alt="close" />
                            </button></div>
                    </div>

                    <div class="mt-3 relative">
                        <label for="stateHSC" class="text-md font-semibold" style="color: #05264e;">Education board</label><br />
                        <input type="text" placeholder="Tamil Nadu, Mumbai, ..." v-model="stateHSC" @input="filterStatesHSC" @focus="showAllStatesHSC" @blur="hideStateSuggestionsWithDelayHSC" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" />

                        <!-- Suggestions List -->
                        <ul v-show="showStateSuggestionsHSC && filteredStatesHSC.length" class="z-30 rounded absolute bg-white border w-full shadow-lg max-h-40 overflow-y-auto">
                            <li v-for="stateHSC in filteredStatesHSC" :key="stateHSC" @mousedown.prevent="selectStateHSC(stateHSC)" class="p-2 text-sm text-[#001647] font-semibold cursor-pointer hover:bg-gray-200">
                                {{ stateHSC }}
                            </li>
                        </ul>
                    </div>

                    <div class="mt-3">
                        <label for="name" class="text-md font-semibold" style="color: #05264e;">School name</label><br />
                        <input type="text" placeholder="Name of the school, location" v-model="schoolNameHSC" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" />
                    </div>
                    <div class="mt-3 relative">
                        <label for="languageHSC" class="text-md font-semibold" style="color: #05264e;">Medium of study</label><br />
                        <input type="text" placeholder="English, Hindi, French, ..." v-model="languageHSC" @input="filterLanguagesHSC" @focus="showAllLanguagesHSC" @blur="hideLanguageSuggestionsWithDelayHSC" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" />

                        <!-- Suggestions List -->
                        <ul v-show="showLanguageSuggestionsHSC && filteredLanguagesHSC.length" class="absolute bg-white border w-full rounded shadow-lg max-h-40 overflow-y-auto">
                            <li v-for="languageHSC in filteredLanguagesHSC" :key="languageHSC" @mousedown.prevent="selectLanguageHSC(languageHSC)" class="p-2 text-sm text-[#001647] font-semibold cursor-pointer hover:bg-gray-200">
                                {{ languageHSC }}
                            </li>
                        </ul>
                    </div>
                    <div class="mt-3">
                        <label for="name" class="text-md font-semibold" style="color: #05264e;">Percentage</label><br />
                        <input type="text" placeholder="e.g. 90" v-model="percentageHSC" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" />
                    </div>
                    <div class="mt-3">
                        <label for="name" class="text-md font-semibold" style="color: #05264e;">Year of passing</label><br />
                        <input type="text" placeholder="YYYY" v-model="yearHSC" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" />
                    </div>
                    <div class="text-right mt-3">
                        <button @click="showEducationDetailsHSC = false" class="text-md text-right text-blue-800 mt-3 font-medium">Cancel</button>
                        <button class="border rounded-full bg-[#1654f5] text-white px-3 py-0.5 font-semibold hover:bg-[#567bf3] ml-3" @click="updateEducationDetailsHSC()">Save</button>
                    </div>
                </div>
            </div>

            <!-- Add 10th Details Modal -->
            <div v-if="showEducationDetailsSSLC" class="z-30 fixed inset-0 bg-black bg-opacity-[0.5] flex justify-center items-center">
                <div class="bg-white p-10 rounded-md border-0 shadow-lg shadow-gray-600 bg-white w-[50%]">

                    <div class="flex">
                        <h2 class="text-xl font-semibold mb-5" style="color: #05264e;">Education - SSLC Details</h2>
                        <div class="ml-auto"><button class="h-5 w-5" @click="showEducationDetailsSSLC = false">
                                <img src="https://i.postimg.cc/dVQFYNh9/close.png" alt="close" />
                            </button></div>
                    </div>

                    <div class="mt-3 relative">
                        <label for="stateSSLC" class="text-md font-semibold" style="color: #05264e;">Education board</label><br />
                        <input type="text" placeholder="Tamil Nadu, Mumbai, ..." v-model="stateSSLC" @input="filterStatesSSLC" @focus="showAllStatesSSLC" @blur="hideStateSuggestionsWithDelaySSLC" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" />

                        <!-- Suggestions List -->
                        <ul v-show="showStateSuggestionsSSLC && filteredStatesSSLC.length" class="z-30 rounded absolute bg-white border w-full shadow-lg max-h-40 overflow-y-auto">
                            <li v-for="stateSSLC in filteredStatesSSLC" :key="stateSSLC" @mousedown.prevent="selectStateSSLC(stateSSLC)" class="p-2 text-sm text-[#001647] font-semibold cursor-pointer hover:bg-gray-200">
                                {{ stateSSLC }}
                            </li>
                        </ul>
                    </div>

                    <div class="mt-3">
                        <label for="name" class="text-md font-semibold" style="color: #05264e;">School name</label><br />
                        <input type="text" placeholder="Name of the school, location" v-model="schoolNameSSLC" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" />
                    </div>
                    <div class="mt-3 relative">
                        <label for="languageSSLC" class="text-md font-semibold" style="color: #05264e;">Medium of study</label><br />
                        <input type="text" placeholder="English, Hindi, French, ..." v-model="languageSSLC" @input="filterLanguagesSSLC" @focus="showAllLanguagesSSLC" @blur="hideLanguageSuggestionsWithDelaySSLC" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" />

                        <!-- Suggestions List -->
                        <ul v-show="showLanguageSuggestionsSSLC && filteredLanguagesSSLC.length" class="absolute bg-white border w-full rounded shadow-lg max-h-40 overflow-y-auto">
                            <li v-for="languageSSLC in filteredLanguagesSSLC" :key="languageSSLC" @mousedown.prevent="selectLanguageSSLC(languageSSLC)" class="p-2 text-sm text-[#001647] font-semibold cursor-pointer hover:bg-gray-200">
                                {{ languageSSLC }}
                            </li>
                        </ul>
                    </div>
                    <div class="mt-3">
                        <label for="name" class="text-md font-semibold" style="color: #05264e;">Percentage</label><br />
                        <input type="text" placeholder="e.g. 90" v-model="percentageSSLC" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" />
                    </div>
                    <div class="mt-3">
                        <label for="name" class="text-md font-semibold" style="color: #05264e;">Year of passing</label><br />
                        <input type="text" placeholder="YYYY" v-model="yearSSLC" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" />
                    </div>
                    <div class="text-right mt-3">
                        <button @click="showEducationDetailsSSLC = false" class="text-md text-right text-blue-800 mt-3 font-medium">Cancel</button>
                        <button class="border rounded-full bg-[#1654f5] text-white px-3 py-0.5 font-semibold hover:bg-[#567bf3] ml-3" @click="updateEducationDetailsSSLC()">Save</button>
                    </div>
                </div>
            </div>

            <!-- Add Experience Details Modal -->
            <div v-if="showExperienceDetails" class="z-30 fixed inset-0 bg-black bg-opacity-[0.5] flex justify-center items-center">
                <div class="bg-white p-10 rounded-md border-0 shadow-lg shadow-gray-600 bg-white w-[50%]">

                    <div class="flex">
                        <h2 class="text-xl font-semibold mb-5" style="color: #05264e;">Experience Details</h2>
                        <div class="ml-auto"><button class="h-5 w-5" @click="showExperienceDetails = false">
                                <img src="https://i.postimg.cc/dVQFYNh9/close.png" alt="close" />
                            </button></div>
                    </div>
                    <div class="grid grid-cols-2">

                        <div>
                            <label for="india_experience" class="text-md font-semibold" style="color: #05264e;">India Experience</label><br />
                            <input v-if="indExp" type="text" placeholder="0" v-model="indExp" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-1 font-semibold" style="color: #0049f4;" />
                            <input v-else type="text" placeholder="0" v-model="indExp" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-1" style="color: #7680a2;" required />

                            <div class="relative mt-3">
                                <label for="india_experience" class="text-md font-semibold" style="color: #05264e;">Total Experience</label><br />
                                <input v-if="totalExp" type="text" placeholder="0" v-model="totalExp" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-1 font-semibold" style="color: #0049f4;" />
                                <input v-else type="text" placeholder="0" v-model="totalExp" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-1" style="color: #7680a2;" required />
                            </div>

                            <div class="relative mt-3">
                                <label for="current_ctc" class="text-md font-semibold" style="color: #05264e;">Current CTC</label><br />
                                <input v-if="currentCtc" type="text" name="current_ctc" v-model="currentCtc" class="rounded-lg border-gray-400 text-sm p-3 pl-3 mt-2 w-[80%] mb-3 font-semibold" style="color: #0049f4;" />
                                <input v-else type="text" name="current_ctc" v-model="currentCtc" placeholder="Current CTC" class="rounded-lg border-gray-400 text-sm p-3 pl-3 mt-2 w-[80%]" style="color: #7680a2;" />
                            </div>
                            <div class="mt-1">
                                <label for="ctc_mentioned_in" class="text-md font-semibold" style="color: #05264e;">CTC Mentioned In</label> <br />
                                <select class="rounded-lg border-gray-400 text-sm p-3 pl-3 mt-2 w-[80%] font-semibold" v-model="ctcMentionedIn" style="color: #0049f4;">
                                    <option value="Monthly">Monthly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </div>
                            <div class="relative mt-3">
                                <label for="notice_period" class="text-md font-semibold" style="color: #05264e;">Notice Period (months)</label><br />
                                <input v-if="noPeriod" type="text" name="notice_period" v-model="noPeriod" class="rounded-lg border-gray-400 text-sm p-3 pl-3 mt-2 w-[80%] mb-3 font-semibold" style="color: #0049f4;" />
                                <input v-else type="text" name="notice_period" v-model="noPeriod" placeholder="Notice Period" class="rounded-lg border-gray-400 text-sm p-3 pl-3 mt-2 w-[80%]" style="color: #7680a2;" />
                            </div>
                        </div>

                        <div class="mt-1">
                            <div class="relative">
                                <label for="india_experience" class="text-md font-semibold" style="color: #05264e;">Oversease Experience</label><br />
                                <input v-if="overseasExp" type="text" placeholder="0" v-model="overseasExp" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-1 font-semibold" style="color: #0049f4;" />
                                <input v-else type="text" placeholder="0" v-model="overseasExp" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-1" style="color: #7680a2;" />
                            </div>
                            <div class="mt-3">
                                <label for="current_employer" class="text-md font-semibold" style="color: #05264e;">Current Employer</label><br />
                                <input v-if="currentEmployer" type="text" placeholder="Current Employer" v-model="currentEmployer" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-1 font-semibold" style="color: #0049f4;" />
                                <input v-else type="text" placeholder="Current Employer" v-model="currentEmployer" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-1" style="color: #7680a2;" />
                            </div>
                            <div class="mt-3">
                                <label for="currency_ctc" class="text-md font-semibold" style="color: #05264e;">CTC Currency</label><br />
                                <input v-if="currencyCtc" type="text" placeholder="CTC Currency" v-model="currencyCtc" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-1 font-semibold" style="color: #0049f4;" />
                                <input v-else type="text" placeholder="Currency CTC" v-model="currencyCtc" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-1" style="color: #7680a2;" />
                            </div>
                            <div class="mt-3">
                                <label for="expected_ctc" class="text-md font-semibold" style="color: #05264e;">Expected CTC</label><br />
                                <input v-if="expCtc" type="text" placeholder="CTC Currency" v-model="expCtc" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-1 font-semibold" style="color: #0049f4;" />
                                <input v-else type="text" placeholder="Expected CTC" v-model="expCtc" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-[80%] mt-1" style="color: #7680a2;" />
                            </div>

                        </div>
                    </div>
                    <div class="text-right mt-3">
                        <button @click="showExperienceDetails = false" class="text-md text-right text-blue-800 mt-3 font-medium">Cancel</button>
                        <button class="border rounded-full bg-[#1654f5] text-white px-3 py-0.5 font-semibold hover:bg-[#567bf3] ml-3" @click="updateExperienceDetails()">Save</button>
                    </div>
                </div>
            </div>
            <!-- Add Passport Details Modal -->
            <div v-if="showPassportDetails" class="z-30 fixed inset-0 bg-black bg-opacity-[0.5] flex justify-center items-center">
                <div class="bg-white p-10 rounded-md border-0 shadow-lg shadow-gray-600 bg-white w-[50%]">

                    <div class="flex">
                        <h2 class="text-xl font-semibold mb-5" style="color: #05264e;">Passport Details</h2>
                        <div class="ml-auto"><button class="h-5 w-5" @click="showPassportDetails = false">
                                <img src="https://i.postimg.cc/dVQFYNh9/close.png" alt="close" />
                            </button></div>
                    </div>

                    <div class="mt-3">
                        <label for="name" class="text-md font-semibold" style="color: #05264e;">Passport Number</label><br />
                        <input v-if="passNo" type="text" placeholder="Passsport Number" v-model="passNo" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" />
                        <input v-else type="text" placeholder="Passport Number" v-model="passNo" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1" style="color: #7680a2;" required />
                    </div>
                    <div class="mt-3">
                        <label for="name" class="text-md font-semibold" style="color: #05264e;">Temporary Passport Number</label><br />
                        <input v-if="tempPassNo" type="text" placeholder="Passsport Number" v-model="tempPassNo" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" />
                        <input v-else type="text" placeholder="Passport Number" v-model="tempPassNo" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1" style="color: #7680a2;" required />
                    </div>
                    <div class="mt-3">
                        <label for="name" class="text-md font-semibold" style="color: #05264e;">Expiry Date</label><br />
                        <input v-if="expiryDate" type="date" placeholder="Passsport Number" v-model="expiryDate" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1 font-semibold" style="color: #0049f4;" />
                        <input v-else type="date" placeholder="Passport Number" v-model="expiryDate" class="mb-1 border-gray-400 rounded-lg text-sm p-3 w-full mt-1" style="color: #7680a2;" required />
                    </div>
                    <div class="mt-3">
                                <label for="ecr_status" class="text-md font-semibold" style="color: #05264e;">Passport Category</label> <br />
                                <select class="rounded-lg border-gray-400 text-sm p-3 pl-3 mt-2 w-[100%] font-semibold" v-model="ecrStatus" style="color: #0049f4;">
                                    <option value="ECR">ECR</option>
                                    <option value="ECNR">ECNR</option>
                                </select>
                            </div>
                    <div class="flex justify-center mt-5">
                        <div v-if="changePassport" class="flex upload-btn-wrapper border border-gray-600 px-[41%] py-2 border-dashed rounded-md">
                            <p class="font-medium text-[16px] text-[#05264e]">Change <span class="text-[17px] font-medium text-[#265df5]">Passport</span></p>
                            <input type="file" name="passFile" ref="passport" @change="handleFileUploadPassport()" />
                        </div>
                        <div v-else class="flex upload-btn-wrapper border border-gray-600 px-[41%] py-2 border-dashed rounded-md">
                            <p class="font-medium text-[16px] text-[#05264e]">Attach <span class="text-[17px] font-medium text-[#265df5]">Passport</span></p>
                            <input type="file" name="passFile" ref="passport" @change="handleFileUploadPassport()" />
                        </div>
                    </div>
                    <div class="text-right mt-3">
                        <button @click="showPassportDetails = false" class="text-md text-right text-blue-800 mt-3 font-medium">Cancel</button>
                        <button class="border rounded-full bg-[#1654f5] text-white px-3 py-0.5 font-semibold hover:bg-[#567bf3] ml-3" @click="updatePassportDetails()">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="loading" class="text-center loading-overlay">
        <p><span class="loader"></span></p>
    </div>
</template>

<script>
    import apiService from './services/apiService.js';
    import axios from 'axios';
    import hired from './components/hired.vue';
    import {
        inject
    } from 'vue';
    import 'intl-tel-input/build/css/intlTelInput.css';
    import intlTelInput from 'intl-tel-input';

    export default {
        components: {
            hired,
        },
        data() {
            return {
                schoolNameSSLC: '',
                percentageSSLC: '',
                yearSSLC: '',
                stateSSLC: '',
                statesSSLC: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
                filteredStatesSSLC: [],
                showStateSuggestionsSSLC: false,
                languageSSLC: '',
                languagesSSLC: ['English', 'Hindi', 'French', 'Spanish', 'German', 'Mandarin', 'Tamil', 'Telugu', 'Bengali', 'Arabic'],
                filteredLanguagesSSLC: [],
                showLanguageSuggestionsSSLC: false,
                schoolNameHSC: '',
                percentageHSC: '',
                yearHSC: '',
                stateHSC: '',
                statesHSC: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
                filteredStatesHSC: [],
                showStateSuggestionsHSC: false,
                languageHSC: '',
                languagesHSC: ['English', 'Hindi', 'French', 'Spanish', 'German', 'Mandarin', 'Tamil', 'Telugu', 'Bengali', 'Arabic'],
                filteredLanguagesHSC: [],
                showLanguageSuggestionsHSC: false,
                qualification: '',
                qualifications: [],
                filteredQualifications: [],
                showQualificationSuggestions: false,
                state: '',
                states: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
                filteredStates: [],
                language: '',
                languages: ['English', 'Hindi', 'French', 'Spanish', 'German', 'Mandarin', 'Tamil', 'Telugu', 'Bengali', 'Arabic'],
                filteredLanguages: [],
                showStateSuggestions: false,
                showLanguageSuggestions: false,
                showEdit: false,
                workStatus: null,
                availability: null,
                profileMail: null,
                showPersonalDetails: false,
                showEducationDetails: false,
                showEducationDetailsHSC: false,
                showEducationDetailsSSLC: false,
                showContactDetails: false,
                showExperienceDetails: false,
                showPassportDetails: false,
                id: '',
                location: '',
                totalExp: 0,
                qualification: '',
                specialization: '',
                year: '',
                country: '',
                indExp: '',
                overseaseExp: '',
                currentEmployer: '',
                currentCtc: '',
                currencyCtc: '',
                expCtc: '',
                noPeriod: '',
                ctcMentionedIn: '',
                file: null,
                secMobile: '',
                loading: false,
                changeUpload: false,
                cv: '',
                candidateProfile: '',
                whatsappNo: '',
                passNo: '',
                tempPassNo: '',
                workStatus: this.totalExp === 0 ? 'Fresher' : 'Experienced',
                hired: false,
                openToWork: false,
                country_code: null,
                degree: false,
                hsc: false,
                sslc: false,
                yearHSC: '',
                languageHSC: '',
                schoolNameHSC: '',
                countryPhoneCodes: {
                    "United States": "+1",
                    "India": "+91",
                    "United Kingdom": "+44",
                    "Canada": "+1",
                    "Germany": "+49",
                    "France": "+33",
                    "Australia": "+61",
                    "Japan": "+81",
                    "China": "+86",
                    "United Arab Emirates": "+971",
                    "Brazil": "+55",
                    "South Africa": "+27",
                    "Algeria": "+213",
                    "Sri Lanka": "+94",
                    "UAE": "+971",
                    "Nepal": "+977",
                    "Srilanka": "+94",
                    "Kuwait": "+965",
                    "Pakistan": "+92",
                    "Oman": "+968",
                    "Qatar": "+974",
                },
                phoneNumber: "",
                iti: null,
                changePassport: false,
                expiryDate: "",
            };
        },
        watch: {
            // Watch for changes to totalExp
            totalExp(newVal) {
                // Update workStatus based on totalExp
                this.workStatus = newVal === 0 ? 'Fresher' : 'Experienced';
            }
        },
        setup() {
            const profileMail = inject('profileMail');
            const profileName = inject('profileName');
            const candidateId = inject('candidateId');
            const profileUrl = inject('profileUrl');
            return {
                profileMail,
                profileName,
                candidateId,
                profileUrl,
            };
        },
        mounted() {
            this.$nextTick(() => {
                const input = document.querySelector('#phone');

                if (!input) {
                    console.error("Phone input field not found!");
                    return;
                }

                this.iti = intlTelInput(input, {
                    initialCountry: "in",
                    separateDialCode: true,
                    nationalMode: false,
                    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.8/build/js/utils.js"
                });
            });
            this.getSchoolDetailsHSC();
            this.getSchoolDetailsSSLC();
            this.qualificationList();
            this.checkRouteAndFetch();
        },
        watch: {
            '$route'() {
                this.checkRouteAndFetch();
            }
        },
        methods: {
            checkRouteAndFetch() {
                if (this.$route.path.includes("profile")) {
                    this.candidateDetails();
                }
            },

            async getSchoolDetailsHSC() {
                if (!this.profileMail || !this.profileMail.emailId) {
                    console.error("Email ID is missing.");
                    return;
                }

                const email = this.profileMail.emailId;
                const apiKey = '4aedf12d2330fbe';
                const apiSecret = '2d72f01e8e1a60a';
                const apiUrl = '/api/method/jobpro.jobpro_web.get_school_hsc';

                console.log(email);

                try {
                    const response = await axios.post(apiUrl,{ email }, 
                        {
                            headers: {
                                'Authorization': `token ${apiKey}:${apiSecret}`,
                            },
                        }
                    );
                    this.languageHSC = response.data.message[0].mediumHSC;
                    this.percentageHSC = response.data.message[0].percentageHSC;
                    this.schoolNameHSC = response.data.message[0].schoolNameHSC;
                    this.stateHSC = response.data.message[0].stateHSC;
                    this.yearHSC = response.data.message[0].yearHSC;
                    if (response.data.message[0].mediumHSC&&response.data.message[0].percentageHSC&&response.data.message[0].schoolNameHSC&&response.data.message[0].stateHSC&&response.data.message[0].yearHSC) {
                        this.hsc = true;
                    }
                    else {
                        this.hsc = true;
                    }
                } catch (error) {
                    console.log(error.response.data.exc_type)
                    return error.response;
                }
            },
            
            async getSchoolDetailsSSLC() {
                if (!this.profileMail || !this.profileMail.emailId) {
                    console.error("Email ID is missing.");
                    return;
                }

                const email = this.profileMail.emailId;
                const apiKey = '4aedf12d2330fbe';
                const apiSecret = '2d72f01e8e1a60a';
                const apiUrl = '/api/method/jobpro.jobpro_web.get_school_sslc';

                console.log(email);

                try {
                    const response = await axios.post(apiUrl,{ email }, 
                        {
                            headers: {
                                'Authorization': `token ${apiKey}:${apiSecret}`,
                            },
                        }
                    );
                    this.languageSSLC = response.data.message[0].mediumSSLC;
                    this.percentageSSLC = response.data.message[0].percentageSSLC;
                    this.schoolNameSSLC = response.data.message[0].schoolNameSSLC;
                    this.stateSSLC = response.data.message[0].stateSSLC;
                    this.yearSSLC = response.data.message[0].yearSSLC;
                    if (response.data.message[0].mediumSSLC&&response.data.message[0].percentageSSLC&&response.data.message[0].schoolNameSSLC&&response.data.message[0].stateSSLC&&response.data.message[0].yearSSLC) {
                        this.sslc = true
                    }
                } catch (error) {
                    console.log(error.response.data.exc_type)
                    return error.response;
                }
            },

            async candidateDetails() {
                try {
                    if (this.profileMail && this.profileMail.emailId) {
                        const response = await apiService.getCandidateDetails(this.profileMail.emailId);
                        this.workStatus = this.totalExp === 0 ? 'Fresher' : 'Experienced';
                        this.id = response.data.message.name;
                        this.dob = response.data.message.date_of_birth;
                        this.gender = response.data.message.gender;
                        this.profileBadge = response.data.message.badge;
                        this.nationality = response.data.message.nationality;
                        this.ecrStatus = response.data.message.ecr_status_candidate;
                        this.vacStatus = response.data.message.vaccination_status;
                        this.location = response.data.message.location;
                        this.totalExp = response.data.message.total_experience;
                        this.mobile = response.data.message.mobile_number;
                        this.whatsappNo = response.data.message.whatsapp_number
                        this.qualification = response.data.message.highest_degree;
                        this.specialization = response.data.message.specialization;
                        this.year = response.data.message.year_of_passing;
                        this.country = response.data.message.country;
                        this.country_code = this.countryPhoneCodes[this.country];
                        this.indExp = response.data.message.india_experience;
                        this.overseasExp = response.data.message.overseas_experience;
                        this.currentEmployer = response.data.message.current_employer;
                        this.currentCtc = response.data.message.current_ctc;
                        this.currencyCtc = response.data.message.currency_ctc;
                        this.expCtc = response.data.message.expected_ctc;
                        this.noPeriod = response.data.message.notice_period_months;
                        this.ctcMentionedIn = response.data.message.ctc_mentioned_in;
                        this.secMobile = response.data.message.mobile;
                        this.cv = response.data.message.irf;
                        this.passNo = response.data.message.passport_number;
                        this.tempPassNo = response.data.message.temp_passport_number;
                        this.expiryDate = response.data.message.passport_expiry_date;
                        this.candidateId.canId = response.data.message.name;
                        // localStorage.setItem('canId', response.data.message.name);
                        if (response.data.message.candidate_image) {
                            this.candidateProfile = 'https://erp.teamproit.com' + response.data.message.candidate_image;
                            this.profileUrl.profile = 'https://erp.teamproit.com' + response.data.message.candidate_image;
                        }
                        if (response.data.message.passport) {
                            this.changePassport = true;
                        }
                        if (response.data.message.highest_degree && response.data.message.specialization && response.data.message.year_of_passing) {
                            this.degree = true;
                        } else {
                            this.degree = false;
                        }
                        if (response.data.message.badge == "HIRED") {
                            this.hired = true;
                            this.openToWork = false;
                        } else if (response.data.message.badge == "OPEN TO WORK") {
                            this.openToWork = true;
                            this.hired = false;
                        } else {
                            this.openToWork = false;
                            this.hired = false;
                        }
                    } else {
                        console.error("No email provided in profileMail.");
                    }
                } catch (error) {
                    console.error("Failed to fetch candidate details:", error);
                }
            },
            handleFileUpload() {
                const file1 = this.$refs.file1.files[0];
                const file2 = this.$refs.file2.files[0];
                const files = [file1, file2];

                console.log(files);

                const selectedFiles = files.filter(file => file !== undefined);

                if (selectedFiles.length > 0) {
                    this.loading = true;
                    this.uploadResume(selectedFiles[0]);
                } else {
                    console.error('No files selected');
                    this.loading = false;
                }
            },
            handleFileUploadPassport() {
                const file = this.$refs.passport.files[0];
                const files = [file];

                console.log(files);

                const selectedFiles = files.filter(file => file !== undefined);

                if (selectedFiles.length > 0) {
                    this.loading = true;
                    this.uploadPassport(selectedFiles[0]);
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
                    console.log(fileUrl);
                    if (fileUrl) {
                        const response = await apiService.updateResume(fileUrl, this.id);
                        if (response && response.status == 200) {
                            this.changeUpload = true;
                            window.location.reload();
                        }
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                    this.loading = false;
                }
            },
            changeProfile() {
                this.loading = true;
                const files = this.$refs.profile.files[0];
                if (files) {
                    this.loading = true;
                    this.profileChange(files);
                } else {
                    console.error('No files selected');
                    this.loading = false;
                }
            },

            async profileChange(file) {
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
                        const response = await apiService.changeProfileFromJobpro(fileUrl, this.candidateId.canId);
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
            async updateEditProfile() {
                this.loading = true;
                const profileData = {
                    fullName: this.profileName.fullName,
                    workStatus: this.workStatus,
                    location: this.location,
                    mobile: this.mobile,
                    emailId: this.profileMail.emailId,
                    availability: this.availability,
                    profileBadge: this.profileBadge,
                    country: this.country,
                };
                try {
                    const id = this.id;
                    await axios.post('/api/method/jobpro.jobpro_web.edit_profile', {
                        profileData,
                        id
                    });
                    this.loading = false;
                    this.showEdit = false;
                    console.log('Profile saved successfully');
                    await this.candidateDetails();
                    this.loading = false;
                    this.showEdit = false;
                } catch (error) {
                    this.loading = false;
                    console.error('Error saving profile:', error);
                }
            },
            async updateContactDetails() {
                this.loading = true;
                const contactData = {
                    country: this.country,
                    whatsappNo: this.whatsappNo,
                    mobile: this.mobile,
                    emailId: this.profileMail.emailId,
                    secMobile: this.secMobile,
                };
                try {
                    const id = this.id;
                    await axios.post('/api/method/jobpro.jobpro_web.contact_details', {
                        contactData,
                        id
                    });
                    this.loading = false;
                    this.showContactDetails = false;
                    console.log('Profile saved successfully');
                    await this.candidateDetails()
                } catch (error) {
                    this.loading = false;
                    console.error('Error saving profile:', error);
                }
            },
            async updateEducationDetails() {
                this.loading = true;
                const educationData = {
                    qualification: this.qualification,
                    specialization: this.specialization,
                    year: this.year,

                };
                console.log(educationData)
                try {
                    const id = this.id;
                    await axios.post('/api/method/jobpro.jobpro_web.education_details', {
                        educationData,
                        id
                    });
                    this.loading = false;
                    this.showEducationDetails = false;
                    console.log('Profile saved successfully');
                    await this.candidateDetails();
                } catch (error) {
                    this.loading = false;
                    console.error('Error saving profile:', error);
                }
            },
            async updateEducationDetailsHSC() {
                this.loading = true;
                const educationHSCData = {
                    stateHSC: this.stateHSC,
                    schoolNameHSC: this.schoolNameHSC,
                    mediumHSC: this.languageHSC,
                    percentageHSC: this.percentageHSC,
                    yearHSC: this.yearHSC,
                };
                console.log(educationHSCData)
                try {
                    const id = this.id;
                    await axios.post('/api/method/jobpro.jobpro_web.education_details_hsc', {
                        educationHSCData,
                        id
                    });
                    this.loading = false;
                    this.showEducationDetailsHSC = false;

                    console.log('Profile saved successfully');
                    await this.candidateDetails();
                } catch (error) {
                    this.loading = false;
                    console.error('Error saving profile:', error);
                }
            },
            async updateEducationDetailsSSLC() {
                this.loading = true;
                const educationSSLCData = {
                    stateSSLC: this.stateSSLC,
                    schoolNameSSLC: this.schoolNameSSLC,
                    mediumSSLC: this.languageSSLC,
                    percentageSSLC: this.percentageSSLC,
                    yearSSLC: this.yearSSLC,
                };
                console.log(educationSSLCData)
                try {
                    const id = this.id;
                    await axios.post('/api/method/jobpro.jobpro_web.education_details_sslc', {
                        educationSSLCData,
                        id
                    });
                    this.loading = false;
                    this.showEducationDetails = false;
                    this.showEducationDetailsSSLC = false;
                    console.log('Profile saved successfully');
                    await this.candidateDetails();
                } catch (error) {
                    this.loading = false;
                    console.error('Error saving profile:', error);
                }
            },
            async updateExperienceDetails() {
                this.loading = true;
                const experienceData = {
                    indExp: this.indExp,
                    overseasExp: this.overseasExp,
                    currentEmployer: this.currentEmployer,
                    currentCtc: this.currentCtc,
                    currencyCtc: this.currencyCtc,
                    expCtc: this.expCtc,
                    noPeriod: this.noPeriod,
                    ctcMentionedIn: this.ctcMentionedIn,
                };
                try {
                    const id = this.id;
                    await axios.post('/api/method/jobpro.jobpro_web.experience_details', {
                        experienceData,
                        id
                    });
                    this.loading = false;
                    this.showExperienceDetails = false;
                    console.log('Profile saved successfully');
                } catch (error) {
                    this.loading = false;
                    console.error('Error saving profile:', error);
                }
            },
            async updatePersonalDetails() {
                this.loading = true;
                const personalData = {
                    dob: this.dob,
                    vacStatus: this.vacStatus,
                    nationality: this.nationality,
                    location: this.location,
                    ecrStatus: this.ecrStatus,
                    gender: this.gender,
                    fullName: this.profileName.fullName,
                };
                try {
                    const id = this.id;
                    await axios.post('/api/method/jobpro.jobpro_web.personal_details', {
                        personalData,
                        id
                    });
                    this.loading = false;
                    this.showPersonalDetails = false;
                    console.log('Profile saved successfully');
                    await this.candidateDetails();
                } catch (error) {
                    this.loading = false;
                    console.error('Error saving profile:', error);
                }
            },
            async updatePassportDetails() {
                this.loading = true;
                const passportData = {
                    passNo: this.passNo,
                    tempPassNo: this.tempPassNo,
                    expiryDate: this.expiryDate,
                    ecrStatus: this.ecrStatus,
                };
                console.log(passportData)
                try {
                    const id = this.id;
                    await axios.post('/api/method/jobpro.jobpro_web.passport_details', {
                        passportData,
                        id
                    });
                    this.loading = false;
                    this.showPassportDetails = false;
                    console.log('Profile saved successfully');
                    await this.candidateDetails();
                } catch (error) {
                    this.loading = false;
                    console.error('Error saving profile:', error);
                }
            },
            filterStatesSSLC() {
                if (this.stateSSLC) {
                    this.filteredStatesSSLC = this.statesSSLC.filter(lang =>
                        lang.toLowerCase().includes(this.stateSSLC.toLowerCase())
                    );
                    this.showStateSuggestionsSSLC = true;
                } else {
                    this.filteredStatesSSLC = [];
                    this.showStateSuggestionsSSLC = false;
                }
            },
            showAllStatesSSLC() {
                this.filteredStatesSSLC = [...this.statesSSLC];
                this.showStateSuggestionsSSLC = true;
            },
            selectStateSSLC(stateSSLC) {
                this.stateSSLC = stateSSLC;
                this.showStateSuggestionsSSLC = false;
            },
            filterLanguagesSSLC() {
                if (this.languageSSLC) {
                    this.filteredLanguagesSSLC = this.languagesSSLC.filter(lang =>
                        lang.toLowerCase().includes(this.languageSSLC.toLowerCase())
                    );
                    this.showLanguageSuggestionsSSLC = true;
                } else {
                    this.filteredLanguagesSSLC = [];
                    this.showLanguageSuggestionsSSLC = false;
                }
            },
            showAllLanguagesSSLC() {
                this.filteredLanguagesSSLC = [...this.languagesSSLC];
                this.showLanguageSuggestionsSSLC = true;
            },
            selectLanguageSSLC(languageSSLC) {
                this.languageSSLC = languageSSLC;
                this.showLanguageSuggestionsSSLC = false;
            },
            hideQualificationSuggestionsWithDelay() {
                setTimeout(() => {
                    this.showQualificationSuggestions = false;
                }, 200);
            },
            hideLanguageSuggestionsWithDelayHSC() {
                setTimeout(() => {
                    this.showLanguageSuggestionsHSC = false;
                }, 200);
            },
            hideStateSuggestionsWithDelayHSC() {
                setTimeout(() => {
                    this.showStateSuggestionsHSC = false;
                }, 200);
            },
            hideLanguageSuggestionsWithDelaySSLC() {
                setTimeout(() => {
                    this.showLanguageSuggestionsSSLC = false;
                }, 200);
            },
            filterQualifications() {
                if (this.qualification) {
                    this.filteredQualifications = this.qualifications.filter(qualification =>
                        qualification.toLowerCase().includes(this.qualification.toLowerCase())
                    );
                } else {
                    this.filteredQualifications = [...this.qualifications];
                }
                this.showQualificationSuggestions = true;
            },
            showAllQualifications() {
                this.filteredQualifications = [...this.qualifications];
                this.showQualificationSuggestions = true;
            },
            selectQualification(qualification) {
                this.qualification = qualification;
                this.showQualificationSuggestions = false;
            },

            async qualificationList() {
                try {
                    const response = await apiService.getQualificationList();
                    this.response = response.data.message;
                    if (Array.isArray(this.response)) {
                        this.qualifications = this.response;
                    } else if (typeof this.response === "string") {
                        this.qualifications = this.response.split(",").map(qualification => qualification.trim());
                    }
                    this.filteredQualifications = [...this.qualifications];
                } catch (error) {
                    console.error("Failed to fetch qualification details:", error);
                }
            },
            filterStatesHSC() {
                if (this.stateHSC) {
                    this.filteredStatesHSC = this.statesHSC.filter(lang =>
                        lang.toLowerCase().includes(this.stateHSC.toLowerCase())
                    );
                    this.showStateSuggestionsHSC = true;
                } else {
                    this.filteredStatesHSC = [];
                    this.showStateSuggestionsHSC = false;
                }
            },
            showAllStatesHSC() {
                this.filteredStatesHSC = [...this.statesHSC];
                this.showStateSuggestionsHSC = true;
            },
            selectStateHSC(stateHSC) {
                this.stateHSC = stateHSC;
                this.showStateSuggestionsHSC = false;
            },
            filterLanguagesHSC() {
                if (this.languageHSC) {
                    this.filteredLanguagesHSC = this.languagesHSC.filter(lang =>
                        lang.toLowerCase().includes(this.languageHSC.toLowerCase())
                    );
                    this.showLanguageSuggestionsHSC = true;
                } else {
                    this.filteredLanguagesHSC = [];
                    this.showLanguageSuggestionsHSC = false;
                }
            },
            showAllLanguagesHSC() {
                this.filteredLanguagesHSC = [...this.languagesHSC];
                this.showLanguageSuggestionsHSC = true;
            },
            selectLanguageHSC(languageHSC) {
                this.languageHSC = languageHSC;
                this.showLanguageSuggestionsHSC = false;
            },
            async uploadPassport(file) {
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
                    console.log(fileUrl);
                    if (fileUrl) {
                        const response = await apiService.updatePassport(fileUrl, this.id);
                        if (response && response.status == 200) {
                            this.changePassport = true;
                            window.location.reload();
                        }
                        else {
                            this.changePassport = false;
                        }
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                    this.loading = false;
                }
            },

        },
    }
</script>

<style>
    .edit-icon {
        transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
    }

    .edit-icon:hover {
        transform: scale(1.05);
        fill: #265df5;
        cursor: pointer;
    }

    .option-toggle {
        display: flex;
        gap: 20px;
    }

    .option-toggle label {
        display: inline-flex;
        align-items: center;
        padding-right: 8px;
        padding-left: 8px;
        padding-bottom: 1px;
        padding-top: 1px;
        border: 1px solid #999999;
        border-radius: 10px;
        cursor: pointer;
        transition: color 0.3s, border-color 0.3s, transform 0.3s;
        font-size: 14px;
    }

    .option-toggle label.checked {
        color: #265df5;
        border-color: #265df5;
        font-size: 14px;
    }

    .option-toggle input[type="radio"] {
        display: none;
    }

    .upload-btn-wrapper {
        position: relative;
        overflow: hidden;
        display: inline-block;
    }

    .btn {
        border: 2px solid gray;
        color: gray;
        background-color: white;
        padding: 8px 20px;
        border-radius: 8px;
        font-size: 20px;
        font-weight: bold;
    }

    .upload-btn-wrapper input[type=file] {
        font-size: 100px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
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

    .badge {
        position: absolute;
        top: 50%;
        left: -39px;
    }
</style>