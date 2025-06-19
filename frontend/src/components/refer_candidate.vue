<template>
    <div class="mt-10 mx-20 flex justify-center gap-28 w-[100%]">
        <div class="mt-10">
            <h1 class="capitalize text-[#05264e] text-[40px] font-bold">Help your friends<br> get a job and<br> get rewarded</h1>
            <!-- <p class="mt-2 text-[#646963] font-medium text-[20px]">Start referring today and help your<br> friends land international opportunities<br> while you enjoy great rewards!</p> -->
            <button @click="handleStartReferringNow()" class="mt-10 text-white text-xl bg-blue-700 hover:bg-blue-800 focus:ring-1 font-medium rounded-lg text-sm px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400">
                Start Referring Now
            </button>
        </div>
        <div class="mr-40">
            <img src="https://i.postimg.cc/SsP7hy4k/refer-candidate.png" width="400px" />
        </div>
    </div>
    <div class="mt-10 mx-20 bg-white shadow-lg shadow-gray-600 rounded-xl p-6 pb-14">
        <div class="flex mr-1 text-center w-full justify-center gap-5 mt-6">
            <div class="w-[25%]">
                <div class="flex justify-center">
                    <svg style="background-color: #d4e7ff;" class="h-16 w-16 rounded-full pl-1 py-5 bg-white shadow-lg shadow-gray-600" xmlns="http://www.w3.org/2000/svg" fill="#0070cc" viewBox="0 20 576 512">
                        <path d="M352 224l-46.5 0c-45 0-81.5 36.5-81.5 81.5c0 22.3 10.3 34.3 19.2 40.5c6.8 4.7 12.8 12 12.8 20.3c0 9.8-8 17.8-17.8 17.8l-2.5 0c-2.4 0-4.8-.4-7.1-1.4C210.8 374.8 128 333.4 128 240c0-79.5 64.5-144 144-144l80 0 0-61.3C352 15.5 367.5 0 386.7 0c8.6 0 16.8 3.2 23.2 8.9L548.1 133.3c7.6 6.8 11.9 16.5 11.9 26.7s-4.3 19.9-11.9 26.7l-139 125.1c-5.9 5.3-13.5 8.2-21.4 8.2l-3.7 0c-17.7 0-32-14.3-32-32l0-64zM80 96c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-48c0-17.7 14.3-32 32-32s32 14.3 32 32l0 48c0 44.2-35.8 80-80 80L80 512c-44.2 0-80-35.8-80-80L0 112C0 67.8 35.8 32 80 32l48 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L80 96z" />
                    </svg>
                </div>
                <p class="mt-8 text-xl text-[#05264e] font-semibold">Send Invitation</p>
                <p class="mt-2 leading-[20px] text-sm text-[#70756f] text-center font-semibold">Easily refer your friends by filling out our quick referral form.</p>
            </div>
            <div class="w-[25%]">
                <div class="flex justify-center ">
                    <svg style="background-color: #d4e7ff;" class="h-16 w-16 rounded-full pl-1 py-5 bg-white shadow-lg shadow-gray-600" fill="#0070cc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                        <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                    </svg>
                </div>
                <p class="mt-8 text-xl text-[#05264e] font-semibold">Registration</p>
                <p class="mt-2 leading-[20px] text-sm text-[#70756f] text-center font-semibold">Your friends will receive an invitation to sign up</p>
            </div>
            <div class="w-[25%]">
                <div class="flex justify-center ">
                    <svg style="background-color: #d4e7ff;" class="h-16 w-16 rounded-full py-5 bg-white shadow-lg shadow-gray-600" fill="#0070cc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M184 48l144 0c4.4 0 8 3.6 8 8l0 40L176 96l0-40c0-4.4 3.6-8 8-8zm-56 8l0 40L64 96C28.7 96 0 124.7 0 160l0 96 192 0 128 0 192 0 0-96c0-35.3-28.7-64-64-64l-64 0 0-40c0-30.9-25.1-56-56-56L184 0c-30.9 0-56 25.1-56 56zM512 288l-192 0 0 32c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-32L0 288 0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-128z" />
                    </svg>
                </div>
                <p class="mt-8 text-xl text-[#05264e] font-semibold">Got Placed</p>
                <p class="mt-2 leading-[20px] text-sm text-[#70756f] text-center font-semibold">Once your friend lands a job, you’ll be one step closer to your reward!</p>
            </div>
            <div class="w-[25%]">
                <div class="flex justify-center ">
                    <svg style="background-color: #d4e7ff;" class="h-16 w-16 rounded-full py-5 bg-white shadow-lg shadow-gray-600" fill="#0070cc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M190.5 68.8L225.3 128l-1.3 0-72 0c-22.1 0-40-17.9-40-40s17.9-40 40-40l2.2 0c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40L32 128c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l448 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-41.6 0c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88l-2.2 0c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0L152 0C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40l-72 0-1.3 0 34.8-59.2C329.1 55.9 342.9 48 357.8 48l2.2 0c22.1 0 40 17.9 40 40zM32 288l0 176c0 26.5 21.5 48 48 48l144 0 0-224L32 288zM288 512l144 0c26.5 0 48-21.5 48-48l0-176-192 0 0 224z" />
                    </svg>
                </div>
                <p class="mt-8 text-xl text-[#05264e] font-semibold">Get Reward</p>
                <p class="mt-2 leading-[20px] text-sm text-[#70756f] text-center font-semibold">Enjoy exciting rewards for every successful referral.</p>
            </div>
        </div>
    </div>
    <div ref="inviteFriendForm" class="mt-10 mb-8 mx-20 flex items-center justify-center">
        <div class="bg-white w-full shadow-lg shadow-gray-600 rounded-xl p-6">
            <h1 class="text-[#05264e] font-semibold text-3xl mb-5">Invite friends!</h1>
            <form @submit.prevent="submitReferral" class="mt-5">
                <div class="mt-3 m-5 flex flex-col justify-center gap-10">
                    <div class="input-group" :class="{ 'input-active': isNameFocused || name }">
                        <input v-model="name" type="text" class="input rounded font-medium" required @focus="isNameFocused = true" @blur="handleBlur" />
                        <label for="name" class="label font-medium" :class="{ 'label-active': isNameFocused || name }">
                            Full Name <span :class="{ 'text-red-500': isNameFocused || name }">*</span>
                        </label>
                    </div>
                    <div class="input-group" :class="{ 'input-active': isMailFocused || email }">
                        <input v-model="email" type="email" class="input rounded font-medium" required @focus="isMailFocused = true" @blur="handleBlur" />
                        <label for="email" class="label font-medium" :class="{ 'label-active': isMailFocused || email }">
                            Email ID <span :class="{ 'text-red-500': isMailFocused || email }">*</span>
                        </label>
                    </div>
                    <div class="input-group" :class="{ 'input-active': isMobileFocused || mobile }">
                        <input v-model="mobile" type="tel" pattern="[0-9]{10}" class="input rounded font-medium" required @focus="isMobileFocused = true" @blur="handleBlur" />
                        <label for="tel" class="label font-medium" :class="{ 'label-active': isMobileFocused || mobile }">
                            Mobile No. <span :class="{ 'text-red-500': isMobileFocused || mobile }">*</span>
                        </label>
                    </div>
                    <div class="input-group" :class="{ 'input-active': isPassportFocused || passport }">
                        <input v-model="passport" type="text" class="input rounded font-medium" required @focus="isPassportFocused = true" @blur="handleBlur" />
                        <label for="text" class="label font-medium" :class="{ 'label-active': isPassportFocused || passport }">
                            Passport No. <span :class="{ 'text-red-500': isPassportFocused || passport }">*</span>
                        </label>
                    </div>
                    <div class="input-group" :class="{ 'input-active': isPositionFocused || position }">
                        <input v-model="position" type="text" class="input rounded font-medium" required @input="filterPositions" @focus="handleFocusPosition" @blur="handleBlurPosition" />
                        <label for="text" class="label font-medium" :class="{ 'label-active': isPositionFocused || position }">
                            Position
                        </label>
                        <!-- Position Suggestions List -->
                        <ul v-show="showPositionSuggestions && filteredPositions.length" class="z-30 rounded absolute bg-white mt-2 border w-[110%] shadow-lg max-h-40 overflow-y-auto">
                            <li v-for="position in filteredPositions" :key="position" @mousedown.prevent="selectPosition(position)" class="p-2 text-sm text-[#001647] font-semibold cursor-pointer hover:bg-gray-200">
                                {{ position }}
                            </li>
                        </ul>
                    </div>
                    <div class="min-h-6 flex items-center justify-center">
                        <p class="text-red-500 text-sm font-semibold">{{ errorMessage }}</p>
                    </div>
                    <button type="submit" :class="{'cursor-not-allowed opacity-75': this.inviteButtonMessage=='Invitation Sent', 'focus:ring-1 dark:focus:ring-blue-400':this.inviteButtonMessage!='Invitation Sent'}" class="relative flex min-h-12 max-h-12 justify-center items-center gap-5 mt-[-30px] text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-md px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 w-full">
                        <div class="absolute">
                                <div v-if="loading" class="text-center loader-style">
                                </div>
                                <svg v-if="invited" class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                </svg>
                        </div>
                        <transition name="fade-scale">
                            <p v-if="!loading && !invited">{{inviteButtonMessage}}</p>
                        </transition>
                    </button>
                    <button v-if="this.inviteButtonMessage == 'Invitation Sent'" @click="handleInviteMore()" class="relative focus:ring-1 dark:focus:ring-blue-400 flex min-h-12 max-h-12 justify-center items-center gap-5 mt-[-20px] text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-md px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 w-full">
                        Invite More
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import apiService from '../services/apiService';
    import { inject } from 'vue';
    export default {
        data() {
            return {
                name: "",
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
                index: 0,
                received: 0,
                loading: false,
                invited: false,
                inviteButtonMessage: 'Invite Friend',
                errorMessage: null,
                candidate: null,
            };
        },
        setup() {
            const profileMail = inject('profileMail');
            // if (!candidate) {
            //     candidate = getCandidateFromMail(profileMail.emailID);
            // }
            return {
                profileMail,
            };
        },
        mounted() {
            this.positionList();
            this.observeRoutePath();

            this.getCandidateFromMail(this.profileMail.emailId).then((result) => {
                this.candidate = result;
            });
        },
        methods: {
            handleBlur() {
                if (!this.name) {
                    this.isNameFocused = false;
                }
                if (!this.email) {
                    this.isMailFocused = false;
                }
                if (!this.mobile) {
                    this.isMobileFocused = false;
                }
                if (!this.passport) {
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

            claimEvent() {
                this.index -= 1;
                this.received += 1000;
                this.outstanding = this.totalEarnables - this.received
            },

            handleStartReferringNow() {
                this.$nextTick(() => {
                    const inviteFriendForm = this.$refs.inviteFriendForm;
                    if (inviteFriendForm) {
                        inviteFriendForm.scrollIntoView({ behavior: "smooth" });
                    }
                });
            },
            submitReferral() {
                if (this.name && this.email && this.mobile && this.passport && this.position && !this.inviteButtonMessage!='Invitation Sent') {
                    this.handleInviteFriend(this.name, this.email, this.mobile, this.passport, this.candidate, this.position)
                    console.log(this.candidate)
                }
            },
            async handleInviteFriend(name, email, mobile, passport, candidate, position) {
                this.errorMessage = null;
                if (this.inviteButtonMessage!='Invitation Sent') {
                    this.invited = false;
                    this.loading = true;
                    try {
                        const response = await apiService.candidateReferral(name, email, mobile, passport, candidate, this.profileMail.emailId, position);
                        this.response = response.data.message;
                        if (this.response == "Candidate created successfully") {
                            setTimeout(() => {
                                this.loading = false;
                                this.invited = true;
                                if (this.invited == true) {
                                setTimeout(() => {
                                    this.invited = false;
                                    this.inviteButtonMessage = 'Invitation Sent';
                                }, 2500);
                            }
                            }, 1000);
                            
                        }
                        else {
                            setTimeout(() => {
                                this.loading = false;
                                this.errorMessage = this.response;
                            }, 1000);
                            
                        }
                    } catch (error) {
                        console.error("Failed to fetch position details:", error);
                    }
                }
            },
            handleInviteMore() {
                this.name = '';
                this.mobile = '';
                this.passport = '';
                this.email = '';
                this.position = '';
                this.inviteButtonMessage = 'Invite Friend';
            },
            observeRoutePath() {
                const routePosition = this.$route.query.position;
                if (routePosition) {
                    this.position = routePosition;
                    this.$nextTick(() => {
                        const inviteFriendForm = this.$refs.inviteFriendForm;
                        if (inviteFriendForm) {
                            inviteFriendForm.scrollIntoView({ behavior: "smooth" });
                        }
                    });
                }
            },
            async getCandidateFromMail(userMail) {
                console.log(userMail)
                try {
                    const response = await apiService.getCandidateID(userMail);
                    this.response = response.data.message;
                    return this.response;
                } catch (error) {
                    console.error("Failed to fetch Candidate ID", error);
                }
            },
        },
    }
</script>

<style>
    .input-group {
        position: relative;
        width: 100%;
        max-width: 97%;
        height: 15px;
        font-size: 1.25rem;
        --primary: #0070cc;
    }

    .input {
        all: unset;
        width: 100%;
        height: 25px;
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
        top: 9px;
        padding-left: 5px;
        left: 1rem;
        color: gray;
        font-size: 16px;
        transition: all 0.3s ease-in-out;
        pointer-events: none;
    }

    /* Move label on focus or when input has value */
    .label-active {
        top: -10px;
        left: 15px;
        font-size: 0.9rem;
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
    .loader-style {
      width: 18px;
      height: 18px;
      margin-top: 5px;
      border-radius: 50%;
      display: inline-block;
      border-top: 3px solid white;
      border-right: 3px solid transparent;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
  }

.checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: #7ac142;
    fill: none;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards
}

.checkmark {
    width:20px;
    height: 20px;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: #fff;
    stroke-miterlimit: 10;
    margin: 10% auto;
    box-shadow: inset 0px 0px 0px #7ac142;
    animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both
}

.checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards
}

@keyframes stroke {
    100% {
        stroke-dashoffset: 0
    }
}

@keyframes scale {

    0%,
    100% {
        transform: none
    }

    50% {
        transform: scale3d(1.1, 1.1, 1)
    }
}

@keyframes fill {
    100% {
        box-shadow: inset 0px 0px 0px 30px #7ac142
    }
}
</style>