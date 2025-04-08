import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';

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
      component: () => import('@/views/TransactionPage.vue'),
    },
    {
      path: '/transaction/:id',
      name: 'TransactionDetailPage',
      component: () => import('@/views/TransactionDetailPage.vue'),
    },
    {
      path: '/transaction/add',
      name: 'AddPage',
      component: () => import('@/views/AddPage.vue'),
    },
    {
      path: '/transaction/edit/:id',
      name: 'EditPage',
      component: () => import('@/views/EditPage.vue'),
    },
    {
      path: '/user/:id',
      name: 'ProfilePage',
      component: () => import('@/views/ProfilePage.vue'),
    },
    {
      path: '/user/edit/:id',
      name: 'ProfileEdit',
      component: () => import('@/views/ProfileEdit.vue'),
    },
    {
      path: '/:paths(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
});

export default router;
