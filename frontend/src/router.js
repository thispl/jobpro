import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue'; 
import Recruiters from '@/pages/Recruiters.vue';
import Candidates from '@/pages/Candidates.vue';
import Referpro from '@/pages/Referpro.vue';
import job_details from './job_details.vue';
import Register from './Register.vue';
import Login from './Login.vue';
import Profile from './Profile.vue';
import reset_password from './reset_password.vue';
import Test from './pages/Test.vue';
import referrals from './components/referrals.vue';
import Dashboard from './components/dashboard.vue';
import ReferCandidate from './components/refer_candidate.vue';
import OpenVacancy from './components/open_vacancy.vue';
import ClaimStatus from './components/claim_status.vue';
import Terms from './components/terms.vue';
import ReferproProfile from './components/referpro_profile.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/find-a-job',
    name: 'Home_jobs',
    component: () => import("@/pages/FindAJob.vue"),
  },
  {
    path: '/recruiters',
    name: 'Recruiters',
    component: Recruiters,
  },
  {
    path: '/candidates',
    name: 'Candidates',
    component: Candidates,
  },
  {
    path: '/job-details/:taskName',
    name: 'JobDetails',
    component: () => import('./job_details.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./Login.vue'),
  },
  {
    path: '/registration',
    name: 'Register',
    component: () => import('./Register.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/reset-password',
    name: 'Reset Password',
    component: reset_password,
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
  },
  {
    path: '/referpro',
    component: Referpro,  
    children: [
      {
        path: '',
        name: 'ReferproDashboard',
        component: Dashboard,
      },
      {
        path: 'refer-candidate', 
        name: 'ReferproReferCandidate',
        component: ReferCandidate,
      },
      {
        path: 'open-vacancy', 
        name: 'ReferproOpenVacancy',
        component: OpenVacancy,
      },
      {
        path: 'referrals',
        name: 'Referrals',
        component: referrals,
      },
      {
        path: 'claim-status',
        name: 'ReferproClaimStatus',
        component: ClaimStatus,
      },
      {
        path: 'terms',
        name: 'ReferproTerms',
        component: Terms,
      },
      {
        path: 'profile',
        name: 'ReferproProfile',
        component: ReferproProfile,
      },
    ],
  },
  
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('authToken');

  if (isLoggedIn && (to.path === '/login' || to.path === '/registration')) {
    next('/');
  } else {
    next();
  }

  if (to.path === '/referpro') {
    next();
  }
});

export default router;
