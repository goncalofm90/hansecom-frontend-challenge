<template>
  <div
    class="modal fixed top-[-50vh] left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] animate-fadeIn"
    v-if="isVisible"
    @click="handleClickOutside"
  >
    <div class="bg-white p-5 rounded-lg shadow-lg text-center">
      <h2 class="my-5 text-hansecom-blue font-bold">
        {{ isDeleteAction ? (isUser ? 'Confirm Deletion' : 'Delete Order') : '' }}
      </h2>

      <p
        v-if="isDeleteAction"
        class="block text-gray-500 font-bold md:text-right mb-1 md:mb-5 pr-4"
      >
        {{
          isUser
            ? 'Are you sure you want to delete this user?'
            : 'Are you sure you want to delete this order?'
        }}
      </p>
      <div v-else>
        <h2 class="my-5 text-hansecom-blue font-bold">{{ isUser ? 'Edit User' : 'Edit Order' }}</h2>

        <div v-if="!isDeleteAction && isUser" class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Full Name:
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              v-model="localFullName"
              type="text"
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-hansecom-cyan"
            />
          </div>
        </div>

        <div v-if="!isDeleteAction && !isUser" class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Order Date:
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              v-model="localOrderDate"
              type="date"
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-hansecom-cyan"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Product:
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-hansecom-orange"
              v-model="localProduct"
              type="text"
            />
          </div>
        </div>
      </div>

      <div class="modal-actions">
        <button
          @click="confirmAction"
          class="bg-hansecom-cyan hover:bg-hansecom-green text-white font-bold py-2 px-4 ms-5 rounded"
        >
          {{ isDeleteAction ? 'Delete' : 'Edit' }}
        </button>
        <button
          class="bg-hansecom-cyan hover:bg-hansecom-red text-white font-bold py-2 px-4 ms-5 rounded"
          @click="cancelAction"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    handleClickOutside: {
      type: Function,
      required: false,
    },
    userId: {
      type: [Number, null],
      required: false,
      default: null,
    },
    orderId: {
      type: [Number, null],
      required: false,
      default: null,
    },
    fullName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    orderDate: {
      type: String,
      required: false,
    },
    product: {
      type: String,
      required: false,
    },
    isDeleteAction: {
      type: Boolean,
      required: true,
    },
    isUser: {
      type: Boolean,
      required: true,
    },
    onConfirm: {
      type: Function,
      required: true,
    },
    onCancel: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      localFullName: this.fullName,
      localEmail: this.email,
      localOrderDate: this.orderDate,
      localProduct: this.product,
    }
  },
  watch: {
    fullName(newVal) {
      this.localFullName = newVal
    },
    email(newVal) {
      this.localEmail = newVal
    },
    orderDate(newVal) {
      this.localOrderDate = newVal
    },
    product(newVal) {
      this.localProduct = newVal
    },
  },
  methods: {
    confirmAction() {
      if (this.isDeleteAction) {
        this.isUser ? this.onConfirm(this.userId) : this.onConfirm(this.orderId)
      } else {
        if (this.isUser) {
          const updatedUser = {
            fullName: this.localFullName,
            email: this.localEmail,
          }
          this.onConfirm(this.userId, updatedUser)
        } else {
          const updatedOrder = {
            orderDate: this.localOrderDate,
            product: this.localProduct,
          }
          this.onConfirm(this.orderId, updatedOrder)
        }
      }
    },
    cancelAction() {
      this.onCancel()
    },
  },
}
</script>
