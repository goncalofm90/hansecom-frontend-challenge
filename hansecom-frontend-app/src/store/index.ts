import { createStore } from 'vuex'
import userModule from './modules/user'
import { State } from '../types/types'

const store = createStore<State>({
  modules: {
    user: userModule,
  },
})

export default store
