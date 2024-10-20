<template>
  <div
    class="create-modal fixed top-[-50vh] left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] animate-fadeIn"
    v-if="isVisible"
    @click="handleClickOutside"
  >
    <div class="bg-white p-5 rounded-lg shadow-lg text-center">
      <h2 class="my-5 text-hansecom-blue font-bold">What would you like to order?</h2>
      <form @submit.prevent="submitForm" class="w-full max-w-sm">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="product"
              >Product:</label
            >
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-hansecom-blue leading-tight focus:outline-none focus:bg-white focus:border-hansecom-cyan"
              type="text"
              id="product"
              v-model="product"
              placeholder="bananas"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          class="bg-hansecom-cyan hover:bg-hansecom-green text-white font-bold py-2 px-4 rounded"
        >
          Order
        </button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    closeCreateModal: {
      type: Function,
      required: false,
    },
    updateFilteredOrders: {
      type: Function,
      required: false,
    },
    handleClickOutside: {
      type: Function,
      required: false,
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      orderDate: new Date(Date.now()),
      product: '',
    }
  },
  computed: {
    ...mapState('user', ['user']),
    userId() {
      return this.user ? this.user.id : null
    },
    errorMessage() {
      return this.$store.getters['user/errorMessage']
    },
  },
  methods: {
    resetForm() {
      this.product = ''
    },
    submitForm() {
      const order = {
        userId: this.userId,
        orderDate: this.orderDate,
        product: this.product,
      }

      this.$store
        .dispatch('order/createOrder', order)
        .then(() => {
          this.resetForm()
          this.closeCreateModal()
          this.$store.dispatch('order/fetchOrders', this.userId).then(() => {
            this.updateFilteredOrders(this.$store.state.order.orders)
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>
