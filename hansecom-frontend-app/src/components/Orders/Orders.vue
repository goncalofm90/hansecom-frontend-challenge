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
        <span class="pi pi-user"></span> {{ !error ? `${user?.full_name}'s orders` : null }}
      </h1>
      <button
        class="text-white bg-black font-bold md:px-1 rounded p-2 ms-5 hover:bg-blue-500"
        @click="openCreateModal()"
      >
        Order Item
      </button>
    </div>
    <!-- Show loader if loading -->
    <Loader v-if="isLoading && paginatedOrders.length" />
    <!-- Show error message -->
    <OrderFilter :orders="orders" :onFilteredOrders="updateFilteredOrders" />
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <ul role="list" class="divide-y divide-gray-100" v-else>
      <li
        v-for="order in paginatedOrders"
        :key="order.id"
        class="flex justify-between gap-x-6 py-5"
      >
        <div class="flex min-w-0 gap-x-4">
          <span class="pi pi-cart-arrow-down content-center text-4xl"></span>
          <div class="min-w-0 flex-auto">
            <p class="font-semibold leading-6 text-gray-900">
              {{ order.product }}
            </p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">
              Ordered by {{ user?.full_name }} - {{ user?.email }}
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
            @click="openConfirmationModal(order.id, order.order_date, order.product, false)"
          >
            <span class="pi pi-box"></span>
          </button>
          <button
            class="text-black hover:text-white hover:bg-red-700 font-bold md:px-1 rounded p-2 ms-5"
            @click="openConfirmationModal(order.id, order.order_date, order.product, true)"
          >
            <span class="pi pi-trash"></span>
          </button>
        </div>
      </li>
    </ul>

    <div class="flex justify-center mt-4" v-if="filteredOrders.length > itemsPerPage">
      <button
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
        class="px-4 py-2 mx-1 bg-gray-200 hover:bg-gray-300 rounded"
      >
        Previous
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-4 py-2 mx-1 rounded',
          { 'bg-blue-500 text-white': currentPage === page, 'bg-gray-200': currentPage !== page },
        ]"
      >
        {{ page }}
      </button>

      <button
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
        class="px-4 py-2 mx-1 bg-gray-200 hover:bg-gray-300 rounded"
      >
        Next
      </button>
    </div>
    <ConfirmationModal
      :isVisible="isModalVisible"
      :orderId="orderId"
      :orderDate="orderDate"
      :product="product"
      :isDeleteAction="isDeleteAction"
      :isUser="false"
      :onConfirm="confirmAction"
      :onCancel="closeConfirmationModal"
      :handleClickOutside="handleClickOutside"
    />
  </div>
  <div>
    <CreateOrderModal
      :updateFilteredOrders="updateFilteredOrders"
      :isVisible="isCreateModalVisible"
      :closeCreateModal="closeCreateModal"
      :handleClickOutside="handleClickOutside"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '../Loader/Loader.vue'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal.vue'
import CreateOrderModal from '../CreateOrderModal/CreateOrderModal.vue'
import OrderFilter from './Orderfilter/Orderfilter.vue'

export default {
  components: {
    Loader,
    ConfirmationModal,
    CreateOrderModal,
    OrderFilter,
  },
  data() {
    return {
      orderDate: '',
      product: '',
      orderId: null,
      isModalVisible: false,
      isCreateModalVisible: false,
      isDeleteAction: false,
      filteredOrders: [],
      currentPage: 1,
      itemsPerPage: 5,
    }
  },
  computed: {
    ...mapState('order', ['orders', 'error']),
    ...mapState('user', ['user', 'error']),
    isLoading() {
      return this.$store.state.order.isLoading
    },
    errorMessage() {
      return this.$store.getters['order/errorMessage']
    },
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredOrders.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredOrders.length / this.itemsPerPage)
    },
  },
  created() {
    this.$store.dispatch('order/fetchOrders', this.$route.params.id)
    this.$store.dispatch('user/fetchUserById', this.$route.params.id)
  },
  watch: {
    orders: {
      immediate: true,
      handler(newOrders) {
        this.filteredOrders = [...newOrders]
      },
    },
  },
  methods: {
    openConfirmationModal(orderId, orderDate, product, isDeleteAction) {
      this.orderDate = orderDate
      this.product = product
      this.orderId = orderId
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
    confirmAction(orderId, updatedOrder = null) {
      if (this.isDeleteAction) {
        this.$store.dispatch('order/deleteOrder', orderId)
        this.updateFilteredOrders(this.orders)
      } else {
        this.$store.dispatch('order/editOrder', { orderId, updatedOrder })
        this.updateFilteredOrders(this.orders)
      }
      this.closeConfirmationModal()
    },
    handleClickOutside(event) {
      if (event.target.classList.contains('create-modal')) {
        this.closeCreateModal()
      }
      if (event.target.classList.contains('modal')) {
        this.closeConfirmationModal()
      }
    },
    updateFilteredOrders(orders) {
      this.filteredOrders = orders
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
  },
}
</script>
