<template>
  <div class="bg-blue-700 pt-10 pb-8 rounded-lg relative overflow-hidden">
    <!-- Decorative background circles -->
    <div class="h-[250px] w-[250px] rounded-full absolute bottom-[-50px] left-[-50px] bg-blue-600 z-10 shadow-md shadow-blue-500/30"></div>
    <div class="h-[150px] w-[150px] rounded-full absolute top-[-30px] right-[-30px] bg-blue-500 z-20 shadow-md shadow-blue-400/30"></div>
    <div class="hidden lg:block h-[150px] w-[150px] rounded-full absolute top-[-70px] left-[300px] bg-blue-500 z-20 shadow-md shadow-blue-400/30"></div>
    <div class="hidden md:block h-[200px] w-[200px] rounded-full absolute md:right-[100px] lg:right-[300px] md:top-[150px] bg-blue-600 z-10 shadow-md shadow-blue-500/30"></div>

    <!-- Content wrapper -->
    <div class="relative z-30">
      <img src="../images/user.png" alt="user" class="w-[80px] md:w-[100px] lg:w-[120px] mx-auto shadow-md shadow-gray-100 rounded-full" />
      <p class="text-center text-white mt-3 font-semibold text-xl pt-3">Amar Karthick P</p>
      <div class="flex space-x-2 text-white mt-1 font-medium justify-center">
        <p>0 <span class="text-gray-300">Referrals</span></p>
        <p class="text-gray-300">|</p>
        <p>0 <span class="text-gray-300">Earnings</span></p>
      </div>
    </div>
  </div>
