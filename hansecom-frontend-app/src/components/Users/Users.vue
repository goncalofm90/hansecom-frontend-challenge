<template>
  <div className="text-center">
    <h1>User List</h1>
    <!-- Show loader if loading -->
    <Loader v-if="isLoading" />
    <!-- Show error message -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <ul v-else>
      <li v-for="user in users" :key="user.id">{{ user.fullName }} - {{ user.email }}</li>
    </ul>
  </div>
  <UserForm />
</template>

<script>
import { mapState } from 'vuex'
import Loader from '../Loader/Loader.vue'
import UserForm from './UserForm/UserForm.vue'

export default {
  components: {
    Loader,
    UserForm,
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
}
</script>
