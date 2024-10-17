import { createStore } from 'vuex'
import userModule from './modules/user'
import orderModule from './modules/order'
import { State } from '../types/types'

const store = createStore<State>({
  modules: {
    user: userModule,
    order: orderModule,
  },
})

export default store
