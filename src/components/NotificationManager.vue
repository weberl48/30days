<template>
  <div></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useNotificationStore } from '../stores/notificationStore'

const notificationStore = useNotificationStore()

onMounted(() => {
  notificationStore.initialize()
})
</script>