<template>
  <div class="modal" v-if="isVisible" @click="handleClickOutside">
    <div class="modal-content">
      <h2>
        {{ isDeleteAction ? (isUser ? 'Confirm Deletion' : 'Delete Order') : '' }}
      </h2>

      <p v-if="isDeleteAction">
        {{
          isUser
            ? 'Are you sure you want to delete this user?'
            : 'Are you sure you want to delete this order?'
        }}
      </p>
      <div v-else>
        <p class="mb-5 text-center">{{ isUser ? 'Edit User' : 'Edit Order' }}</p>

        <div v-if="!isDeleteAction && isUser" class="flex flex-col">
          <label class="py-5">
            Full Name:
            <input v-model="localFullName" type="text" />
          </label>
          <label>
            Email:
            <input v-model="localEmail" type="email" />
          </label>
        </div>

        <div v-if="!isDeleteAction && !isUser" class="flex flex-col">
          <label class="py-5">
            Order Date:
            <input v-model="localOrderDate" type="date" />
          </label>
          <label>
            Product:
            <input v-model="localProduct" type="text" />
          </label>
        </div>
      </div>

      <div class="modal-actions">
        <button @click="confirmAction">
          {{ isDeleteAction ? 'Delete' : 'Edit' }}
        </button>
        <button @click="cancelAction">Cancel</button>
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

<style scoped>
.modal {
  position: fixed;
  animation: fadeIn 1s;
  top: -50vh;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #f0f0f0;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
