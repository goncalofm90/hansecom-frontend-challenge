<template>
  <div className="flex justify-between p-5">
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/orders">Go to Orders</RouterLink>
    <RouterLink to="/users">Go to Users</RouterLink>
  </div>
  <RouterView />
</template>

<script setup lang="ts"></script>
