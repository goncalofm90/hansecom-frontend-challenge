<template>
  <div class="text-center text-2xl"><RouterLink to="/">Home</RouterLink></div>
  <div className="p-10">
    <h1>User List</h1>
    <!-- Show loader if loading -->
    <Loader v-if="isLoading" />
    <!-- Show error message -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <ul role="list" class="divide-y divide-gray-100" v-else>
      <li v-for="user in users" :key="user.id" class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
          <span class="pi pi-user"></span>
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">{{ user.fullName }}</p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">
              {{ user.email }}
            </p>
          </div>
        </div>
        <div class="md:flex md:items-center flex">
          <p class="hidden md:block mt-1 text-xs leading-5 text-gray-500">
            Created
            <time datetime="2023-01-23T13:23Z">{{ new Date(user.createdAt).toDateString() }} </time>
          </p>
          <button
            class="text-black hover:bg-red-700 text-white font-bold md:px-1 rounded p-2 ms-5"
            @click="openConfirmationModal(user.id)"
          >
            <span class="pi pi-trash"></span>
          </button>
        </div>
      </li>
    </ul>
    <ConfirmationModal
      :isVisible="isModalVisible"
      :userId="userIdToDelete"
      :onConfirm="confirmDelete"
      :onCancel="closeConfirmationModal"
    />
  </div>
  <UserForm />
</template>

<script>
import { mapState } from 'vuex'
import Loader from '../Loader/Loader.vue'
import UserForm from './UserForm/UserForm.vue'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal.vue'

export default {
  components: {
    Loader,
    UserForm,
    ConfirmationModal,
  },
  data() {
    return {
      userIdToDelete: null,
      isModalVisible: false,
    }
  },
  computed: {
    ...mapState(['users', 'error']), // Map users and errors from Vuex state to the component
    isLoading() {
      return this.$store.state.isLoading // Get loading state from Vuex
    },
    errorMessage() {
      return this.$store.getters.errorMessage // Get error message from Vuex getters
    },
  },
  created() {
    // Dispatch the fetchUsers action when the component is created
    this.$store.dispatch('fetchUsers')
  },
  methods: {
    openConfirmationModal(userId) {
      this.userIdToDelete = userId
      this.isModalVisible = true
    },
    closeConfirmationModal() {
      this.isModalVisible = false // Hide the modal
    },
    confirmDelete(userId) {
      this.$store.dispatch('deleteUser', userId) // Call deleteUser with the user ID
      this.closeConfirmationModal() // Hide the modal after confirmation
    },
  },
}
</script>
