<template>
  <div class="create-modal" v-if="isVisible" @click="handleClickOutside">
    <div class="modal-content">
      <h2>Create User</h2>
      <form @submit.prevent="submitForm" class="text-center">
        <div>
          <label for="fullName">Full Name:</label>
          <input type="text" id="fullName" v-model="fullName" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="btn bg-black text-white p-3 rounded mt-5">Create User</button>
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
      fullName: '',
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapState('user', ['error']),
    errorMessage() {
      return this.$store.getters['user/errorMessage']
    },
  },
  methods: {
    resetForm() {
      this.fullName = ''
      this.email = ''
      this.password = ''
    },
    submitForm() {
      const user = {
        fullName: this.fullName,
        email: this.email,
        password: this.password,
      }

      this.$store.dispatch('user/createUser', user).then(() => {
        this.resetForm()
        this.closeCreateModal()
      })
    },
  },
}
</script>

<style scoped>
.create-modal {
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
