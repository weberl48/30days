<template>
  <div class="bg-white rounded-lg shadow p-6 mb-6 relative">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold text-gray-800">
        Daily Habits for {{ gameStore.playerNames[`player${gameStore.currentPlayer}`] }}
      </h3>
      <StreakCounter :streak="gameStore.currentStreak" />
    </div>

    <div class="space-y-3">
      <TodoItem
        v-for="day in revealedDays"
        :key="`day${day}`"
        :day="day"
        :challenge="challenges[day - 1]"
        :is-completed="isCompleted(day)"
        :partner-completed="isPartnerCompleted(day)"
        @toggle="handleToggle"
      />
    </div>

    <div v-if="revealedDays.length === 0" class="text-center py-8 text-gray-500">
      <p class="text-lg">Reveal your first challenge to get started</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '../stores/gameStore'
import { challenges } from '../data/challenges'
import TodoItem from './TodoItem.vue'
import StreakCounter from './StreakCounter.vue'

const gameStore = useGameStore()

const revealedDays = computed(() => 
  gameStore.gameData.revealedDays.filter(day => day <= gameStore.currentDay)
)

function isCompleted(day) {
  return gameStore.currentPlayerData?.todoStatus[`day${day}`] || false
}

function isPartnerCompleted(day) {
  return gameStore.partnerPlayerData?.todoStatus[`day${day}`] || false
}

function handleToggle(day, isChecked) {
  gameStore.toggleTodo(`day${day}`, isChecked)
}
</script>