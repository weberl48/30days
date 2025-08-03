<template>
  <button
    :class="buttonClass"
    class="p-2 rounded-full transition-all duration-200 hover:scale-110"
    :title="notificationStore.isEnabled ? 'Notifications enabled' : 'Enable notifications'"
    @click="toggleNotifications"
  >
    {{ notificationStore.isEnabled ? '🔔' : '🔕' }}
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useNotificationStore } from '../stores/notificationStore'

const notificationStore = useNotificationStore()

const buttonClass = computed(() => 
  notificationStore.isEnabled 
    ? 'bg-green-500 text-white' 
    : 'bg-gray-300 text-gray-600'
)

async function toggleNotifications() {
  if (!notificationStore.isEnabled) {
    await notificationStore.requestPermission()
  } else {
    notificationStore.updateSettings({ 
      ...notificationStore.settings,
      dailyReminder: !notificationStore.settings.dailyReminder 
    })
  }
}
</script>