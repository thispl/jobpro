<template>
  <div :class="{'opacity-[0.5]': loading}" class="">
    <div v-if="!isLoggedIn && !success" class="mob-margin flex justify-center mt-20 fade-section">
      <div v-if="loginBox" class="bg-white rounded-sm shadow-lg shadow-gray-600 w-[400px]">
        <div class="mx-10">
          <h1 class="font-semibold text-xl mt-6" style="color: #05264e;">Login</h1>
          <!-- OTP LOGIN -->
          <div v-if="otpLogin">
            <form class="mt-10 mb-10" @submit.prevent="handleOtpLogin">
              <div class="relative">
                <label for="otp" class="text-md font-semibold" style="color: #05264e;">Mobile Number </label><br>
                <input type="tel" v-model="phone" id="phone" name="phone" pattern="[0-9]{10}" required placeholder="Enter your 10 digit mobile number" class="border-gray-400 rounded-sm text-sm p-3 pl-10 mt-2 w-full mb-4" style="color: #7680a2;"><br>
                <p class="absolute top-[40px] pl-2.5 mt-0.5 text-[#05264e] text-[15px] font-medium">+91</p>
                <p class="text-sm text-[#7680a2]">You will receive an OTP on this number</p>
                <input type="submit" class="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 font-medium rounded-sm text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400 w-full" style="font-size: 15px;" value="Get OTP" />
                <p @click="emailLogin = true, otpLogin = false" class="cursor-pointer mt-5 text-[#007be0] focus:ring-1 font-medium rounded-sm text-sm px-4 py-2.5 text-center border border-[#007be0] hover:scale-105 w-full transition-all">Use Email to Login</p>
              <!-- <div class="separator mt-4">
                <span class="text-xs mx-2 text-gray-600">Or</span>
              </div>
              <div class="flex rounded-lg shadow-lg px-2 mt-3 mb-10 pb-1">
                <img src="https://i.postimg.cc/bvMnv7cQ/google-icon-logo-svgrepo-com.png" class="mt-2 pl-2" style="height: 17px;" />
                <p class="text-gray-700 text-sm p-2 ml-16">Sign in with Google</p>
              </div> -->
              </div>
            </form>
          </div>
          <!-- EMAIL LOGIN -->
          <div v-if="emailLogin">
            <form class="mt-5 mb-10" @submit.prevent="handleLogin">
              <label for="email" class="text-md font-semibold" style="color: #05264e;">Email ID </label><span class="text-red-500">*</span><br>
              <input type="text" v-model="email" id="email" name="email" placeholder="Enter Email ID" class="border-gray-400 rounded-sm text-sm p-3 mt-2 w-full mb-4" style="color: #7680a2;" required><br>
              <label for="password" class="text-md font-semibold" style="color: #05264e;">Password </label><span class="text-red-500">*</span><br>
              <div class="relative w-full">
                <input :type="show ? 'text' : 'password'" v-model="password" id="password" name="password" placeholder="Enter Password" class="border-gray-400 border rounded-sm text-sm p-3 mt-2 w-full pr-14" style="color: #7680a2;" required><br>
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
              <!-- <div class="separator mt-4">
                <span class="text-xs mx-2 text-gray-600">Or</span>
              </div>
              <div class="flex rounded-lg shadow-lg px-2 mt-3 mb-10 pb-1">
                <img src="https://i.postimg.cc/bvMnv7cQ/google-icon-logo-svgrepo-com.png" class="mt-2 pl-2" style="height: 17px;" />
                <p class="text-gray-700 text-sm p-2 ml-16">Sign in with Google</p>
              </div> -->
            </form>
          </div>
          <!-- OTP VERIFICATION -->
          <div v-if="otpVerification">
            <form class="mt-5 mb-10" @submit.prevent="handleOtpVerification">
              <p class="text-sm text-[#7680a2] leading-5 mb-5">We have sent a 6 digit OTP to your mobile<br> number +91 {{ this.phone }}</p>
              <label for="email" class="text-[15px] font-semibold" style="color: #05264e;">One Time Passcode </label><br>
              <div class="flex justify-center item-center font-sans">
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
        </div>
      </div>
    </div>
    
    <div v-if="isLoggedIn" class="text-center">
      <h2 class="mt-20 text-[#05264e] text-2xl font-bold">Hi {{ profileName.fullName }} {{ profileMail.emailId }}!<br> Already, you have been logged in.</h2>
      <button @click="handleLogout" class="mx-auto mt-4 bg-red-500 text-white py-2 px-4 rounded">Logout</button>
    </div>

    <div v-if="!isLoggedIn && success" class="text-center mt-[100px]">
          <h1 class="text-xl font-semibold" style="color: #05264e;">Password Email Sent</h1>
          <p class="text-md mt-3 font-medium" style="color: #05264e;">Password reset instructions have been sent to your email</p>
    </div>

    

    <!-- Forgot Password Modal -->
    <div v-if="showForgotPassword && !success" class="fixed inset-0 bg-black bg-opacity-[0.5] flex justify-center items-center">
      <div class="bg-white p-6 rounded-md border-0 shadow-xl w-[300px]">
        <h2 class="text-md font-semibold" style="color: #05264e;">Forgot Password</h2>
        <form @submit.prevent="submitForgotPassword" id="forgotPassword" class="mt-3">
          <label for="email" class="text-sm font-semibold" style="color: #05264e;">Email ID </label><span class="text-red-500"></span><br>
          <input type="email" v-model="forgotPassword.email" placeholder="Enter your email" class="mb-1 border-gray-400 rounded-sm text-sm p-3 w-full mt-1" style="color: #7680a2;" required />
          <p v-if="errorField=='mail'" class="text-red-500 text-sm font-medium my-3">{{ error }}</p>
          <button type="submit" class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 font-medium rounded-sm text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400 w-full" style="font-size: 15px;">Confirm</button>
        </form>
        <button @click="showForgotPassword = false" class="text-[13px] text-center text-blue-800 mt-2 font-medium">Cancel</button>
      </div>
    </div>
  </div>

  <div v-if="loading" class="text-center mt-4 absolute top-[40%] right-[50%]">
    <p><span class="loader"></span></p> 
  </div>
  <div v-if="successfull" class="success-message absolute right-[50px] top-[90%]">
    <div class="bg-gradient-to-r from-[#0bda51] to-[#0bda51] rounded-sm shadow-xl h-10 pt-2 w-[250px] ">
      <p class="text-white font-semibold font-sans text-center">Password Updated Successfully</p>
    </div>
  </div>
  <div class="g_id_signin" data-onsuccess="onSignIn"></div>
  <div v-if="redirecting" class="text-center mt-[100px]">
          <h1 class="text-xl font-semibold" style="color: #05264e;">The mobile number is not registered</h1>
          <p class="text-md mt-3 font-medium" style="color: #05264e;">redirecting to registration...</p>
    </div>
