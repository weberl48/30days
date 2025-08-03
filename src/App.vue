<template>
  <div id="app" :class="themeClass">
    <ConnectionStatus />
    <NotificationManager />
    <router-view />
    <ConfettiCanvas ref="confettiCanvas" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useGameStore } from './stores/gameStore'
import { useNotificationStore } from './stores/notificationStore'
import ConnectionStatus from './components/ConnectionStatus.vue'
import NotificationManager from './components/NotificationManager.vue'
import ConfettiCanvas from './components/ConfettiCanvas.vue'

const gameStore = useGameStore()
const notificationStore = useNotificationStore()

const themeClass = computed(() => {
  const player = gameStore.currentPlayer
  return `player${player}-theme`
})

onMounted(() => {
  // Initialize stores
  gameStore.initialize()
  notificationStore.initialize()
  
  // Set up periodic sync
  setInterval(() => {
    gameStore.syncToFirebase()
  }, 30000) // Sync every 30 seconds
})
</script>

<style>
/* Global theme variables */
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --success-color: #22c55e;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
}

.player1-theme {
  --theme-gradient: linear-gradient(135deg, #94A3B8 0%, #64748B 100%);
  --theme-primary: #64748B;
  --theme-light: #F1F5F9;
}

.player2-theme {
  --theme-gradient: linear-gradient(135deg, #A5D8FF 0%, #77E2D4 100%);
  --theme-primary: #4ECDC4;
  --theme-light: #F0FDFA;
}

body {
  background: var(--theme-gradient, var(--primary-gradient));
  transition: background 0.5s ease;
  min-height: 100vh;
}
</style>