<template>
    <div class="flex w-full px-20 pt-20 gap-8">
      <div class="w-[50%] pt-10 pl-8">
        <h1 class="capitalize text-[#05264e] text-[40px] font-bold">Help someone,<br> get hired <br> and earn<br> while you do</h1>
        <button @click="handleTerms()" class="mt-10 text-white text-xl bg-[#ff9f00] hover:bg-[#fc9441] focus:ring-1 font-medium rounded-lg text-sm px-6 py-3 text-center dark:focus:ring-orange-400">
            Terms & Conditions
        </button>
      </div>
      <div>
        <div class="relative">
            <div class="absolute right-[20px] top-[20px] bg-white/40 backdrop-blur-sm p-2 text-gray-800 rounded-lg">
                <div class="flex gap-2">
                    <img src="https://i.postimg.cc/6qY40bGc/Whats-App-Image-2024-09-30-at-11-38-34-75256763-removebg-preview.png" class="w-12 bg-white rounded-lg p-1" />
                    <div class="flex flex-col justify-center">
                        <p class="text-sm text-gray-700 font-bold">Invititation Sent!</p>
                        <p class="text-[11px] text-gray-700 font-medium">Invitation has been succ ...</p>
                    </div>
                </div>
            </div>
            <div class="absolute left-[60px] top-[-30px] bg-white/40 backdrop-blur-sm p-2 text-gray-800 rounded-lg">
                <div class="flex gap-2">
                    <img src="https://i.postimg.cc/6qY40bGc/Whats-App-Image-2024-09-30-at-11-38-34-75256763-removebg-preview.png" class="w-12 bg-white rounded-lg p-1" />
                    <div class="flex flex-col justify-center">
                        <p class="text-sm text-gray-700 font-bold">Registered!</p>
                        <p class="text-[11px] text-gray-700 font-medium">Successfully registered ...</p>
                    </div>
                </div>
            </div>
            <div class="absolute left-[-40px] top-[90px] bg-white/40 backdrop-blur-sm p-2 text-gray-800 rounded-lg">
                <div class="flex gap-2">
                    <img src="https://i.postimg.cc/6qY40bGc/Whats-App-Image-2024-09-30-at-11-38-34-75256763-removebg-preview.png" class="w-12 bg-white rounded-lg p-1" />
                    <div class="flex flex-col justify-center">
                        <p class="text-sm text-gray-700 font-bold">New Job Posted!</p>
                        <p class="text-[11px] text-gray-700 font-medium">Project Manager role ...</p>
                    </div>
                </div>
            </div>
            <div class="absolute left-[-60px] bottom-[150px] bg-white/40 backdrop-blur-sm p-2 text-gray-800 rounded-lg">
                <div class="flex gap-2">
                    <img src="https://i.postimg.cc/6qY40bGc/Whats-App-Image-2024-09-30-at-11-38-34-75256763-removebg-preview.png" class="w-12 bg-white rounded-lg p-1" />
                    <div class="flex flex-col justify-center">
                        <p class="text-sm text-gray-700 font-bold">Congratulations!</p>
                        <p class="text-[11px] text-gray-700 font-medium">You've been selected ...</p>
                    </div>
                </div>
            </div>
            <div class="absolute right-[0px] top-[150px] bg-white/40 backdrop-blur-sm p-2 text-gray-800 rounded-lg">
                <div class="flex gap-2">
                    <img src="https://i.postimg.cc/6qY40bGc/Whats-App-Image-2024-09-30-at-11-38-34-75256763-removebg-preview.png" class="w-12 bg-white rounded-lg p-1" />
                    <div class="flex flex-col justify-center">
                        <p class="text-sm text-gray-700 font-bold">Congratulations!</p>
                        <p class="text-[11px] text-gray-700 font-medium">Your friend got selected ...</p>
                    </div>
                </div>
            </div>
            <img class="z-20 pt-10" src="../images/referpro-tems-and-condition.png" width="800px" />
        </div>
      </div>
    </div>
    <div class="bg-white mx-10 rounded-lg text-[#05264e]">
        <div class="p-10" ref="showTermAndCondition">
            <h1 class="pt-5 text-center font-bold text-[2rem]">REFERPRO Terms & Conditions</h1>
            <p class="font-bold text-xl mt-10">Effective Date: <span class="text-gray-700 font-semibold text-[17px]">16-04-2025</span></p>
            <p class="font-bold text-xl mt-1">Last Updated: <span class="text-gray-700 font-semibold text-[17px]">16-04-2025</span></p>
            <p class="text-gray-700 mt-6 font-semibold text-[18px]">
                Welcome to REFERPRO, a platform that allows users to register, refer candidates, and earn rewards for successful referrals. These Terms and Conditions govern your use of the REFERPRO services, website, and platform. By accessing or using the Platform, you agree to be bound by these Terms.
            </p>
            <hr class="mt-5">
            <h2 class="mt-10 font-bold text-[1.5rem]">1. User Registration and Login</h2>
            <!-- <h3 class="mt-5 pl-6.5 font-bold text-[1.5rem]">Eligilibity</h3> -->
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                To register on REFERPRO, you must be at least 18 years of age
            </p>
            <!-- <h3 class="mt-5 pl-6.5 font-bold text-[1.5rem]">Registration Requirements</h3> -->
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                Users must complete a one-time registration, providing accurate information
            </p>
            <ul class="pl-20 text-gray-700 font-semibold text-[18px] list-disc">
                <li>Full Name</li>
                <li>Email ID</li>
                <li>Mobile Number</li>
            </ul>
            <!-- <h3 class="mt-5 pl-6.5 font-bold text-[1.5rem]">Login Options</h3> -->
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                Users can log in via:
            </p>
            <ul class="pl-20 text-gray-700 font-semibold text-[18px] list-disc">
                <li>Registered Email/Mobile + Password</li>
                <li>OTP-based login and password recovery</li>
                <li>Google Single Sign-On (if future)</li>
            </ul>
            <!-- <h3 class="mt-5 pl-6.5 font-bold text-[1.5rem]">Unique Identification</h3> -->
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                Each user will be assigned a unique ID. Duplicate registrations will be restricted by validating email or mobile numbers.
            </p>
            <!-- <h3 class="mt-5 pl-6.5 font-bold text-[1.5rem]">Data Accuracy</h3> -->
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                Users are responsible for the accuracy and authenticity of the information provided. Providing false or misleading information may result in account termination.            
            </p>
            <h2 class="mt-10 font-bold text-[1.5rem]">2. Referral System</h2>
            <!-- <h3 class="mt-5 pl-6.5 font-bold text-[1.5rem]">Candidate Referrals</h3> -->
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                Registered users may refer candidates by submitting the following mandatory details:            
            </p>
            <ul class="pl-20 text-gray-700 font-semibold text-[18px] list-disc">
                <li>Full Name</li>
                <li>Contact Information</li>
                <li>Passport Number</li>
                <li>Position being referred for</li>
                <li>Resume (optional)</li>
            </ul>
            <!-- <h3 class="mt-5 pl-6.5 font-bold text-[1.5rem]">Duplicate Checks</h3> -->
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                The platform will verify if a candidate already exists using Passport Number. Duplicate entries will be restricted.
            </p>
            <!-- <h3 class="mt-5 pl-6.5 font-bold text-[1.5rem]">Candidate ID and Tracking</h3> -->
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                Each referred candidate will be assigned an ID (e.g., CDXXXXX). The candidate may choose to become a registered user with extended privileges.            
            </p>
            <h2 class="mt-10 font-bold text-[1.5rem]">3. Vacancy and Job Listings</h2>
            <!-- <h3 class="mt-5 pl-6.5 font-bold text-[1.5rem]">Vacancy and Job Listings</h3> -->
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                All active vacancies are listed in the Open Vacancy section, from there user can refer a candidate.          
            </p>
            <!-- <h3 class="mt-5 pl-6.5 font-bold text-[1.5rem]">Application Conditions</h3> -->
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                Only registered users or referred candidates may apply for vacancies. Applications using existing profiles or uploaded resumes are allowed.
            </p>
            <!-- <h3 class="mt-5 pl-6.5 font-bold text-[1.5rem]">Job Alerts and Notifications</h3> -->
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                Users will receive vacancy alerts via email or WhatsApp (if enabled).            
            </p>
            <h2 class="mt-10 font-bold text-[1.5rem]">4. Candidate Status and Dashboard</h2>
            <!-- <h3 class="mt-5 pl-6.5 font-bold text-[1.5rem]">Candidate Monitoring</h3> -->
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                Users can monitor the status of referred candidates including their job application progress, conversion to registered user.       
            </p>
            <!-- <h3 class="mt-5 pl-6.5 font-bold text-[1.5rem]">Dashboard Features</h3> -->
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                Registered users may refer candidates by submitting the following mandatory details:            
            </p>
            <h2 class="mt-10 font-bold text-[1.5rem]">5. Claim Rewards</h2>
            <!-- <h3 class="mt-5 pl-6.5 font-bold text-[1.5rem]">Eligibility for Rewards</h3> -->
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                Users are eligible to claim a referral reward once the referred candidate is successfully onboarded.            
            </p>
            <!-- <h3 class="mt-5 pl-6.5 font-bold text-[1.5rem]">Claim Submission</h3> -->
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                Claims must be submitted via the Claim Reward button, after which:          
            </p>
            <ul class="pl-20 text-gray-700 font-semibold text-[18px] list-disc">
                <li>A Claim ID will be generated.</li>
                <li>A notification with details will be sent to email and mobile.</li>
            </ul>
            <!-- <h3 class="mt-5 pl-6.5 font-bold text-[1.5rem]">Bank Details & Validation</h3> -->
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                Users must complete their bank details for payment. IFSC code validation and other verification measures will apply.            
            </p>
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">Payment Process</p>
            <ul class="pl-20 text-gray-700 font-semibold text-[18px] list-disc">
                <li>Upon claim, a payment request is initiated internally.</li>
                <li>Notification will be sent post-payment with transaction details.</li>
                <li>Only one claim per candidate per user is permitted.</li>
            </ul>
            <h2 class="mt-10 font-bold text-[1.5rem]">6. Prohibited Conduct</h2>
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                Users are prohibited from:            
            </p>
            <ul class="pl-20 text-gray-700 font-semibold text-[18px] list-disc">
                <li>Creating multiple accounts using false information.</li>
                <li>Referring fake or non-consenting candidates.</li>
                <li>Engaging in any fraudulent activities to claim rewards.</li>
            </ul>
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                Violation of these conditions may result in permanent suspension and legal action.          
            </p>
            <h2 class="mt-10 font-bold text-[1.5rem]">7. Data Privacy & Security</h2>
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                REFERPRO commits to safeguarding personal data. Information will be used solely for the purpose of recruitment, verification, and rewards processing. We do not sell or share your personal data with third parties without your consent, except as required by law.         
            </p>
            <h2 class="mt-10 font-bold text-[1.5rem]">8. Termination</h2>
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                REFERPRO reserves the right to suspend or terminate access to any user account found violating these Terms or engaging in fraudulent activities.            
            </p>
            <h2 class="mt-10 font-bold text-[1.5rem]">9. Amendments</h2>
            <p class="pl-10 text-gray-700 mt-3 font-semibold text-[18px]">
                We may update these Terms from time to time. Continued use of the platform after changes implies acceptance of the updated Terms. Users will be notified of material changes via email or dashboard notification.           
            </p>
        </div>
    </div>
  </template>

<script>
export default {
  name: 'Terms',
  data() {
    return {
        
    };
  },
  methods: {
    handleTerms() {
        this.$nextTick(() => {
            const showTermAndCondition = this.$refs.showTermAndCondition;
            if (showTermAndCondition) {
                showTermAndCondition.scrollIntoView({ behavior: "smooth" });
            }
        });
    },
  }
};
</script>

<style>

</style>


  
  