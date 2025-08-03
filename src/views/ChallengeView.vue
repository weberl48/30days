<template>
  <div class="min-h-screen p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6" data-aos="fade-down">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-2xl font-bold text-gray-800">
            30-Day Health Challenge
          </h1>
          <div class="flex items-center space-x-4">
            <XPDisplay :xp="gameStore.currentPlayerData?.xpPoints || 0" />
            <NotificationToggle />
          </div>
        </div>
        
        <p class="text-gray-600 text-center mb-4">
          Building healthy habits together! 💑
        </p>
        
        <PartnerStatus />
      </div>

      <!-- Player Selector -->
      <PlayerSelector />

      <!-- Day Display & Progress -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6" data-aos="fade-up">
        <DayDisplay />
        <ProgressBar />
      </div>

      <!-- Challenge Card -->
      <ChallengeCard />

      <!-- Habit Chain -->
      <HabitChain />

      <!-- Weekly & Couple Challenges -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <WeeklyChallenge />
        <CoupleChallenge />
      </div>

      <!-- Activity Feed -->
      <ActivityFeed />

      <!-- Todo List -->
      <TodoList />

      <!-- Player Stats -->
      <PlayerStats />

      <!-- Navigation -->
      <NavigationButtons />

      <!-- Session Info -->
      <SessionInfo />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGameStore } from '../stores/gameStore'

// Import components
import XPDisplay from '../components/XPDisplay.vue'
import NotificationToggle from '../components/NotificationToggle.vue'
import PartnerStatus from '../components/PartnerStatus.vue'
import PlayerSelector from '../components/PlayerSelector.vue'
import DayDisplay from '../components/DayDisplay.vue'
import ProgressBar from '../components/ProgressBar.vue'
import ChallengeCard from '../components/ChallengeCard.vue'
import HabitChain from '../components/HabitChain.vue'
import WeeklyChallenge from '../components/WeeklyChallenge.vue'
import CoupleChallenge from '../components/CoupleChallenge.vue'
import ActivityFeed from '../components/ActivityFeed.vue'
import TodoList from '../components/TodoList.vue'
import PlayerStats from '../components/PlayerStats.vue'
import NavigationButtons from '../components/NavigationButtons.vue'
import SessionInfo from '../components/SessionInfo.vue'

const gameStore = useGameStore()

onMounted(() => {
  gameStore.checkDailyReset()
})
</script>