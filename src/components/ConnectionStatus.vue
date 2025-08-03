<template>
  <div 
    :class="statusClass"
    class="fixed top-4 right-4 px-4 py-2 rounded-full text-sm font-medium z-50 transition-all duration-300"
  >
    <span class="mr-2">{{ statusIcon }}</span>
    {{ statusText }}
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { monitorConnection } from '../services/firebase'

const isConnected = ref(false)
const isInitializing = ref(true)

const statusClass = computed(() => {
  if (isInitializing.value) return 'bg-yellow-500 text-white'
  return isConnected.value ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
})

const statusIcon = computed(() => {
  if (isInitializing.value) return '🟡'
  return isConnected.value ? '🟢' : '🔴'
})

const statusText = computed(() => {
  if (isInitializing.value) return 'Connecting...'
  return isConnected.value ? 'Connected' : 'Offline'
})

let unsubscribe = null

onMounted(() => {
  unsubscribe = monitorConnection((connected) => {
    isConnected.value = connected
    isInitializing.value = false
  })
})

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }
})
</script>