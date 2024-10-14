import { createApp } from 'vue'
import { createStore } from 'vuex'
import { User, State } from './types/types.ts' // Import the types
import App from './components/App.vue'
import './style.sass'
import router from './router.ts'
import axios, { AxiosError } from 'axios'

const store = createStore<State>({
  state() {
    return {
      users: [],
      counter: 0,
      isLoading: false,
      error: null,
    }
  },
  mutations: {
    setUsers(state, users) {
      state.users = users // Mutation to set users in the state
    },
    setLoading(state, loading) {
      state.isLoading = loading // Mutation to set loading state
    },
    setError(state, error) {
      state.error = error // Mutation to set error message
    },
    clearError(state) {
      state.error = null // Mutation to clear the error message
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      commit('setLoading', true) // Set loading to true before the API call
      commit('clearError') // Clear any existing error message
      try {
        const response = await axios.get<User[]>('http://localhost:3333/users')
        commit('setUsers', response.data) // Commit the mutation with fetched users
      } catch (error) {
        const err = error as AxiosError
        console.error(err)
        // Commit the error message if the API call fails
        commit('setError', 'We apologize. There was an error fetching the user list.')
      } finally {
        commit('setLoading', false) // Set loading to false after the API call
      }
    },
  },
  getters: {
    usersList(state) {
      return state.users // Optional getter to access users
    },
    errorMessage(state) {
      return state.error // Getter to access error message
    },
  },
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
