<template>
  <div
    class="fixed top-[-50vh] left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] animate-fadeIn create-modal"
    v-if="isVisible"
    @click="handleClickOutside"
  >
    <div class="bg-white p-5 rounded-lg shadow-lg text-center">
      <h2 class="my-5 text-hansecom-blue font-bold">Create User</h2>
      <form @submit.prevent="submitForm" class="w-full max-w-sm">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="fullName"
            >
              Full Name
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              id="fullName"
              v-model="fullName"
              required
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-hansecom-cyan"
              type="text"
              placeholder="Username"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="email"
            >
              Email
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              type="email"
              id="email"
              v-model="email"
              required
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-hansecom-cyan"
              placeholder="Username"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="password"
            >
              Password
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-hansecom-orange"
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="******************"
            />
          </div>
        </div>
        <div class="md:flex md:items-center justify-center">
          <div class="md:w-2/3">
            <button
              class="bg-hansecom-cyan hover:bg-hansecom-green text-white font-bold py-2 px-4 ms-5 rounded"
              type="submit"
            >
              Create User
            </button>
          </div>
        </div>
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

      this.$store
        .dispatch('user/createUser', user)
        .then(() => {
          this.resetForm()
          this.closeCreateModal()
          this.$store.dispatch('user/fetchUsers', this.userId).then(() => {
            this.updateFilteredUsers(this.$store.state.user.users)
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>