<div class="grid grid-cols-1 md:grid-cols-2 md:m-5 lg:m-10 md:gap-2 lg:gap-5">
  <!-- Bank Details -->
  <div class="bg-white m-3 mt-5 p-1 rounded-lg order-0"> 
    <div class="flex px-3 pt-5">
      <p class="text-xl font-semibold text-[#05264e]">Bank Details</p>
      <svg @click="handleBankDetails" class="ml-auto top-10 h-5 w-5 transform hover:scale-110 transition-all duration-300" :fill="editBankDetailsColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
      </svg>
    </div>
    
    <div class="my-3 mx-2 relative">
      <input type="text" class="border-0 bg-[whitesmoke] h-10 w-full rounded-lg font-medium pl-5 text-[#05264e]" :readonly="editBankDetails" placeholder="Account Number" v-model="accountNumber" />
    </div>

    <div class="my-5 mx-2 relative">
      <input type="text" class="border-0 bg-[whitesmoke] h-10 w-full rounded-lg font-medium pl-5 text-[#05264e]" :readonly="editBankDetails" placeholder="IFSC Code" v-model="ifscCode" />
    </div>
  </div>
  <!-- Personal Details -->
  <div class="bg-white m-3 mt-5 p-1 rounded-lg order-1 md:order-2">
    <div class="flex px-3 pt-5">
      <p class="text-xl font-semibold text-[#05264e]">Personal Details</p>
      <svg @click="handlePersonalDetails" class="ml-auto top-10 h-5 w-5 transform hover:scale-110 transition-all duration-300" :fill="editPersonalDetailsColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
      </svg>
    </div>

    <div class="my-3 mx-2 relative">
      <input type="text" class="border-0 bg-[whitesmoke] h-10 w-full rounded-lg font-medium pl-5 text-[#05264e]" :readonly="editPersonalDetails" placeholder="Full Name" v-model="fullName" />
    </div>

    <div class="my-5 mx-2 relative">
      <input type="text" class="border-0 bg-[whitesmoke] h-10 w-full rounded-lg font-medium pl-5 text-[#05264e]" :readonly="editPersonalDetails" placeholder="Email ID" v-model="emailID" />
    </div>

    <div class="my-5 mx-2 relative">
      <input type="text" class="border-0 bg-[whitesmoke] h-10 w-full rounded-lg font-medium pl-5 text-[#05264e]" :readonly="editPersonalDetails" placeholder="Primary Mobile" v-model="primaryMobile" />
    </div>

    <div class="my-5 mx-2 relative">
      <input type="text" class="border-0 bg-[whitesmoke] h-10 w-full rounded-lg font-medium pl-5 text-[#05264e]" :readonly="editPersonalDetails" placeholder="Secondary Mobile" v-model="secondaryMobile" />
    </div>
    <div class="my-5 mx-2 relative">
      <input @focus="DOBformatFocus" @blur="DOBformatBlur" type="text" class="border-0 bg-[whitesmoke] h-10 w-full rounded-lg font-medium pl-5 text-[#05264e]" :readonly="editPersonalDetails" :placeholder="mobilePlaceHolderData"  v-model="dob"/>
    </div>
  </div>
  <!-- Proof Details -->
  <div class="bg-white m-3 mt-5 p-1 rounded-lg order-2 md:order-1">
    <div class="flex px-3 pt-5">
      <p class="text-xl font-semibold text-[#05264e]">Id Proof</p>
      <svg @click="handleIdProof" class="ml-auto top-10 h-5 w-5 transform hover:scale-110 transition-all duration-300" :fill="editIdProofColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
      </svg>
    </div>
    <div class="my-3 mx-2 relative">
      <input type="text" class="border-0 bg-[whitesmoke] h-10 w-full rounded-lg font-medium pl-5 text-[#05264e]" :readonly="editIdProof" placeholder="Passport ID" v-model="passportID" />
      
    </div>

    <div class="my-5 mx-2 relative">
      <input type="text" class="border-0 bg-[whitesmoke] h-10 w-full rounded-lg font-medium pl-5 text-[#05264e]" :readonly="editIdProof" placeholder="Aadhaar ID" v-model="aadhaarID" />
      
    </div>
  </div>
  <!-- Address Details -->
  <div class="bg-white m-3 mt-5 p-1 rounded-lg order-3">
    <div class="flex px-3 pt-5">
      <p class="text-xl font-semibold text-[#05264e]">Address</p>
      <svg @click="handleAddress" class="ml-auto top-10 h-5 w-5 transform hover:scale-110 transition-all duration-300" :fill="editAddressColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
      </svg>
    </div>
    <div class="my-3 mx-2 relative">
      <input type="text" class="border-0 bg-[whitesmoke] h-10 w-full rounded-lg font-medium pl-5 text-[#05264e]" :readonly="editAddress" placeholder="Street name" v-model="streetName" />
      
    </div>

    <div class="my-5 mx-2 relative">
      <input type="text" class="border-0 bg-[whitesmoke] h-10 w-full rounded-lg font-medium pl-5 text-[#05264e]" :readonly="editAddress" placeholder="City / Town" v-model="city" />
      
    </div>

    <div class="my-5 mx-2 relative">
      <input type="text" class="border-0 bg-[whitesmoke] h-10 w-full rounded-lg font-medium pl-5 text-[#05264e]" :readonly="editAddress" placeholder="State" v-model="state" />
      
    </div>

    <div class="my-5 mx-2 relative">
      <input type="text" class="border-0 bg-[whitesmoke] h-10 w-full rounded-lg font-medium pl-5 text-[#05264e]" :readonly="editAddress" placeholder="Postal / Zipcode" v-model="postalCode" />
      
    </div>

    <div class="my-5 mx-2 relative">
      <input type="text" class="border-0 bg-[whitesmoke] h-10 w-full rounded-lg font-medium pl-5 text-[#05264e]" :readonly="editAddress" placeholder="Country" v-model="country" />

    </div>
  </div>
</div>
<div class="bg-[#efeff5] sticky bottom-0 pb-5 mt-5 md:mt-[-20px] mb-0">
  <div @click="handleSaveChanges()" class="relative mx-[4%] text-white font-medium shadow-md text-center rounded-sm py-2 bg-gradient-to-r hover:cursor-pointer from-blue-800 to-blue-500 text-white p-6 rounded-md">
     
    <div v-if="loading" class="text-center loader-style">
      </div>
      <p v-if="!loading">{{saveButtonMessage}}</p>
  </div>
