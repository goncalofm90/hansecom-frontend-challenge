<template>
  <RouterLink :to="`/users`" class="px-5">
    <button
      class="text-black outline outline-black text-xs hover:bg-orange-500 hover:text-white hover:outline-none font-bold rounded p-1 ms-5 mt-5 transition duration-200 ease-linear"
    >
      back
    </button>
  </RouterLink>
  <div class="p-10">
    <div class="flex justify-between">
      <h1 class="font-bold text-2xl">
        <span class="pi pi-user"></span> {{ !error ? 'Order list' : '' }}
      </h1>
      <button
        class="text-white bg-hansecom-blue hover:bg-hansecom-cyan hover:text-white font-bold md:px-1 rounded p-2 ms-5 transition duration-200 ease-linear"
        @click="openCreateModal()"
      >
        Order Item
      </button>
    </div>
    <OrderFilter :orders="orders" :onFilteredOrders="updateFilteredOrders" />
    <!-- Show loader if loading -->
    <Loader v-if="isLoading" />
    <ul role="list" class="divide-y divide-gray-100" v-else>
      <!-- Show error message -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <li
        v-if="paginatedOrders.length"
        v-for="order in paginatedOrders"
        :key="order.id"
        class="flex justify-between gap-x-6 py-5 hover:bg-hansecom-cyan transition duration-200 ease-linear hover:text-white p-5 rounded"
      >
        <div class="flex min-w-0 gap-x-4 text-hansecom-blue hover:text-white w-3/4">
          <span class="pi pi-cart-arrow-down content-center text-4xl"></span>
          <div class="min-w-0 flex-auto">
            <p class="font-semibold leading-6">
              {{ order.product }}
            </p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500 hover:text-white">
              Ordered by {{ user?.full_name }} - {{ user?.email }}
            </p>
          </div>
        </div>
        <div class="md:flex md:items-center flex">
          <p class="hidden md:block mt-1 text-xs leading-5 text-gray-500 hover:text-white">
            Ordered on
            <time
              >{{
                order.orderDate
                  ? new Date(order.orderDate).toDateString()
                  : new Date(order.order_date).toDateString()
              }}
            </time>
          </p>
          <button
            class="text-black hover:bg-hansecom-orange hover:text-white font-bold md:px-1 rounded p-2 ms-5 transition duration-200 ease-linear"
            @click="openConfirmationModal(order.id, order.order_date, order.product, false)"
          >
            <span class="pi pi-box"></span>
          </button>
          <button
            class="text-black hover:text-white hover:bg-hansecom-red font-bold md:px-1 rounded p-2 ms-5 transition duration-200 ease-linear"
            @click="openConfirmationModal(order.id, order.order_date, order.product, true)"
          >
            <span class="pi pi-trash"></span>
          </button>
        </div>
      </li>
      <li v-else class="text-center text-2xl text-hansecom-blue">
        This user has no scheduled orders at the moment.
      </li>
    </ul>

    <div class="flex justify-center mt-4" v-if="filteredOrders.length > itemsPerPage">
      <button
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
        class="px-4 py-2 mx-1 bg-white outline hover:bg-hansecom-cyan hover:text-white rounded transition duration-200 ease-linear"
      >
        Previous
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-4 py-2 mx-1 rounded',
          {
            'px-4 py-2 mx-1 bg-white outline hover:bg-hansecom-orange hover:text-white rounded transition duration-200 ease-linear':
              currentPage === page,
            'px-4 py-2 mx-1 bg-white hover:bg-hansecom-green hover:text-white rounded transition duration-200 ease-linear':
              currentPage !== page,
          },
        ]"
      >
        {{ page }}
      </button>

      <button
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
        class="px-4 py-2 mx-1 bg-white outline hover:bg-hansecom-cyan hover:text-white rounded transition duration-200 ease-linear"
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
