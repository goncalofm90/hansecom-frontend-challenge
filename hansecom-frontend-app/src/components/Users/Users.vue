<template>
  <div className="text-center">
    <h1>User List</h1>
    <Loader v-if="isLoading" />
    <!-- Show loader if loading -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <!-- Show error message -->
    <ul v-else>
      <li v-for="user in users" :key="user.id">{{ user.fullName }} - {{ user.email }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '../Loader/Loader.vue' // Import the Loader component

export default {
  components: {
    Loader,
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
