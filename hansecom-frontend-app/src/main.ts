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
    SET_USERS(state, users) {
      state.users = users // Mutation to set users in the state
    },
    ADD_USER(state, user) {
      state.users.push(user)
    },
    SET_LOADING_USERS(state, loading) {
      state.isLoading = loading // Mutation to set loading state
    },
    SET_ERROR_USERS(state, error) {
      state.error = error // Mutation to set error message
    },
    CLEAR_ERROR_USERS(state) {
      state.error = null // Mutation to clear the error message
    },
    UPDATE_USER(state, updatedUser) {
      const index = state.users.findIndex((user) => user.id === updatedUser.id)
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser)
      }
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      commit('SET_LOADING_USERS', true) // Set loading to true before the API call
      commit('CLEAR_ERROR_USERS') // Clear any existing error message
      try {
        const response = await axios.get<User[]>('http://localhost:3333/users')
        commit('SET_USERS', response.data) // Commit the mutation with fetched users
      } catch (error) {
        const err = error as AxiosError
        console.error(err)
        // Commit the error message if the API call fails
        commit('SET_ERROR_USERS', 'We apologize. There was an error fetching the user list.')
      } finally {
        commit('SET_LOADING_USERS', false) // Set loading to false after the API call
      }
    },
    async createUser({ commit }, user) {
      commit('SET_LOADING_USERS', true)
      return axios
        .post('http://localhost:3333/users', user)
        .then((response) => {
          commit('ADD_USER', response.data) // Assuming the server responds with the created user
        })
        .catch((error) => {
          commit(
            'SET_ERROR_USERS',
            `The following error occurred while creating your user: ${error.message}`
          )
        })
        .finally(() => {
          commit('SET_LOADING_USERS', false)
        })
    },
    async deleteUser({ commit }, userId) {
      commit('SET_LOADING_USERS', true)
      try {
        await axios.delete(`http://localhost:3333/users/${userId}`)
        commit(
          'SET_USERS',
          this.state.users.filter((user) => user.id !== userId)
        ) // Remove the user from the store
      } catch (error) {
        commit('SET_ERROR_USERS', 'Failed to delete user.')
      } finally {
        commit('SET_LOADING_USERS', false)
      }
    },
    async editUser({ commit }, { userId, updatedUser }) {
      commit('SET_LOADING_USERS', true)
      try {
        const response = await axios.put(`http://localhost:3333/user/${userId}/edit`, updatedUser)

        commit('UPDATE_USER', response.data)
        commit('SET_USERS', response.data)
      } catch (error) {
        const err = error as AxiosError
        console.error(err)
        commit('SET_ERROR_USERS', `An error occurred while updating the user.`)
      } finally {
        commit('SET_LOADING_USERS', false)
      }
    },
  },
  getters: {
    usersList(state) {
      return state.users
    },
    errorMessage(state) {
      return state.error
    },
  },
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
