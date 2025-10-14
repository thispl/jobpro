<template>
    <div class="bg-white mt-0 shadow-lg shadow-gray-600">
        <div class="mx-10 ml-5 flex md:justify-center items-center gap-10 md:p-6  border border-red">
            <img class="md:hidden  " src="https://i.postimg.cc/6qY40bGc/Whats-App-Image-2024-09-30-at-11-38-34-75256763-removebg-preview.png" alt="jobpro" width="60px">
            <router-link to="/">
            <img class="hidden md:block md:w-[140px] lg:w-[180px] fixed top-6 z-50  left-[5%] navigation-logo-shadow" src="https://i.postimg.cc/6p66m14h/TEAMPRO.png" width="180px" alt="Teampro Logo" />
            </router-link>
            <transition name="fade-scale">
                <div class="hidden md:block font-semibold text-[#05264e]" :class="{'lg:mr-0 md:mr-[250px]': showNavSearch && isHomePage, 'lg:mr-0 md:mr-[300px]': !state.isLoggedIn && showNavSearch}">
                    <router-link to="/" active-class="text-[#0070cc] font-semibold transform scale-[1.05]" class="md:mr-5 lg:mr-10 lg:ml-24 menu transition-all duration-300 ease-in-out">HOME</router-link>
                    <!-- <router-link to="/candidates" active-class="text-[#0070cc] font-semibold transform scale-[1.05]" class="md:mr-5 lg:mr-10 menu transition-all duration-300 ease-in-out">CANDIDATE</router-link> -->
                    <router-link to="/referpro" active-class="text-[#0070cc] font-semibold transform scale-[1.05]" class="menu transition-all duration-300 ease-in-out">REFERPRO</router-link>
                    
                </div>
            </transition>
            <button v-if="!changeUpload && !cv" class=" fixed left-[65%] border border-blue-500 rounded-full px-3 py-0.5 text-white bg-blue-500 shadow-lg shadow-gray-500 hover:bg-blue-800"@click="handleUploadResumePopup()">Post Resume</button>
            <transition name="fade-scale">
                <div v-if="showNavSearch && isHomePage" class="hidden md:block fixed sm:right-[0%] md:right-[6%] lg:right-[51%] lg:w-[300px]" :class="{'md:right-[12%] top-8 md:w-[240px]': !state.isLoggedIn}">
                    <div class="search-box-nav border border-gray-300 shadow-lg shadow-gray-300">
                        <input class="searchInput w-10" @input="sendCommand()" type="text" v-model="query" placeholder="Search jobs ..." ref="searchInput" />
                    </div>
                </div>
            </transition>
            <transition v-if="state.isLoggedIn" name="fade-scale">
                <p :class="{'md:hidden': showNavSearch, 'lg:block': showNavSearch}" class="text-[#05264e] font-medium text-right fixed top-4 z-50 right-8 md:right-[19%] lg:right-[16%] font-semibold md:top-[3.4%]"><span class="font-sans text-sm font-bold pr-2">Hi</span>{{ profileName.fullName }}</p>
            </transition>
            <div v-if="state.isLoggedIn" class="hidden md:block fixed">
                <button @click="openSideBar()" class="fixed top-[2.5%] md:right-[14%] lg:right-[12%]">
                    <img v-if="profileUrl.profile" :src="profileUrl.profile" class="w-[40px] rounded-full navigation-user-profile-shadow">
                    <img v-else src="https://i.ibb.co/2s8RQ38/user.png" alt="user" width="40px" class="navigation-user-profile-shadow">
                </button>
            </div>

            <div v-if="!state.isLoggedIn" class="fixed top-6 z-50 ml-[58%] md:ml-[65%] lg:ml-[68%]">
                <router-link to="/login" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-8 md:px-4 lg:py-2.5 md:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600" style="color: white !important;">Sign In</router-link>
            </div>
            <img class="hidden md:block fixed top-0 z-50 md:w-[70px] lg:w-[75px] fixed right-[5%] navigation-logo-shadow" src="https://i.postimg.cc/6qY40bGc/Whats-App-Image-2024-09-30-at-11-38-34-75256763-removebg-preview.png" alt="jobpro" width="75px">
        </div>
        <transition>

            <div v-if="sidebar">
                <div class="absolute md:bg-white md:absolute md:right-0 md:top-0 rounded-l-xl p-5 shadow-lg shadow-gray-600 md:w-[350px]">
                    <button class="h-5 w-5 ml-[90%]" @click="closeSideBar">
                        <img src="https://i.postimg.cc/dVQFYNh9/close.png" alt="close" />
                    </button>
                    <div class="flex gap-7">
                        <img v-if="profileUrl.profile" :src="profileUrl.profile" class="h-[60px] mt-3 rounded-full">
                        <img v-else src="https://i.ibb.co/ss8RQ38/user.png" alt="user" class="h-[60px] mt-3" />
                        <div>
                            <p class="font-medium text-xl mt-3" style="color: #05264e;">{{ profileName.fullName || 'Guest' }}</p>
                            <p class="font-medium text-sm text-gray-600 my-1">{{ id }}</p>
                            <router-link to="/profile" class="font-medium text-sm text-[#2266f6] my-2">View & Update Profile</router-link>
                        </div>
                    </div>
                    <hr class="mt-4 border-1 border-gray-300">
                    <div class="mt-5">
                        <button @click="handleLogout" class="flex gap-2">
                            <img src="https://i.postimg.cc/4xZWFn8K/quit.png" class="h-4 w-4 opacity-[0.5] mt-2" />
                            <p class="xs mt-1 hover:text-[#0050f4] transition-full">Logout</p>
                        </button>
                    </div>
                </div>
            </div>
        </transition>
