import { createWebHistory, createRouter } from "vue-router";

export const routes = [
  {
    path: '/',
    name: 'Home',
    text: '轉換程式',
    component: () => import('./components/pages/Home.vue')
  },
  {
    path: '/record',
    name: 'Record',
    text: '紀錄',
    component: () => import('./components/pages/Record.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;