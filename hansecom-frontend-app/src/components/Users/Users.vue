<!-- TODO: DO NOT FORGET TO TYPE EVERYTHING -->
<!-- <script setup lang="ts"></script> -->

<template>
  <div class="text-center text-2xl"><RouterLink to="/">Home</RouterLink></div>
  <div class="p-10">
    <div class="flex justify-between">
      <h1 class="font-bold text-2xl"><span class="pi pi-user"></span> User List</h1>
      <button
        class="text-white bg-black font-bold md:px-1 rounded p-2 ms-5"
        @click="openCreateModal()"
      >
        Create User
      </button>
    </div>
    <!-- Show loader if loading -->
    <Loader v-if="isLoading && paginatedUsers.length" />
    <!-- Show error message -->
    <UserFilter :users="users" :onFilteredUsers="updateFilteredUsers" />
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <ul role="list" class="divide-y divide-gray-100" v-else>
      <li v-for="user in paginatedUsers" :key="user.id" class="flex justify-between gap-x-6 py-5">
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
          <RouterLink :to="`orders/${user.id}`">
            <button
              class="text-black outline outline-black text-xs hover:bg-orange-500 hover:text-white font-bold rounded p-1 ms-5"
            >
              orders
            </button>
          </RouterLink>
          <button
            class="text-black hover:bg-yellow-500 hover:text-white font-bold md:px-1 rounded p-2 ms-5"
            @click="openConfirmationModal(user.id, user.fullName, user.email, false)"
          >
            <span class="pi pi-user-edit"></span>
          </button>
          <button
            class="text-black hover:text-white hover:bg-red-700 font-bold md:px-1 rounded p-2 ms-5"
            @click="openConfirmationModal(user.id, user.fullName, user.email, true)"
          >
            <span class="pi pi-trash"></span>
          </button>
        </div>
      </li>
    </ul>
    <div class="flex justify-center mt-4" v-if="filteredUsers.length > itemsPerPage">
      <button
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
        class="px-4 py-2 mx-1 bg-gray-200 hover:bg-gray-300 rounded"
      >
        Previous
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-4 py-2 mx-1 rounded',
          { 'bg-blue-500 text-white': currentPage === page, 'bg-gray-200': currentPage !== page },
        ]"
      >
        {{ page }}
      </button>

      <button
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
        class="px-4 py-2 mx-1 bg-gray-200 hover:bg-gray-300 rounded"
      >
        Next
      </button>
    </div>
    <ConfirmationModal
      :isVisible="isModalVisible"
      :userId="userId"
      :fullName="fullName"
      :email="email"
      :isDeleteAction="isDeleteAction"
      :isUser="true"
      :onConfirm="confirmAction"
      :onCancel="closeConfirmationModal"
      :handleClickOutside="handleClickOutside"
    />
  </div>
  <div>
    <CreateUserModal
      :isVisible="isCreateModalVisible"
      :closeCreateModal="closeCreateModal"
      :handleClickOutside="handleClickOutside"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '../Loader/Loader.vue'
import CreateUserForm from './CreateUserForm/CreateUserForm.vue'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal.vue'
import CreateUserModal from '../CreateUserModal/CreateUserModal.vue'
import UserFilter from './UserFilter/UserFilter.vue'

export default {
  components: {
    Loader,
    CreateUserForm,
    ConfirmationModal,
    CreateUserModal,
    UserFilter,
  },
  data() {
    return {
      fullName: '',
      email: '',
      userId: null,
      isModalVisible: false,
      isCreateModalVisible: false,
      isDeleteAction: false,
      filteredUsers: [],
      currentPage: 1,
      itemsPerPage: 5,
    }
  },
  computed: {
    ...mapState('user', ['users', 'error']), // Map users and errors from Vuex state to the component
    isLoading() {
      return this.$store.state.user.isLoading // Get loading state from Vuex
    },
    errorMessage() {
      return this.$store.getters['user/errorMessage'] // Get error message from Vuex getters
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredUsers.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage)
    },
  },
  created() {
    this.$store.dispatch('user/fetchUsers')
  },
  watch: {
    users: {
      immediate: true,
      handler(newUsers) {
        this.filteredUsers = [...newUsers]
      },
    },
  },
  methods: {
    openConfirmationModal(userId, fullName, email, isDeleteAction) {
      this.userId = userId
      this.fullName = fullName
      this.email = email
      this.isDeleteAction = isDeleteAction
      this.isModalVisible = true
    },
    closeConfirmationModal() {
      this.isModalVisible = false
    },
    openCreateModal() {
      this.isCreateModalVisible = true
    },
    closeCreateModal() {
      this.isCreateModalVisible = false
    },
    handleClickOutside(event) {
      if (event.target.classList.contains('create-modal')) {
        this.closeCreateModal()
      }
      if (event.target.classList.contains('modal')) {
        this.closeConfirmationModal()
      }
    },
    confirmAction(userId, updatedUser = null) {
      if (this.isDeleteAction) {
        this.$store.dispatch('user/deleteUser', userId)
        this.updateFilteredUsers(this.users)
      } else {
        this.$store.dispatch('user/editUser', { userId, updatedUser })
        this.updateFilteredUsers(this.users)
      }
      this.closeConfirmationModal()
    },
    updateFilteredUsers(users) {
      this.filteredUsers = users
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
  },
}
</script>
