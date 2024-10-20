<!-- TODO: DO NOT FORGET TO TYPE EVERYTHING -->
<!-- <script setup lang="ts"></script> -->

<template>
  <RouterLink :to="`/`">
    <button
      class="text-black outline outline-black text-xs hover:bg-orange-500 hover:text-white hover:outline-none font-bold rounded p-1 ms-5 mt-5 transition duration-200 ease-linear"
    >
      Home
    </button>
  </RouterLink>
  <div class="p-10 h-full">
    <div class="flex justify-between">
      <h1 class="font-bold text-2xl"><span class="pi pi-user"></span> User List</h1>
      <button
        class="text-white bg-hansecom-blue hover:bg-hansecom-cyan hover:text-white font-bold md:px-1 rounded p-2 ms-5 transition duration-200 ease-linear"
        @click="openCreateModal()"
      >
        Create User
      </button>
    </div>
    <UserFilter :users="users" :onFilteredUsers="updateFilteredUsers" />
    <!-- Show loader if loading -->
    <Loader v-if="isLoading" />
    <ul role="list" class="divide-y divide-gray-100" v-else>
      <!-- Show error message -->
      <p v-if="errorMessage" class="error text-hansecom-red">{{ errorMessage }}</p>
      <li
        v-if="paginatedUsers.length"
        v-for="user in paginatedUsers"
        :key="user.id"
        class="flex justify-between gap-x-6 py-5 hover:bg-hansecom-cyan transition duration-200 ease-linear hover:text-white p-5 rounded"
      >
        <div class="flex min-w-0 gap-x-4 text-hansecom-blue hover:text-white w-3/4">
          <span class="pi pi-user"></span>
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6">
              {{ user.fullName }}
            </p>
            <p class="mt-1 truncate text-xs leading-5 hidden md:block">
              {{ user.email }}
            </p>
          </div>
        </div>
        <div class="md:flex md:items-center flex">
          <p class="hidden md:block mt-1 text-xs leading-5 text-hansecom-blue hover:text-white">
            Created
            <time datetime="2023-01-23T13:23Z">{{ new Date(user.createdAt).toDateString() }} </time>
          </p>
          <RouterLink :to="`orders/${user.id}`">
            <button
              class="text-hansecom-blue bg-hansecom-blue text-white hover:outline-none text-xs hover:bg-hansecom-orange font-bold rounded p-1 ms-5 transition duration-200 ease-linear"
            >
              orders
            </button>
          </RouterLink>
          <button
            class="text-hansecom-blue hover:bg-hansecom-orange hover:text-white font-bold md:px-1 rounded p-2 ms-5 transition duration-200 ease-linear"
            @click="openConfirmationModal(user.id, user.fullName, user.email, false)"
          >
            <span class="pi pi-user-edit"></span>
          </button>
          <button
            class="text-hansecom-blue hover:text-white hover:bg-hansecom-red font-bold md:px-1 rounded p-2 ms-5 transition duration-200 ease-linear"
            @click="openConfirmationModal(user.id, user.fullName, user.email, true)"
          >
            <span class="pi pi-trash"></span>
          </button>
        </div>
      </li>
      <li v-else class="text-center text-2xl text-hansecom-blue">There are no created users.</li>
    </ul>
    <div class="flex justify-center mt-4" v-if="filteredUsers.length > itemsPerPage">
      <button
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
        class="px-4 py-2 mx-1 bg-white outline hover:bg-hansecom-cyan hover:text-white rounded transition duration-200 ease-linear"
      >
        Previous
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-4 py-2 mx-1 rounded',
          {
            'px-4 py-2 mx-1 bg-white outline hover:bg-hansecom-orange hover:text-white rounded transition duration-200 ease-linear':
              currentPage === page,
            'px-4 py-2 mx-1 bg-white hover:bg-hansecom-green hover:text-white rounded transition duration-200 ease-linear':
              currentPage !== page,
          },
        ]"
      >
        {{ page }}
      </button>

      <button
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
        class="px-4 py-2 mx-1 bg-white outline hover:bg-hansecom-cyan hover:text-white rounded transition duration-200 ease-linear"
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
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal.vue'
import CreateUserModal from '../CreateUserModal/CreateUserModal.vue'
import UserFilter from './UserFilter/UserFilter.vue'

export default {
  components: {
    Loader,
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