</template>

<script>
import axios from 'axios';
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import apiService from './services/apiService.js';

export default {
  data() {
    return {
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
    };
  },
  mounted() {
    this.checkLoginStatus(); 
    this.addIntersectionObserver();
    window.gapi.load('auth2', () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({
          client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
        });
      }
    });
  },
  setup() {
    const state = inject('state');
    const profileName = inject('profileName');
    const profileMail = inject('profileMail');
    const candidateId = inject('candidateId');
    const router = useRouter();

    const handleLogout = () => {
      state.isLoggedIn = false;
      localStorage.removeItem('authToken');
      localStorage.removeItem('fullName');
      localStorage.removeItem('candidateToken');
      router.push('/login');
      window.location.reload();
    };

    return { state, profileName, profileMail, candidateId, handleLogout };
  },
  methods: {
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
        console.log(response.data.message)
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
        // if (responseData.data.message == "fullname doesn't match") {
        //   this.error = "name doesn't match";
        //   this.loading = false;
        //   this.errorField = 'fullname'
        // }
        // if (responseData.data.message == "success") {
        //   this.error = '';
        //   this.loading = false;
        //   this.success = true;
        //   this.successfull = true;
        //   setTimeout(() => {
        //     this.successfull = false;
        //   }, 2000)
        // }
      
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
  }
};
</script>


<style>

.separator {
  display: flex;
  align-items: center;
}

.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #efefef;
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
  
  .otp-input:focus {
    border: 1px solid #007be0;
    box-shadow: 0 0 2px 2px #7ebdf0;
  }
  
  .otp-input:disabled {
    opacity: 0.5;
  }
  @media (max-width: 575.98px) {
    .mob-margin{
      margin-left: 10px;
      margin-right:10px;
    }
  }
</style>