<!-- handle Post Resume Popup -->
        <transition>
                <div v-if="showUploadResumePopup" class="fixed inset-0 flex justify-center items-center z-30">

                    <div class="bg-white p-6 rounded-md border-0 shadow-lg shadow-gray-600 w-[300px] h-[200px] w-[400px]">

                        <button @click="showUploadResumePopup=false" class="close-button h-5 w-5 ml-[90%]">
                                    <img src="https://i.postimg.cc/dVQFYNh9/close.png" alt="close" class="mt-[-10px]" />
                                </button>

                                <h1 class="text-[#05264e] text-xl font-semibold">Post Resume</h1>
                                <p v-if="!resumeUploadProcess"  class="text-md text-[#05264e] mt-3 text-center font-medium">Uploading...</p>
                                <div v-if="resumeUploadProcess" class="flex mt-8 ml-4 w-full">
                            <p  class="text-md text-[#05264e] font-medium">Resume</p>
                            <a :href="'https://erp.teamproit.com/' + cv" target="_blank" v-if="changeUpload || cv" class="text-md font-medium text-[#265df5] text-right ml-auto">View</a>

                            <div  class="upload-btn-wrapper text-right ml-auto mr-[35px]">
                                <button v-if="!changeUpload && !cv" class="text-md font-medium text-[#265df5] ">Upload</button>
                                <button v-if="changeUpload || cv" class="text-md font-medium text-[#265df5]">Change</button>
                                <input v-bind:type="'file'" v-bind:name="'myfile'" ref="file1" @change="handleFileUpload()" />
                            </div>
                        </div>
                        <div v-if="loading" class="text-center mt-4 absolute top-[40%] right-[50%]">
                                    <p><span class="loader"></span></p> 
                                </div>

                        </div>
                </div>
        </transition>

         <!-- Signup through apply now -->
                   <Transition >
                        <div v-if="showLoginPopup" class="fixed inset-0 flex justify-center items-center z-30">
                            <div class="bg-white p-6 rounded-md border-0 shadow-lg shadow-gray-600 w-[300px] h-[450px] w-[400px]">
                                <p class="cursor-default" @click="showRegisterPopup2=true,showLoginPopup=false,success=false ,showForgotPassword=false, otpLogin=true">Not Registered ? Register here</p>
                                <button @click="showLoginPopup=false ,success=false ,showForgotPassword=false, otpLogin=true" class="close-button h-5 w-5 ml-[90%]">
                                    <img src="https://i.postimg.cc/dVQFYNh9/close.png" alt="close" class="mt-[-10px]" />
                                </button>
                              

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


                                    <div v-if="!state.isLoggedIn && handleSuccess()" class="text-center mt-[100px] mx-8">
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
                      
                    <div v-if="showRegisterPopup2" class="fixed inset-0 flex justify-center items-center z-30">
                            <div class="bg-white p-6 rounded-md border-0 shadow-lg shadow-gray-600   w-[500px]">

                                 <button @click="showRegisterPopup2=false " class="close-button h-5 w-5 ml-[90%]">
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
                            <div class="relative mb-3 w-full">
                                <label for="mobile_no" class="text-md font-semibold" style="color: #05264e;">Phone </label>
                                <span class="text-red-500">*</span><br />
                                <input type="tel" ref="registerPhoneInput"  v-model="newUser.mobile_no" id="phone" name="mobile_no" placeholder="Enter your mobile number" class="border text-[#05264e] font-medium rounded-lg text-sm p-3 w-full pl-10 mt-2" required />
                                 <!-- <input type="tel" ref="phoneInput" v-model="newUser.mobile_no" id="phone" name="mobile_no" placeholder="Enter your mobile number"  class="border  text-[#05264e] font-medium rounded-lg text-sm px-[200px] py-3 w-full mt-2" required /> -->
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




    </div>
    <!-- Footer Nav for mobile -->
    <div class="fixed bottom-0 bg-white text-gray-500 md:hidden w-full pb-5 pt-2">
        <div class="flex justify-evenly">
            <!-- Home -->
            <router-link to="/" :class="{'text-[#05264e]': isHomePage}">
                <svg class="h-7 w-7" green fill="none" stroke-width="0" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 24 24" height="1em" width="1em" style="overflow: visible; color: currentcolor;">
                    <path fill="currentColor" d="M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.06l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 0 0 1.061 1.06l8.69-8.69Z"></path>
                    <path fill="currentColor" d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.43Z"></path>
                </svg>
            </router-link>
            <!-- Search -->
            <router-link to="/test" :class="{'text-[#05264e]': isSearchPage}">
                <svg class="h-7 w-7" fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="1em" width="1em" style="overflow: visible; color: currentcolor;">
                    <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
                </svg>
            </router-link>
            <!-- REFERPRO -->
            <router-link to="/referpro" :class="{'text-[#05264e]': isReferproPage}">
                <svg class="h-7 w-7" fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em" width="1em" style="overflow: visible; color: currentcolor;">
                    <path d="M288 256c52.79 0 99.43-49.71 104-110.82 2.27-30.7-7.36-59.33-27.12-80.6C345.33 43.57 318 32 288 32c-30.24 0-57.59 11.5-77 32.38-19.63 21.11-29.2 49.8-27 80.78C188.49 206.28 235.12 256 288 256ZM495.38 439.76c-8.44-46.82-34.79-86.15-76.19-113.75C382.42 301.5 335.83 288 288 288s-94.42 13.5-131.19 38c-41.4 27.6-67.75 66.93-76.19 113.75-1.93 10.73.69 21.34 7.19 29.11A30.94 30.94 0 0 0 112 480h352a30.94 30.94 0 0 0 24.21-11.13c6.48-7.77 9.1-18.38 7.17-29.11ZM104 288v-40h40a16 16 0 0 0 0-32h-40v-40a16 16 0 0 0-32 0v40H32a16 16 0 0 0 0 32h40v40a16 16 0 0 0 32 0Z"></path>
                </svg>
            </router-link>
            <!-- Account / Profile -->
            <router-link to="/profile" :class="{'text-[#05264e]': isProfilePage}">
                <svg class="h-7 w-7" fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em" width="1em" style="overflow: visible; color: currentcolor;">
                    <path d="M399 384.2c-22.1-38.4-63.6-64.2-111-64.2h-64c-47.4 0-88.9 25.8-111 64.2 35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0 256 256 0 1 1-512 0zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"></path>
                </svg>
            </router-link>
        </div>
    </div>
