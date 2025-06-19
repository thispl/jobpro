<template>
    <!-- If Logged IN -->
    <div class="bg-white mt-0 shadow-lg shadow-gray-600">
        <div class="mx-10 flex md:justify-center items-center gap-10 md:p-6">
            <img class="md:hidden" src="https://i.postimg.cc/6qY40bGc/Whats-App-Image-2024-09-30-at-11-38-34-75256763-removebg-preview.png" alt="jobpro" width="60px">
            <img class="hidden md:block md:w-[140px] lg:w-[180px] fixed left-[5%] navigation-logo-shadow" src="https://i.postimg.cc/6p66m14h/TEAMPRO.png" width="180px" alt="Teampro Logo" />
            <transition name="fade-scale">
                <div class="hidden md:block font-semibold text-[#05264e]" :class="{'lg:mr-0 md:mr-[250px]': showNavSearch && isHomePage, 'lg:mr-0 md:mr-[300px]': !state.isLoggedIn && showNavSearch}">
                    <router-link to="/" active-class="text-[#0070cc] font-semibold transform scale-[1.05]" class="md:mr-5 lg:mr-10 lg:ml-24 menu transition-all duration-300 ease-in-out">HOME</router-link>
                    <router-link to="/candidates" active-class="text-[#0070cc] font-semibold transform scale-[1.05]" class="md:mr-5 lg:mr-10 menu transition-all duration-300 ease-in-out">CANDIDATE</router-link>
                    <router-link to="/referpro" active-class="text-[#0070cc] font-semibold transform scale-[1.05]" class="menu transition-all duration-300 ease-in-out">REFERPRO</router-link>
                </div>
            </transition>
            <transition name="fade-scale">
                <div v-if="showNavSearch && isHomePage" class="fixed sm:right-[0%] md:right-[6%] lg:right-[51%] lg:w-[300px]" :class="{'md:right-[12%] top-8 md:w-[240px]': !state.isLoggedIn}">
                    <div class="search-box-nav border border-gray-300 shadow-lg shadow-gray-300">
                        <input class="searchInput w-10" @input="sendCommand()" type="text" v-model="query" placeholder="Search jobs ..." ref="searchInput" />
                    </div>
                </div>
            </transition>
            <transition v-if="state.isLoggedIn" name="fade-scale">
                <p :class="{'md:hidden': showNavSearch, 'lg:block': showNavSearch}" class="text-[#05264e] font-medium text-right fixed md:right-[19%] lg:right-[16%] font-semibold top-[3.4%]"><span class="font-sans text-sm font-semibold pr-2">Hi</span>{{ profileName.fullName }}</p>
            </transition>
            <div v-if="state.isLoggedIn" class="fixed">
                <button @click="openSideBar()" class="fixed top-[2.5%] md:right-[14%] lg:right-[12%]">
                    <img v-if="profileUrl.profile" :src="profileUrl.profile" class="w-[40px] rounded-full navigation-user-profile-shadow">
                    <img v-else src="https://i.ibb.co/ss8RQ38/user.png" alt="user" width="40px" class="navigation-user-profile-shadow">
                </button>
            </div>

            <div v-if="!state.isLoggedIn" class="fixed ml-[230px] md:ml-[65%] lg:ml-[68%]">
                <router-link to="/login" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-8 md:px-4 lg:py-2.5 md:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600" style="color: white !important;">Sign In</router-link>
            </div>
            <img class="hidden md:block md:w-[70px] lg:w-[75px] fixed right-[5%] navigation-logo-shadow" src="https://i.postimg.cc/6qY40bGc/Whats-App-Image-2024-09-30-at-11-38-34-75256763-removebg-preview.png" alt="jobpro" width="75px">
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
    </div>
</template>

<script>
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


    export default {
        data() {
            return {
                showNavSearch: false,
                sidebar: false,
                observer: null,
                searchQuery: '',
                id: null,
            };
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
            async candidateDetails() {
                try {
                    if (this.profileMail && this.profileMail.emailId) {
                        const response = await apiService.getCandidateDetails(this.profileMail.emailId);
                        this.candidateProfile = "https://erp.teamproit.com" + response.data.message.candidate_image;
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