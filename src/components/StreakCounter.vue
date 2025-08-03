<template>
  <div class="flex items-center space-x-2 bg-gray-700 text-white px-3 py-2 rounded shadow">
    <div class="flex flex-col">
      <span class="text-xs font-medium opacity-75">Streak</span>
      <span class="text-lg font-bold leading-none">{{ streak }} days</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  streak: {
    type: Number,
    default: 0
  }
})
</script>