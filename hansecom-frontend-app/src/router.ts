import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import store from './store'
import { UserState } from './store/modules/user'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
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
    name: 'Orders',
    component: () => import('./components/Orders/Orders.vue'),
    // @ts-ignore
    beforeEnter: async (to, from, next) => {
      const userId = to.params.id
      // @ts-ignore
      const users = (store.state.user as UserState).users

      if (!users) {
        console.error('Users state is undefined')
        next({ name: 'NotFound' })
        return
      }

      if (users.length === 0) {
        await store.dispatch('user/fetchUsers')
        // @ts-ignore
        const updatedUsers = (store.state.user as UserState).users
        const userExists = updatedUsers.some((user) => user.id.toString() === userId)
        userExists ? next() : next({ name: 'NotFound' })
      } else {
        const userExists = users.some((user) => user.id.toString() === userId)
        userExists ? next() : next({ name: 'NotFound' })
      }
    },
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('./components/Users/Users.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
