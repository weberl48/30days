<template>
  <div class="mb-6">
    <div
      v-if="!gameStore.isDayRevealed"
      class="bg-primary-600 rounded-lg shadow p-8 text-center cursor-pointer hover:bg-primary-700 transition-colors duration-200 min-h-[200px] flex items-center justify-center"
      @click="revealChallenge"
    >
      <div class="text-white">
        <div class="text-xl font-bold">Click to reveal today's challenge</div>
      </div>
    </div>

    <div
      v-else
      class="bg-white rounded-lg shadow p-8 text-center min-h-[200px] flex flex-col justify-center"
    >
      <div class="flex items-center justify-center mb-4">
        <h3 class="text-2xl font-bold text-gray-800">
          {{ gameStore.currentChallenge?.title }}
        </h3>
        <TipsButton :challenge-index="gameStore.currentDay - 1" />
      </div>
      
      <p class="text-gray-600 text-lg mb-6 leading-relaxed">
        {{ gameStore.currentChallenge?.description }}
      </p>
      
      <div class="flex flex-wrap justify-center gap-2 mb-4">
        <TagBadge
          v-for="tag in gameStore.currentChallenge?.tags"
          :key="tag"
          :tag="tag"
        />
      </div>

      <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
        <span>{{ gameStore.currentChallenge?.estimatedTime }}</span>
        <span>•</span>
        <span>{{ gameStore.currentChallenge?.xpReward }} XP</span>
        <span>•</span>
        <span>Level {{ gameStore.currentChallenge?.difficulty }}/5</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore'
import { playSound, vibrate } from '../utils/helpers'
import TipsButton from './TipsButton.vue'
import TagBadge from './TagBadge.vue'

const gameStore = useGameStore()

function revealChallenge() {
  gameStore.revealChallenge()
  playSound('success')
  vibrate([100])
}
</script>