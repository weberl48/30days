<template>
  <div class="flex justify-center mb-6">
    <div class="bg-white rounded-lg shadow p-2 flex space-x-2">
      <button
        v-for="player in [1, 2]"
        :key="player"
        :class="playerButtonClass(player)"
        class="px-6 py-3 rounded font-semibold transition-colors duration-200"
        @click="gameStore.switchPlayer(player)"
      >
        <span>{{ gameStore.playerNames[`player${player}`] || `Player ${player}` }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()

function playerButtonClass(player) {
  const isActive = gameStore.currentPlayer === player
  if (isActive) {
    return 'bg-primary-600 text-white'
  }
  return 'bg-gray-100 text-gray-700 hover:bg-gray-200'
}
</script>