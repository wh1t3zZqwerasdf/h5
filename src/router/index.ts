import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import workPathRouters from "@/router/modules/workPath.routers";
import brokenRouters from '@/router/modules/broken.routers'
import troubleRouters from  '@/router/modules/trouble.routers'

const routes: Array<RouteRecordRaw> = [
  ...workPathRouters,
  ...brokenRouters,
  ...troubleRouters,

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/login/Login.vue'),
  },
  {
    path: '/homePage',
    name: 'homePage',
    component: () => import('@/views/homePage/homePage.vue'),
  },
  {
    path: '/workbenches',
    name: 'workbenches',
    component: () => import('@/views/workbenches/workbenches.vue'),
    children: [],
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/views/userInfo/userPage.vue'),
  },
  {
    path: '/newsList',
    name: 'newsList',
    component: () => import('@/views/news/newsList.vue'),
  },
  {
    path: '/newsDetail/:id',
    name: 'newsDetail',
    component: () => import('@/views/news/newsDetail.vue'),
  },
  {
    path: '/formily',
    name: 'Formily',
    component: () => import('@/views/formily/test.vue'),
  },
  {
    path: '/textDemo',
    name: 'text',
    component: () =>
      import('@/views/components/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes,
});

export default router;
