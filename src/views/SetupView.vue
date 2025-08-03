<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">
          Setup
        </h2>
        <p class="text-gray-600">
          Enter participant names to begin the 30-day challenge
        </p>
      </div>

      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Partner 1 Name
          </label>
          <input
            v-model="player1Name"
            type="text"
            required
            maxlength="20"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter first partner's name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Partner 2 Name
          </label>
          <input
            v-model="player2Name"
            type="text"
            required
            maxlength="20"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter second partner's name"
          />
        </div>

        <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <h4 class="font-medium text-gray-800 mb-2">Information</h4>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• Progress syncs in real-time</li>
            <li>• Both partners can track on any device</li>
            <li>• Daily challenges unlock progressively</li>
          </ul>
        </div>

        <button
          type="submit"
          :disabled="!canSubmit"
          class="w-full bg-primary-600 text-white py-4 px-6 rounded font-semibold text-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Challenge
        </button>
      </form>

      <div class="mt-6 text-center">
        <router-link
          to="/"
          class="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
        >
          ← Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'
import { playSound, vibrate } from '../utils/helpers'

const router = useRouter()
const gameStore = useGameStore()

const player1Name = ref('')
const player2Name = ref('')

const canSubmit = computed(() => 
  player1Name.value.trim() && player2Name.value.trim()
)

function handleSubmit() {
  if (!canSubmit.value) return
  
  const name1 = player1Name.value.trim()
  const name2 = player2Name.value.trim()
  
  gameStore.startChallenge(name1, name2)
  
  playSound('success')
  vibrate([100, 50, 100])
  
  router.push('/challenge')
}
</script>