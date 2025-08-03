<template>
  <div class="text-center">
    <p v-if="statusText" class="text-sm" :style="{ color: statusColor }">
      {{ statusText }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()

const statusText = computed(() => {
  const { player1, player2 } = gameStore.playerNames
  if (!player1 || !player2) return ''
  
  if (gameStore.isConnected) {
    return `${player1} & ${player2} - Synced ✓`
  } else {
    return `${player1} & ${player2} - Connecting...`
  }
})

const statusColor = computed(() => 
  gameStore.isConnected ? '#10B981' : '#F59E0B'
)
</script>