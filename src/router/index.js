// import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { store } from '@/store';

import HomeView from '@/views/HomeView.vue';
import mHomeView from '@/views/m/mHomeView.vue';
import AboutView from '@/views/AboutView.vue';
import mAboutView from '@/views/m/mAboutView.vue';
import SoccerView from '@/views/SoccerView.vue';
import mSoccerView from '@/views/m/mSoccerView.vue';
import SellerView from '@/views/SellerView.vue';
import mBasketballView from '@/views/m/mBasketballView.vue';

const routes = [
  // 電腦網頁
  {
    path: '/',
    name: 'home',
    component: store.isMobile ? mHomeView : HomeView,
  },
  {
    path: '/about/:id',
    name: 'about',
    component: store.isMobile ? mAboutView : AboutView,
  },
  {
    path: '/soccer',
    name: 'soccer',
    component: store.isMobile ? mSoccerView : SoccerView,
  },
  {
    path: '/seller',
    name: 'seller',
    component: store.isMobile ? mBasketballView : SellerView,
  },

]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router;
