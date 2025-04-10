import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/transaction',
      name: 'TransactionPage',
      component: () => import('@/pages/TransactionPage.vue'),
    },
    // {
    //   path: '/transaction/:id',
    //   name: 'TransactionDetailPage',
    //   component: () => import('@/pages/TransactionDetailPage.vue'),
    // },
    {
      path: '/transaction/add',
      name: 'AddPage',
      component: () => import('@/pages/AddPage.vue'),
    },
    {
      path: '/transaction/edit/:id',
      name: 'EditPage',
      component: () => import('@/pages/EditPage.vue'),
    },
    {
      path: '/user/:id',
      name: 'ProfilePage',
      component: () => import('@/pages/ProfilePage.vue'),
    },
    {
      path: '/user/edit/:id',
      name: 'ProfileEditPage',
      component: () => import('@/pages/ProfileEditPage.vue'),
    },
    {
      path: '/report',
      name: 'ReportPage',
      component: () => import('@/pages/ReportPage.vue'),
    },
    {
      path: '/:paths(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/NotFound.vue'),
    },
  ],
});

export default router;
