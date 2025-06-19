<template>
    <div :class="{'opacity-[0.5]': loading}">
        <div class="w-10/12 mt-14 mx-auto text-center font-sans flex md:gap-14">
            <div class="fade-section sticky top-[100px]">
                <div class="border rounded-md p-5 bg-white shadow-lg shadow-gray-600 register-class" style="width: 330px;">
                    <img src="https://i.postimg.cc/RZxmRNMy/register-jobpro.png" class="bg-gray-50 mx-auto w-44 rounded-full" />
                    <h1 class="font-bold text-2xl mt-3" style="color: #05264e;">On register, you can </h1>
                    <ul class="text-left text-gray-700 text-md pl-1 mt-1" style="color: #7680a2;">
                        <li class="flex gap-1 pt-1"><img src="https://i.postimg.cc/MKSMcZCZ/check.png" class="w-4 h-4 mt-1" /> Build your profile and let recruiters find you</li>
                        <li class="flex gap-1 pt-1"><img src="https://i.postimg.cc/MKSMcZCZ/check.png" class="w-4 h-4 mt-1" /> Get job postings delivered right to your email</li>
                        <li class="flex gap-1 pt-1"><img src="https://i.postimg.cc/MKSMcZCZ/check.png" class="w-4 h-4 mt-1" /> Find a job and grow your career</li>
                    </ul>
                </div>
            </div>
            <div class="w-full fade-section mainjob-div">
                <div class="bg-white rounded-md pl-10 p-5 shadow-lg shadow-gray-600 text-left">
                    <h1 class="font-bold text-2xl mt-3" style="color: #05264e;">Create your JOBPRO profile</h1>
                    <p class="text-md font-semibold mt-3" style="color: #7680a2;">Search & apply to jobs from India's No.1 Job Site</p>
                    <div class="flex gap-10">
                        <form @submit.prevent="submitUser" id="newUser" class="mt-5">
                            <label for="full_name" class="text-md font-semibold " style="color: #05264e;">Full name </label><span class="text-red-500">*</span><br />
                            <input type="text" v-model="newUser.full_name" name="full_name" placeholder="What is your name ?" class="border text-[#006fdd] font-medium rounded-lg text-sm p-3 mt-2 w-2/3 mb-3 name-box" required /><br />
                            <label for="email" class="text-md font-semibold " style="color: #05264e;">Email ID </label><span class="text-red-500">*</span><br />
                            <input type="text" v-model="newUser.email" name="email" placeholder="Tell us your Email ID" class="border text-[#006fdd] font-medium rounded-lg text-sm p-3 mt-2 w-2/3 mb-3 mail-box" required /><br />
                            <p v-if="errorField=='email'" class="text-red-500 mb-3 text-sm font-medium">{{ error }}</p>
                            <label for="password" class="text-md font-semibold " style="color: #05264e;">Password </label><span class="text-red-500">*</span><br />
                            <input type="password" v-model="newUser.password" name="password" placeholder="(minimum 8 characters)" class="border text-[#006fdd] font-medium rounded-lg text-sm p-3 mt-2 w-2/3 mb-3 pwd-box" required /><br />
                            <div class="relative mb-3">
                                <label for="mobile_no" class="text-md font-semibold" style="color: #05264e;">Phone </label>
                                <span class="text-red-500">*</span><br />
                                <input type="tel" v-model="newUser.mobile_no" id="phone" name="mobile_no" placeholder="Enter your mobile number" class="border text-[#006fdd] font-medium rounded-lg text-sm p-3 mt-2 pl-10 mt-2 w-[140%] phone-box" required />
                            </div>
                            <!-- <div class="relative">
                                <label for="mobile_no" class="text-md font-semibold " style="color: #05264e;">Phone </label><span class="text-red-500">*</span><br />
                                <input type="tel" v-model="newUser.mobile_no" name="mobile_no" placeholder="Enter your mobile number" pattern="[0-9]{10}" class="border text-[#006fdd] font-medium rounded-lg text-sm p-3 pl-10 mt-2 w-2/3 mb-3 phone-box" required /><br />
                                <p class="absolute top-[40px] pl-2.5 mt-0.5 text-[#05264e] text-[15px] font-medium">+91</p>
                            </div> -->
                            
                            <p v-if="errorField=='mobile'" class="text-red-500   text-sm font-medium">{{ error }}</p>
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
                                class="border font-medium rounded-lg text-sm p-3 mt-2 w-2/3 mb-3 font-sans source-box" 
                                v-model="newUser.source" 
                                style="color: #0049f4; opacity: 1; pointer-events: none;" 
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
                                <input type="text" id="referenceSource" readonly v-model="newUser.referenceSource" class="border text-sm text-[#0049f4] font-medium rounded-lg p-3 mt-2 w-2/3 mb-3 font-sans" placeholder="Enter referred Candidate ID" />
                            </div>
  
                            <div v-if="newUser.source === 'Social Media'">
                                <label for="mediaSource" class="text-md font-semibold" style="color: #05264e;">
                                    Social media platform
                                </label>
                                <span class="text-red-500">*</span><br />
                                <input type="text" id="mediaSource" v-model="newUser.mediaSource" class="border text-sm font-medium rounded-lg p-3 mt-2 w-2/3 mb-3 font-sans" placeholder="e.g., Facebook, LinkedIn" />
                            </div>
  
                            <p class="text-gray-500 text-xs mt-4" style="color: #7680a2;">By clicking Register, you agree to the <span class="text-sm font-semibold" style="color: #007fcf;">Terms and Conditions</span> & <span class="text-sm font-semibold" style="color: #007fcf;">Privacy Policy</span> of <span class="font-semibold" style="color: #05264e;">jobpro.com</span></p>
                            <input type="submit" id="saveNewUser" class="rounded-full mt-4 text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:ring-1 focus:ring-blue-500 px-5 py-2 transition-full" style="font-size: 15px;" value="Register Now" />
                        </form>
                        <div class="mt-14 ml-[-30px] or-hide">
                            <div style="border-left: 1px solid lightgray;height: 120px;"></div>
                            <p class="ml-[-5px] mb-1">or</p>
                            <div style="border-left: 1px solid lightgray;height: 120px;"></div>
                        </div>
                        <div class="mt-[150px] continue-hide">
                            <p class="text-md font-semibold" style="color: #05264e;">Continue with</p>
                            <router-link class="flex justify-center gap-2 border border rounded-xl border-blue-600 text-blue-600 mt-2">
                                <img src="https://i.postimg.cc/bvMnv7cQ/google-icon-logo-svgrepo-com.png" class="mt-2" style="height: 17px;" />
                                <p class="font-semibold py-1">Google</p>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="loading" class="text-center mt-4 absolute top-[50%] right-[50%]">
            <p><span class="loader"></span></p>
        </div>
    </div>
    <div v-if="success" class="success-message absolute right-[50px] top-[90%]">
        <div class="bg-gradient-to-r from-[#0bda51] to-[#0bda51] rounded-sm shadow-xl h-10 pt-2 w-[250px] ">
            <p class="text-white font-semibold font-sans text-center">Registered Successfully</p>
        </div>
    </div>
  </template>
  <script>
    import apiService from './services/apiService.js';
    import 'intl-tel-input/build/css/intlTelInput.css';
    import intlTelInput from 'intl-tel-input';
    export default {
        data() {
            return {
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
            }
        },
        computed: {
            isReadOnly() {
            return this.newUser.source === 'Reference' || this.newUser.source === 'REFERPRO';
            }
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
        methods: {
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
  
  <style scoped>
    .account-text-1 {
        color: #315df5;
    }
  
    .account-text-2 {
        color: #05264e;
        font-size: 1.9rem;
    }
  
    .required {
        color: #ff0000;
    }
  
    .log-button {
        background-color: #007be0;
    }
  
    .fade-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    }
  
    .fade-in {
        opacity: 1;
        transform: translateY(0);
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
  
    .success-message {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  
    @keyframes pulse {
        0% {
            opacity: 0;
        }
  
        100% {
            opacity: 1;
        }
    }
  
    @media (max-width: 575.98px) {
        .register-class {
            display: none;
        }
  
        .or-hide {
            display: none;
        }
  
        .continue-hide {
            display: none;
        }
  
        .mainjob-div {
            width: 200%;
            /* background-color: #0070cc; */
            padding-bottom:30px;
        }
        .name-box{
          width:100%;
        }
        .mail-box{
          width:100%;
        }
        .pwd-box{
          width:100%;
        }
        .phone-box{
          width:100%;
        }
        .source-box{
          width:100%;
        }
    }
  </style>