</template>

<script>


  import axios from 'axios';
  import 'intl-tel-input/build/css/intlTelInput.css';
  import intlTelInput from 'intl-tel-input';


    import {
        inject
    } from "vue";
    import {
        useRouter
    } from "vue-router";
    import apiService from "@/services/apiService.js";
    import {
        eventBus
    } from "@/services/eventBus.js";
// import { elInterfaceTranslations } from "intl-tel-input/i18n";
// import Register from './Register.vue';


    export default {
        data() {
            return {
                showNavSearch: false,
                sidebar: false,
                observer: null,
                searchQuery: '',
                id: null,
                loading: false,
                changeUpload: false,
                cv: '',
                showUploadResumePopup:false,
                showLoginPopup:false,
                showRegisterPopup2:false,
                success:false ,
                showForgotPassword:false, 
                otpLogin: true,
                emailLogin: false,
                successfull: false,
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
                resumeUploadProcess : false,
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

                        };
        },


 watch: {
    showRegisterPopup2(newVal) {
      if (newVal) {
        this.$nextTick(() => {
       
        
          if (this.$refs.registerPhoneInput) {
    if (!this.iti) {
      this.iti = intlTelInput(this.$refs.registerPhoneInput, {
        initialCountry: "in",
        separateDialCode: true,
        nationalMode: false,
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.8/build/js/utils.js"
      });

     
    }
  }




        });
      }
    }
  },



        setup() {
            const state = inject("state");
            const profileName = inject("profileName");
            const profileUrl = inject("profileUrl");
            const profileMail = inject("profileMail");
            const router = useRouter();

            const handleLogout = () => {
                state.isLoggedIn = false;
                localStorage.removeItem("authToken");
                localStorage.removeItem("emailId");
                localStorage.removeItem("fullName");
                localStorage.removeItem("canID");
                router.push("/login");
            };

            return {
                state,
                profileName,
                profileUrl,
                profileMail,
                handleLogout,
            };
        },
        computed: {
            isHomePage() {
                return this.$route.path === "/";
            },
            isReferproPage() {
                const referproPaths = [
                    "/referpro",
                    "/referpro/refer-candidate",
                    "/referpro/open-vacancy",
                    "/referpro/claim-status",
                    "/referpro/profile",
                    "/referpro/terms"
                ];
                return referproPaths.includes(this.$route.path);
            },
            isSearchPage() {
                return this.$route.path === "/test";
            },
            isProfilePage() {
                return this.$route.path === "/profile";
            },

             isReadOnly() {
            return this.newUser.source === 'Reference' || this.newUser.source === 'REFERPRO';
            }

        },
        mounted() {
            this.$nextTick(() => {
                if (this.$route.path === "/") {
                    this.observeContentSearchBox();
                    window.addEventListener("resize", this.observeContentSearchBox);
                }
                this.candidateDetails()
                
            });


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
        beforeUnmount() {
            window.removeEventListener("resize", this.observeContentSearchBox);
            if (this.observer) {
                this.observer.disconnect();
            }
        },
        watch: {
            $route(to) {
                if (to.path === "/") {
                    this.showNavSearch = false; // Reset visibility on homepage load
                    this.$nextTick(() => {
                        this.observeContentSearchBox(); // Reinitialize observer
                    });
                } else {
                    this.showNavSearch = false; // Hide navbar search on other pages
                }
                if (to.path == "/profile") {
                    this.sidebar = false;
                }
            },
            showNavSearch(newValue) {
                if (newValue) {
                    this.$nextTick(() => this.expand());
                } else {
                    this.shrink();
                }
            },


            

            





        },
        methods: {
           handleUploadResumePopup(){

            if(this.state.isLoggedIn){
                this.showUploadResumePopup = true
                this.resumeUploadProcess =true
            }
            else if(!this.state.isLoggedIn){
                console.log("click")
                  this.showLoginPopup = true
            }
            
           },
            
            sendCommand() {
                eventBus.emit('run-command', this.query);
            },
            observeContentSearchBox() {
                this.$nextTick(() => {
                    const contentSearchBox = document.querySelector(".content-search-box");

                    if (!contentSearchBox) {
                        this.showNavSearch = true;
                        return;
                    }

                    // Disconnect previous observer before creating a new one
                    if (this.observer) {
                        this.observer.disconnect();
                    }

                    this.observer = new IntersectionObserver(
                        (entries) => {
                            this.showNavSearch = !entries[0].isIntersecting;
                        }, {
                            threshold: 0.1
                        }
                    );

                    this.observer.observe(contentSearchBox);
                });
            },
            expand() {
                if (this.$refs.searchInput) {
                    this.$refs.searchInput.style.width = window.innerWidth <= 620 ? "150px" : "240px";
                    this.$refs.searchInput.style.padding = "0 6px";
                }
            },
            shrink() {
                if (this.$refs.searchInput) {
                    this.$refs.searchInput.style.width = "0px";
                    this.$refs.searchInput.style.padding = "0";
                }
            },
            search() {
                console.log("Searching for:", this.query);
            },
            openSideBar() {
                if (this.$route.path != "/profile") {
                    this.sidebar = true;
                }
            },
            closeSideBar() {
                this.sidebar = false;
            },

            handleFileUpload() {
                const file1 = this.$refs.file1.files[0];
                // const file2 = this.$refs.file2.files[0];
                // const files = [file1, file2];
                const files = [file1];

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

            async uploadResume(file) {
                this.loading = true;
                this.resumeUploadProcess =false;
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
                            this.showUploadResumePopup = false
                            window.location.reload();
                        }
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                    this.loading = false;
                }
            },






            async candidateDetails() {
                try {
                    if (this.profileMail && this.profileMail.emailId) {
                        const response = await apiService.getCandidateDetails(this.profileMail.emailId);
                        this.candidateProfile = "https://erp.teamproit.com" + response.data.message.candidate_image;
                        this.cv= response.data.message.irf;
                        if (response.data.message.candidate_image) {
                            this.profileUrl.profile = "https://erp.teamproit.com" + response.data.message.candidate_image;
                            this.id = response.data.message.name;
                        }
                        
                        
                    } else {
                        console.error("No email provided in profileMail.");
                    }
                } catch (error) {
                    console.error("Failed to fetch candidate details:", error);
                }
                
            },


             handleSuccess() {
            if (this.success && this.emailLogin) {
            this.emailLogin = false;
            return true;
            }
            return this.success;
        },


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




        },
    };
