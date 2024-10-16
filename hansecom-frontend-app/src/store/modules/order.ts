import { Module } from 'vuex'
import axios, { AxiosError } from 'axios'
import { Order, State } from '../../types/types'

export interface OrderState {
  orders: Order[]
  isLoading: boolean
  error: string | null
}

const orderModule: Module<OrderState, State> = {
  namespaced: true,
  state: {
    orders: [],
    isLoading: false,
    error: null,
  },
  mutations: {
    SET_ORDERS(state: OrderState, orders: Order[]) {
      state.orders = orders
    },
    ADD_ORDER(state: OrderState, order: Order) {
      state.orders.push(order)
    },
    SET_LOADING_ORDERS(state: OrderState, loading: boolean) {
      state.isLoading = loading
    },
    SET_ERROR_ORDERS(state: OrderState, error: string) {
      state.error = error
    },
    CLEAR_ERROR_ORDERS(state: OrderState) {
      state.error = null
    },
    UPDATE_ORDER(state: OrderState, updatedOrder: Order) {
      const index = state.orders.findIndex((order) => order.id === updatedOrder.id)
      if (index !== -1) {
        state.orders.splice(index, 1, updatedOrder)
      }
    },
    DELETE_ORDER(state: OrderState, orderId: number) {
      state.orders = state.orders.filter((order) => order.id !== orderId)
    },
  },
  actions: {
    async fetchOrders({ commit }, userId: number) {
      commit('SET_LOADING_ORDERS', true)
      commit('CLEAR_ERROR_ORDERS')
      try {
        const response = await axios.get<Order[]>(`http://localhost:3333/orders/${userId}`)
        commit('SET_ORDERS', response.data)
      } catch (error) {
        const err = error as AxiosError
        console.error(err)
        commit('SET_ERROR_ORDERS', 'We apologize. There was an error fetching the order list.')
      } finally {
        commit('SET_LOADING_ORDERS', false)
      }
    },
    async createOrder({ commit }, order: Order) {
      commit('SET_LOADING_ORDERS', true)
      try {
        const response = await axios.post<Order>('http://localhost:3333/orders', order)
        commit('ADD_ORDER', response.data)
      } catch (error) {
        const err = error as AxiosError
        console.error(err)
        commit('SET_ERROR_ORDERS', `The following error occurred while creating your order: ${err}`)
      } finally {
        commit('SET_LOADING_ORDERS', false)
      }
    },
    async deleteOrder({ commit }, orderId: number) {
      commit('SET_LOADING_ORDERS', true)
      try {
        await axios.delete(`http://localhost:3333/orders/${orderId}`)
        commit('DELETE_ORDER', orderId)
      } catch (error) {
        commit('SET_ERROR_ORDERS', 'Failed to delete order.')
      } finally {
        commit('SET_LOADING_ORDERS', false)
      }
    },
    async editOrder(
      { commit },
      { orderId, updatedOrder }: { orderId: number; updatedOrder: Order }
    ) {
      commit('SET_LOADING_ORDERS', true)
      try {
        const response = await axios.put<Order>(
          `http://localhost:3333/order/${orderId}/edit`,
          updatedOrder
        )
        commit('UPDATE_ORDER', response.data)
      } catch (error) {
        commit('SET_ERROR_ORDERS', 'An error occurred while updating the order.')
      } finally {
        commit('SET_LOADING_ORDERS', false)
      }
    },
  },
  getters: {
    ordersList(state: OrderState) {
      return state.orders
    },
    errorMessage(state: OrderState) {
      return state.error
    },
  },
}

export default orderModule