</div>

</template>

<script>
import apiService from '../services/apiService';
export default {
  name: "ReferProProfile",
  data() {
    return {
      mobilePlaceHolderData: "Date of Birth",
      editBankDetails: true,
      editBankDetailsColor: "#05264e",
      editPersonalDetails: true,
      editPersonalDetailsColor: "#05264e",
      editIdProof: true,
      editIdProofColor: "#05264e",
      editAddress: true,
      editAddressColor: "#05264e",
      fullName: "",
      emailID: "",
      primaryMobile: "",
      secondaryMobile: "",
      dob: "",
      streetName: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      accountNumber: "",
      ifscCode: "",
      passportID: "",
      aadhaarID: "",
      loading: false,
      saveButtonMessage: "Save Changes"
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.fullName = localStorage.getItem("fullName");
      this.emailID = localStorage.getItem("emailId");
      this.get_profile();
    });
  },
  methods: {
    handleBankDetails() {
      this.editBankDetails = !this.editBankDetails;
      this.editBankDetailsColor = this.editBankDetails ? "#05264e" : "#265df5";
    },
    handlePersonalDetails() {
      this.editPersonalDetails = !this.editPersonalDetails;
      this.editPersonalDetailsColor = this.editPersonalDetails ? "#05264e" : "#265df5";
    },
    handleIdProof() {
      this.editIdProof = !this.editIdProof;
      this.editIdProofColor = this.editIdProof ? "#05264e" : "#265df5";
    },
    handleAddress() {
      this.editAddress = !this.editAddress;
      this.editAddressColor = this.editAddress ? "#05264e" : "#265df5";
    },
    async get_profile() {
      try {
        if (this.emailID) {
          const response = await apiService.get_referpro_profile(this.emailID);
          if (response.status === 200) {
            const data = response.data.message;
            this.accountNumber = data.account_number || "";
            this.ifscCode = data.ifsc_code || "";
            this.primaryMobile = data.primary_mobile || "";
            this.secondaryMobile = data.secondary_mobile || "";
            this.dob = data.dob || "";
            this.passportID = data.passport_id || "";
            this.aadhaarID = data.aadhaar_id || "";
            this.streetName = data.street_name || "";
            this.city = data.city || "";
            this.state = data.state || "";
            this.postalCode = data.postal_code || "";
            this.country = data.country || "";
          } else {
            console.error('Error fetching profile:', response.statusText);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    },
    async handleSaveChanges() {
      this.loading = true;
      const data = {
        email: this.emailID,
        account_number: this.accountNumber,
        ifsc_code: this.ifscCode,
        name: this.fullName,
        primary_mobile: this.primaryMobile,
        secondary_mobile: this.secondaryMobile,
        dob: this.dob,
        passport_id: this.passportID,
        aadhaar_id: this.aadhaarID,
        street_name: this.streetName,
        city: this.city,
        state: this.state,
        postal_code: this.postalCode,
        country: this.country
      };

      try {
        const response = await apiService.update_referpro_profile_data(
          this.emailID,
          this.accountNumber,
          this.ifscCode,
          this.fullName,
          this.primaryMobile,
          this.secondaryMobile,
          this.dob,
          this.passportID,
          this.aadhaarID,
          this.streetName,
          this.city,
          this.state,
          this.postalCode,
          this.country
        );

        if (response.status === 200) {
          console.log('Profile updated successfully');
          this.saveButtonMessage = response.data.message;
          this.loading = false;
        }
         else {
          console.error('Error updating profile:', response.statusText);
      this.loading = false;
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      this.loading = false;
      }
    }

  }
};
</script>

<style>
.loader-style {
      width: 14px;
      height: 14px;
      margin-top: 5px;
      border-radius: 50%;
      display: inline-block;
      border-top: 3px solid white;
      border-right: 3px solid transparent;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
  }
</style>