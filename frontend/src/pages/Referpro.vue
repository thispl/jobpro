<template>
    <div class="px-5 md:px-20 pt-8 bg-white">
        <div class="flex gap-2">
            <div :class="{'min-w-5': !this.showLeftArrow && !this.showRightArrow}"><svg @click="handleMenuOptions()" v-if="!this.showLeftArrow && !this.showRightArrow" @mouseover="handleMenuOptionsHover()" class="h-6 w-6 text-gray-600"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="6" x2="20" y2="6" />  <line x1="10" y1="12" x2="20" y2="12" />  <line x1="6" y1="18" x2="20" y2="18" /></svg></div>
            <div :class="{'min-w-6 ': this.data}" @mouseleave="showLeftArrow=false; showRightArrow=false; data='';" @click="handleMenuOptions()" v-html="this.data"></div>
            <p class="text-xl font-semibold text-[#05264e] pt-0.5">{{ title }}</p>
        </div>
        <div class="flex">
            <transition name="fade-scale">
                <div v-if="showMenuOptions" class="mt-6 flex fixed flex-col gap-4">
                <router-link to="/referpro" exact-active-class="text-blue-600" @click="title='Dashboard' "class="flex gap-2 text-lg font-medium text-[#7b7f7a] hover:text-[#0070cc] pt-0.5">
                    <svg class="h-5 w-5"  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="4" width="6" height="6" rx="1" />  <rect x="4" y="14" width="6" height="6" rx="1" />  <rect x="14" y="14" width="6" height="6" rx="1" />  <line x1="14" y1="7" x2="20" y2="7" />  <line x1="17" y1="4" x2="17" y2="10" /></svg>
                    <p class="pt-1">Dashboard</p>
                </router-link>
                <router-link to="/referpro/refer-candidate" exact-active-class="text-blue-600" @click="title='Refer Candidate'" class="flex gap-2 text-lg font-medium text-[#7b7f7a] hover:text-[#0070cc] pt-0.5">
                    <svg class="h-5 w-5"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="8.5" cy="7" r="4" />  <line x1="20" y1="8" x2="20" y2="14" />  <line x1="23" y1="11" x2="17" y2="11" /></svg>
                    <p class="pt-1">Refer Candidate</p>
                </router-link>
                <router-link to="/referpro/open-vacancy" exact-active-class="text-blue-600" @click="title='Open Vacancy'" class="flex gap-2 text-lg font-medium text-[#7b7f7a] hover:text-[#0070cc] pt-0.5">
                    <svg class="h-5 w-5"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <p class="pt-1">Open Vacancy</p>
                </router-link>
                <router-link to="/referpro/claim-status" exact-active-class="text-blue-600" @click="title='Claim Status'" class="flex gap-2 text-lg font-medium text-[#7b7f7a] hover:text-[#0070cc] pt-0.5">
                    <svg class="h-5 w-5"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p class="pt-1">Claim Status</p>
                </router-link>
                <router-link @click="title='Payment Status'" class="flex gap-2 text-lg font-medium text-[#7b7f7a] hover:text-[#0070cc] pt-0.5">
                    <svg class="h-5 w-5"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M10 13l2.538-.003c2.46 0 4.962-2.497 4.962-4.997 0-3-1.89-5-4.962-5H7c-.5 0-1 .5-1 1L4 18c0 .5.5 1 1 1h2.846L9 14c.089-.564.43-1 1-1zm7.467-5.837C19.204 8.153 20 10 20 12c0 2.467-2.54 4.505-5 4.505h.021-2.629l-.576 3.65a.998.998 0 01-.988.844l-2.712-.002a.5.5 0 01-.494-.578L7.846 19" /></svg>
                    <p class="pt-1">Payment Status</p>
                </router-link>
                <router-link to="/referpro/profile" exact-active-class="text-blue-600" @click="title='Profile'" class="flex gap-2 text-lg font-medium text-[#7b7f7a] hover:text-[#0070cc] pt-0.5">
                    <svg class="h-6 w-6"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p class="pt-1">Profile</p>
                </router-link>
                <router-link to="/referpro/terms" exact-active-class="text-blue-600" @click="title='Terms & Conditions'" class="flex gap-2 text-lg font-medium text-[#7b7f7a] hover:text-[#0070cc] pt-0.5">
                    <svg class="h-5 w-5"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="9" y1="7" x2="10" y2="7" />  <line x1="9" y1="13" x2="15" y2="13" />  <line x1="13" y1="17" x2="15" y2="17" /></svg>                
                    <p class="pt-1">Terms & Conditions</p>
                </router-link>
            </div>
            </transition>
            <div class="mt-4 overflow-y-scroll overflow-x-hidden shadow-lg shadow-gray-100 ml-auto bg-[#efeff5] h-[79vh] w-[85%] rounded-lg transition-all duration-300 scrollbar-hide" 
     :class="{'w-full': !showMenuOptions}">
    <router-view></router-view>
</div>

        </div>
    </div>
</template>
<script>

import { inject } from 'vue';
    export default {
        data() {
            return {
                showMenuOptions: true,
                showLeftArrow: false,
                showRightArrow: false,
                data: '',
                title: 'Dashboard',
                name: '',
                email: '',
                mobile: '',
                passport: '',
                position: '',

            };
        },
        setup() {
            const id = inject('candidateId');
            const candidate = id.canId
            return {
                candidate,
            };
        },
        watch: {
            '$route.path'(newPath) {
                if (newPath.includes('refer-candidate')) {
                    this.title = 'Refer Candidate';
                }
            }
        },
        methods: {
            handleMenuOptionsHover() {
                if (this.showMenuOptions == true) {
                    this.data = '<svg @mouseleave="this.showLeftArrow = false; this.showRightArrow = false" class="h-6 w-6 text-gray-600"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="11 17 6 12 11 7" />  <polyline points="18 17 13 12 18 7" /></svg>'
                    this.showLeftArrow = true;
                    this.showRightArrow = false;
                }
                else {
                    this.data = '<svg @mouseleave="this.showLeftArrow = false; this.showRightArrow = false" class="h-6 w-6 text-gray-600"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="13 17 18 12 13 7" />  <polyline points="6 17 11 12 6 7" /></svg>'
                    this.showLeftArrow = false;
                    this.showRightArrow = true;
                }
            },
            handleMenuOptions() {
                if (this.showLeftArrow == true) {
                    this.showMenuOptions = false;
                }
                else if (this.showRightArrow == true) {
                    this.showMenuOptions = true;
                }
            }
        },
    };
</script>
<style>
/* Hide scrollbar but allow scrolling */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;  /* Hide scrollbar in IE and Edge */
    scrollbar-width: none;      /* Hide scrollbar in Firefox */
}

</style>
