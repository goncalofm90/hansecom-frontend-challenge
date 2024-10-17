<template>
  <div class="md:flex sm:flex-col md:flex-row md:justify-between items-center my-4">
    <input
      type="text"
      v-model="searchQuery"
      @input="filterOrders"
      placeholder="Search by name or email..."
      class="border border-gray-300 rounded-md p-2 mb-2 md:mb-4"
    />
    <select
      v-model="selectedSort"
      @change="sortOrders"
      class="border border-gray-300 rounded-md p-2"
    >
      <option value="none" disabled>Select Sort Order</option>
      <option value="nameAsc">Sort by Product Name (A-Z)</option>
      <option value="nameDesc">Sort by Product Name (Z-A)</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      required: true,
    },
    onFilteredOrders: {
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
    filterOrders() {
      const filteredOrders = this.orders
        .map((order) => ({ ...order }))
        .filter((order) => {
          return order.product.toLowerCase().includes(this.searchQuery.toLowerCase())
        })
      this.onFilteredOrders(filteredOrders)
    },
    sortOrders() {
      //localeCompare > sort
      //...user because of vueX
      const sortedOrders = [...this.orders.map((order) => ({ ...order }))]
      if (this.selectedSort === 'nameAsc') {
        sortedOrders.sort((a, b) => a.product.localeCompare(b.product))
      } else if (this.selectedSort === 'nameDesc') {
        sortedOrders.sort((a, b) => b.product.localeCompare(a.product))
      }
      this.onFilteredOrders(sortedOrders)
    },
  },
}
</script>
