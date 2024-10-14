<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this user?</p>
      <div class="modal-actions">
        <button @click="confirmDelete">Yes</button>
        <button @click="cancelDelete">No</button>
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
    userId: {
      type: Number,
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
  methods: {
    confirmDelete() {
      this.onConfirm(this.userId) // Call the confirm function with the user ID
    },
    cancelDelete() {
      this.onCancel() // Call the cancel function
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