</script>



<style>
    .search-box-nav {
        transform: translate(-50%, 50%);
        background: white;
        left: 30%;
        height: 40px;
        border-radius: 40px;
        padding: 10px;
        display: flex;
        margin-top: -40px;
    }

    .searchInput {
        border: none;
        background: none;
        outline: none;
        color: #2f3640;
        font-size: 16px;
        width: 100px;
        transition: 0.8s;
        padding: 0 6px;
    }

    .searchButton {
        color: #2f3640;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.4s;
        border: none;
        cursor: pointer;
    }


    .searchInput:focus {
        outline: none !important;
        box-shadow: none !important;
        border: none;
    }

    /* Animation for Search Box */
    .fade-scale-enter-active,
    .fade-scale-leave-active {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .fade-scale-enter-from,
    .fade-scale-leave-to {
        opacity: 0;
        transform: scale(0.8);
    }

    .router-link-active {
        color: #0097ff;
    }

    .navigation-user-profile-shadow {
        filter: drop-shadow(1px 1px 1px silver);
    }

    .menu {
        position: relative;
        display: inline-block;
    }

    .menu::after {
        content: "";
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: #05264e;
        transform: scaleX(0);
        transition: transform 0.3s ease-in-out;
        border-radius: 10px;
    }

    .menu:hover::after {
        transform: scaleX(1);
    }

    /* .my-active-link {
        color: #0070cc;
        opacity: 1
        font-sixe
    } */
</style>