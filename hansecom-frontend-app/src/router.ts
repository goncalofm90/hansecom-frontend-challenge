import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    alias: '/',
    name: 'Home',
    component: () => import('./components/Home/Home.vue'),
  },
  {
    path: '/orders',
    alias: '/orders',
    name: 'Orders',
    component: () => import('./components/Orders/Orders.vue'),
  },
  {
    path: '/users',
    alias: '/users',
    name: 'Users',
    component: () => import('./components/Users/Users.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./components/NotFound/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
