<template>
  <div class="loader flex flex-col items-center justify-center bg-white bg-opacity-80">
    <div
      class="spinner border-8 border-gray-200 border-t-8 border-t-hansecom-cyan rounded-full w-12 h-12 animate-spin"
    ></div>
    <p class="text-xs font-bold text-hansecom-orange">Loading...</p>
  </div>
</template>

<script>
export default {
  name: 'Loader',
}
</script>
