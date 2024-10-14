<template>
  <div class="text-center mt-5">
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
      <button type="submit" className="btn bg-black text-white p-3 rounded mt-5">
        Create User
      </button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapState(['error']),
    errorMessage() {
      return this.$store.getters.errorMessage
    },
  },
  methods: {
    submitForm() {
      const user = {
        fullName: this.fullName,
        email: this.email,
        password: this.password,
      }

      this.$store.dispatch('createUser', user).then(() => {
        this.clearForm()
      })
    },
    clearForm() {
      this.fullName = ''
      this.email = ''
      this.password = ''
    },
  },
}
</script>

<style scoped>
.user-form {
  max-width: 400px;
  margin: 0 auto;
}
.error {
  color: red;
}
</style>
