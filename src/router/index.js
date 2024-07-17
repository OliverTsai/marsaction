// import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { store } from '@/store';

import HomeView from '@/views/HomeView.vue';
import mHomeView from '@/views/m/mHomeView.vue';
import AboutView from '@/views/AboutView.vue';
import mAboutView from '@/views/m/mAboutView.vue';
import SoccerView from '@/views/SoccerView.vue';
import mSoccerView from '@/views/m/mSoccerView.vue';
import BasketballView from '@/views/BasketballView.vue';
import mBasketballView from '@/views/m/mBasketballView.vue';

const routes = [
  // 電腦網頁
  {
    path: '/',
    name: 'home',
    component: store.isMobile ? mHomeView : HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: store.isMobile ? mAboutView : AboutView,
  },
  {
    path: '/soccer',
    name: 'soccer',
    component: store.isMobile ? mSoccerView : SoccerView,
  },
  {
    path: '/basketball',
    name: 'basketball',
    component: store.isMobile ? mBasketballView : BasketballView,
  },

]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router;
