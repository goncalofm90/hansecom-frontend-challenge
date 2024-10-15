<template>
  <div class="modal" v-if="isVisible" @click="handleClickOutside">
    <div class="modal-content">
      <h2>{{ isDeleteAction ? 'Confirm Deletion' : '' }}</h2>

      <p v-if="isDeleteAction">Are you sure you want to delete this user?</p>
      <div v-else>
        <p class="mb-5 text-center">Edit User</p>

        <div v-if="!isDeleteAction" class="flex flex-col">
          <label class="py-5">
            Full Name:
            <input v-model="fullName" type="text" />
          </label>
          <label>
            Email:
            <input v-model="email" type="email" />
          </label>
        </div>
      </div>

      <div class="modal-actions">
        <button @click="confirmAction">{{ isDeleteAction ? 'Yes, Delete' : 'Edit' }}</button>
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
    clearForm: {
      type: Function,
      required: false,
    },
    userId: {
      type: [Number, null],
      required: true,
      default: 0,
    },
    isDeleteAction: {
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
      fullName: '',
      email: '',
      password: '',
    }
  },
  methods: {
    confirmAction() {
      if (this.isDeleteAction) {
        this.onConfirm(this.userId)
      } else {
        const updatedUser = { fullName: this.fullName, email: this.email, date: Date.now() }
        this.onConfirm(this.userId, updatedUser)
        this.clearForm()
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
