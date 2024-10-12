import { createWebHistory, createRouter } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

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
    path: '/Users',
    alias: '/Users',
    name: 'Users',
    component: () => import('./components/Users/Users.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
