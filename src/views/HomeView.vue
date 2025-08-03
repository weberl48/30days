<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          Health Challenge
        </h1>
        <p class="text-gray-600">
          30 days of building healthy habits together
        </p>
      </div>

      <div class="space-y-4">
        <router-link
          to="/setup"
          class="block w-full bg-primary-600 text-white py-4 px-6 rounded font-semibold text-lg hover:bg-primary-700 transition-colors duration-200"
        >
          Start New Challenge
        </router-link>

        <router-link
          to="/join"
          class="block w-full bg-green-600 text-white py-4 px-6 rounded font-semibold text-lg hover:bg-green-700 transition-colors duration-200"
        >
          Join Challenge
        </router-link>

        <div v-if="gameStore.isSetupComplete" class="pt-4 border-t border-gray-200">
          <router-link
            to="/challenge"
            class="block w-full bg-gray-600 text-white py-4 px-6 rounded font-semibold text-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Continue Challenge
          </router-link>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-gray-200">
        <p class="text-sm text-gray-500 mb-4">Features</p>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span>Real-time sync</span>
          </div>
          <div>
            <span>Achievements</span>
          </div>
          <div>
            <span>Progress tracking</span>
          </div>
          <div>
            <span>Reminders</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
</script>