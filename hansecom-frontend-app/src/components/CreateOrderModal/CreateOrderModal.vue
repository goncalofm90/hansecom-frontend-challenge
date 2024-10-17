<template>
  <div class="create-modal" v-if="isVisible" @click="handleClickOutside">
    <div class="modal-content">
      <h2>What would you like to order?</h2>
      <form @submit.prevent="submitForm" class="text-center">
        <div>
          <label for="product">Product:</label>
          <input type="text" id="product" v-model="product" required />
        </div>
        <button type="submit" class="btn bg-black text-white p-3 rounded mt-5">Order</button>
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
      orderDate: new Date(Date.now()).toDateString(),
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
      const user = {
        userId: this.userId,
        orderDate: this.orderDate,
        product: this.product,
      }

      this.$store.dispatch('order/createOrder', user).then(() => {
        this.resetForm()
        this.closeCreateModal()
      })
    },
  },
}
</script>
