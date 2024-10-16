<script setup lang="ts"></script>

<template>
  <RouterLink :to="`/users`" class="px-5">
    <button
      class="text-black outline outline-black text-xs hover:bg-orange-500 hover:text-white font-bold rounded p-1 ms-5"
    >
      back
    </button>
  </RouterLink>
  <div class="p-10">
    <div class="flex justify-between">
      <h1 class="font-bold text-2xl">
        <span class="pi pi-user"></span> {{ user.full_name }}'s Orders
      </h1>
      <button
        class="text-white bg-black font-bold md:px-1 rounded p-2 ms-5 hover:bg-blue-500"
        @click="openCreateModal()"
      >
        Order Item
      </button>
    </div>
    <!-- Show loader if loading -->
    <Loader v-if="isLoading" />
    <!-- Show error message -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <ul role="list" class="divide-y divide-gray-100" v-else>
      <li v-for="order in orders" :key="order.id" class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
          <span class="pi pi-cart-arrow-down content-center text-4xl"></span>
          <div class="min-w-0 flex-auto">
            <p class="font-semibold leading-6 text-gray-900">{{ order.product }}</p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">
              Ordered by {{ user.full_name }} - {{ user.email }}
            </p>
          </div>
        </div>
        <div class="md:flex md:items-center flex">
          <p class="hidden md:block mt-1 text-xs leading-5 text-gray-500">
            Ordered on
            <time datetime="2023-01-23T13:23Z"
              >{{ new Date(order.order_date).toDateString() }}
            </time>
          </p>
          <button
            class="text-black hover:bg-yellow-500 hover:text-white font-bold md:px-1 rounded p-2 ms-5"
            @click="openConfirmationModal(user.id, user.fullName, user.email, false)"
          >
            <span class="pi pi-box"></span>
          </button>
          <button
            class="text-black hover:text-white hover:bg-red-700 font-bold md:px-1 rounded p-2 ms-5"
            @click="openConfirmationModal(user.id, user.fullName, user.email, true)"
          >
            <span class="pi pi-trash"></span>
          </button>
        </div>
      </li>
    </ul>
    <ConfirmationModal
      :isVisible="isModalVisible"
      :userId="userId"
      :fullName="fullName"
      :email="email"
      :isDeleteAction="isDeleteAction"
      :onConfirm="confirmAction"
      :onCancel="closeConfirmationModal"
      :handleClickOutside="handleClickOutside"
    />
  </div>
  <div>
    <CreateUserModal
      :isVisible="isCreateModalVisible"
      :closeCreateModal="closeCreateModal"
      :handleClickOutside="handleClickOutside"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '../Loader/Loader.vue'

export default {
  components: {
    Loader,
  },
  data() {
    return {
      orderId: null,
      userId: null,
      isModalVisible: false,
      isCreateModalVisible: false,
      isDeleteAction: false,
    }
  },
  computed: {
    ...mapState('order', ['orders', 'error']), // Map orders and errors from Vuex state to the component
    ...mapState('user', ['user', 'error']),
    isLoading() {
      return this.$store.state.order.isLoading // Get loading state from Vuex
    },
    errorMessage() {
      return this.$store.getters['order/errorMessage'] // Get error message from Vuex getters
    },
  },
  created() {
    this.userId = this.$route.params.id
    if (this.userId) {
      this.$store.dispatch('order/fetchOrders', this.userId)
      this.$store.dispatch('user/fetchUserById', this.userId)
    }
  },
  methods: {
    openConfirmationModal(userId, fullName, email, isDeleteAction) {
      this.orderId = userId
      this.fullName = fullName
      this.email = email
      this.isDeleteAction = isDeleteAction
      this.isModalVisible = true
    },
    closeConfirmationModal() {
      this.isModalVisible = false
    },
    openCreateModal() {
      this.isCreateModalVisible = true
    },
    closeCreateModal() {
      this.isCreateModalVisible = false
    },
    handleClickOutside(event) {
      if (event.target.classList.contains('create-modal')) {
        this.closeCreateModal()
      }
      if (event.target.classList.contains('modal')) {
        this.closeConfirmationModal()
      }
    },
    confirmAction(userId, updatedUser = null) {
      if (this.isDeleteAction) {
        this.$store.dispatch('order/deleteOrder', userId)
      } else {
        this.$store.dispatch('order/editOrder', { userId, updatedOrder })
        this.$store.dispatch('user/fetchOrders')
      }
      this.closeConfirmationModal()
    },
  },
}
</script>
