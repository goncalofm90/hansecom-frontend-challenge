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

export default {
  components: {
    Loader,
    CreateUserForm,
    ConfirmationModal,
    CreateUserModal,
  },
  data() {
    return {
      fullName: '',
      email: '',
      userId: null,
      isModalVisible: false,
      isCreateModalVisible: false,
      isDeleteAction: false,
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
  },
  created() {
    this.$store.dispatch('user/fetchUsers')
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
      } else {
        this.$store.dispatch('user/editUser', { userId, updatedUser })
        this.$store.dispatch('user/fetchUsers')
      }
      this.closeConfirmationModal()
    },
  },
}
</script>
