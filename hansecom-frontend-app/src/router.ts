import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import store from './main'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    alias: '/',
    name: 'Home',
    component: () => import('./components/Home/Home.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./components/NotFound/NotFound.vue'),
  },
  {
    path: '/orders/:id',
    alias: '/orders/:id',
    name: 'Orders',
    component: () => import('./components/Orders/Orders.vue'),
    beforeEnter: (to, from, next) => {
      const userId = to.params.id
      // In case we need to redirect to NotFound (manual id inputs that don't exist, etc)
      const userExists = store.state.users.some((user) => user.id.toString() === userId)
      if (userExists) {
        next()
      } else {
        next({ name: 'NotFound' }) // redirect to NotFound
      }
    },
  },
  {
    path: '/users',
    alias: '/users',
    name: 'Users',
    component: () => import('./components/Users/Users.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
