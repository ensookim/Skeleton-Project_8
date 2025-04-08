import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import AddPage from '@/views/AddPage.vue';
import EditPage from '@/views/EditPage.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import ProfileEditPage from '@/views/ProfileEditPage.vue';
import TransactionPage from '@/views/TransactionPage.vue';
import TransactionDetailPage from '@/views/TransactionDetailPage.vue';
import NotFound from '@/views/NotFound.vue';

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
      component: TransactionPage,
    },
    {
      path: '/transaction/:id',
      name: 'TransactionDetailPage',
      component: TransactionDetailPage,
    },
    {
      path: '/transaction/add',
      name: 'AddPage',
      component: AddPage,
    },
    {
      path: '/transaction/edit/:id',
      name: 'EditPage',
      component: EditPage,
    },
    {
      path: '/user/:id',
      name: 'ProfilePage',
      component: ProfilePage,
    },
    {
      path: '/user/edit/:id',
      name: 'ProfileEditPage',
      component: ProfileEditPage,
    },
    {
      path: '/:paths(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

export default router;
