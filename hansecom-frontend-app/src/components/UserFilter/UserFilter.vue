<template>
  <div class="md:flex sm:flex-col md:flex-row md:justify-between items-center my-4">
    <input
      type="text"
      v-model="searchQuery"
      @input="filterUsers"
      placeholder="Search by name or email..."
      class="border border-gray-300 rounded-md p-2 mb-2 md:mb-4"
    />
    <select
      v-model="selectedSort"
      @change="sortUsers"
      class="border border-gray-300 rounded-md p-2"
    >
      <option value="none" disabled>Select Sort Order</option>
      <option value="nameAsc">Sort by Name (A-Z)</option>
      <option value="nameDesc">Sort by Name (Z-A)</option>
      <option value="emailAsc">Sort by Email (A-Z)</option>
      <option value="emailDesc">Sort by Email (Z-A)</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
    onFilteredUsers: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      searchQuery: '',
      selectedSort: 'none',
    }
  },
  methods: {
    filterUsers() {
      const filteredUsers = this.users
        .map((user) => ({ ...user }))
        .filter((user) => {
          return (
            user.fullName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        })
      this.onFilteredUsers(filteredUsers)
    },
    sortUsers() {
      //localeCompare > sort
      //...user because of vueX
      const sortedUsers = [...this.users.map((user) => ({ ...user }))]
      if (this.selectedSort === 'nameAsc') {
        sortedUsers.sort((a, b) => a.fullName.localeCompare(b.fullName))
      } else if (this.selectedSort === 'nameDesc') {
        sortedUsers.sort((a, b) => b.fullName.localeCompare(a.fullName))
      } else if (this.selectedSort === 'emailAsc') {
        sortedUsers.sort((a, b) => a.email.localeCompare(b.email))
      } else if (this.selectedSort === 'emailDesc') {
        sortedUsers.sort((a, b) => b.email.localeCompare(a.email))
      }
      this.onFilteredUsers(sortedUsers)
    },
  },
}
</script>
