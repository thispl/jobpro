<template>
    <div :class="{'opacity-[0.5]': loading}">
      <div class="border rounded-sm shadow-xl mx-auto mt-[100px] shadow-blue-300 w-[400px]">
        <div class="mx-10">
          <h1 class="font-semibold text-xl mt-6" style="color: #05264e;">Reset Password</h1>
          <form class="mt-5 mb-10" @submit.prevent="handleResetPassword">
            <input type="password" v-model="new_password" id="newPassword" name="new_password" placeholder="New Password" class="border-gray-400 rounded-sm text-sm p-3 mt-2 w-full mb-4" style="color: #7680a2;" required><br>
            <input type="password" v-model="confirm_password" id="confirmPassword" name="confirm_password" placeholder="Confirm Password" class="border-gray-400 border rounded-sm text-sm p-3 mt-2 w-full" style="color: #7680a2;" required><br>
            <p v-if="resetFailed == 'mismatch'" class="text-sm text-red-500 text-center font-semibold mt-4">password doesn't match</p>
            <p v-if="resetFailed == 'weak'" class="text-sm text-red-500 text-center font-semibold mt-4">weak password</p>
            <p v-if="resetFailed == 'unexpected'" class="text-sm text-red-500 text-center font-semibold mt-4">oops something went wrong</p>
            <input type="submit" class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 font-medium rounded-sm text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400 w-full" style="font-size: 15px;" value="Confirm" />
          </form>
        </div>
      </div>
    </div>
    <div v-if="loading" class="text-center mt-4 absolute top-[40%] right-[50%]">
    <p><span class="loader"></span></p> 
  </div>
  <div v-if="success" class="success-message absolute right-[50px] top-[90%]">
    <div class="bg-gradient-to-r from-[#0bda51] to-[#0bda51] rounded-sm shadow-xl h-10 pt-2 w-[250px] ">
      <p class="text-white font-semibold font-sans text-center">Password Updated Successfully</p>
    </div>
  </div>
</template>

<script>
import apiService from './services/apiService.js';

export default {
    data() {
        return {
            new_password: '',
            confirm_password: '',
            user: '',
            resetFailed: '',
            loading: false,
        }
    },
    created() {
        const urlParams = new URLSearchParams(window.location.search);
        this.user = urlParams.get("user") || "";
    },

    methods: {
        async handleResetPassword() {
    this.loading = true;
    this.resetFailed = false;
    this.success = false;

    if (this.new_password === this.confirm_password) {
        const response = await apiService.updatePassword(this.user, this.new_password);
        if (response.status == 200) {
            this.success = true;
            setTimeout(() => {
                this.$router.push('/login');
            }, 1000);
        } 
        else if (response.status == 417){
            this.success = false;
            this.resetFailed = 'weak'
            this.loading = false;
        }
        else {
            this.resetFailed = 'unexpected';
            console.log("Password reset failed: ", response|| "Unexpected error");
        }
    } else {
        this.resetFailed = 'mismatch';
        this.loading = false;
    }
}

    }

}

</script>

<style>
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
</style>