import { Module } from 'vuex'
import axios, { AxiosError } from 'axios'
import { User, State } from '../../types/types'

export interface UserState {
  users: User[]
  isLoading: boolean
  error: string | null
}

const userModule: Module<UserState, State> = {
  namespaced: true,
  state: {
    users: [],
    isLoading: false,
    error: null,
  },
  mutations: {
    SET_USERS(state: UserState, users: User[]) {
      state.users = users
    },
    ADD_USER(state: UserState, user: User) {
      state.users.push(user)
    },
    SET_LOADING_USERS(state: UserState, loading: boolean) {
      state.isLoading = loading
    },
    SET_ERROR_USERS(state: UserState, error: string) {
      state.error = error
    },
    CLEAR_ERROR_USERS(state: UserState) {
      state.error = null
    },
    UPDATE_USER(state: UserState, updatedUser: User) {
      const index = state.users.findIndex((user) => user.id === updatedUser.id)
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser)
      }
    },
    DELETE_USER(state: UserState, userId: number) {
      state.users = state.users.filter((user) => user.id !== userId)
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      commit('SET_LOADING_USERS', true)
      commit('CLEAR_ERROR_USERS')
      try {
        const response = await axios.get<User[]>('http://localhost:3333/users')
        commit('SET_USERS', response.data)
      } catch (error) {
        const err = error as AxiosError
        console.error(err)
        commit('SET_ERROR_USERS', 'We apologize. There was an error fetching the user list.')
      } finally {
        commit('SET_LOADING_USERS', false)
      }
    },
    async createUser({ commit }, user: User) {
      commit('SET_LOADING_USERS', true)
      try {
        const response = await axios.post<User>('http://localhost:3333/users', user)
        commit('ADD_USER', response.data)
      } catch (error) {
        const err = error as AxiosError
        console.error(err)
        commit('SET_ERROR_USERS', `The following error occurred while creating your user: ${err}`)
      } finally {
        commit('SET_LOADING_USERS', false)
      }
    },
    async deleteUser({ commit }, userId: number) {
      commit('SET_LOADING_USERS', true)
      try {
        await axios.delete(`http://localhost:3333/users/${userId}`)
        commit('DELETE_USER', userId)
      } catch (error) {
        commit('SET_ERROR_USERS', 'Failed to delete user.')
      } finally {
        commit('SET_LOADING_USERS', false)
      }
    },
    async editUser({ commit }, { userId, updatedUser }: { userId: number; updatedUser: User }) {
      commit('SET_LOADING_USERS', true)
      try {
        const response = await axios.put<User>(
          `http://localhost:3333/user/${userId}/edit`,
          updatedUser
        )
        commit('UPDATE_USER', response.data)
      } catch (error) {
        commit('SET_ERROR_USERS', 'An error occurred while updating the user.')
      } finally {
        commit('SET_LOADING_USERS', false)
      }
    },
  },
  getters: {
    usersList(state: UserState) {
      return state.users
    },
    errorMessage(state: UserState) {
      return state.error
    },
  },
}

export default userModule
