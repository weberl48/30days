<template>
  <div class="min-h-screen p-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6" data-aos="fade-down">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          📊 Analytics & Insights
        </h1>
        <p class="text-gray-600">
          Track your progress and discover patterns in your health journey
        </p>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total XP"
          :value="totalXP"
          icon="⚡"
          color="yellow"
          data-aos="fade-up"
          data-aos-delay="0"
        />
        <MetricCard
          title="Current Streak"
          :value="longestStreak"
          icon="🔥"
          color="red"
          data-aos="fade-up"
          data-aos-delay="100"
        />
        <MetricCard
          title="Completion Rate"
          :value="`${completionRate}%`"
          icon="🎯"
          color="blue"
          data-aos="fade-up"
          data-aos-delay="200"
        />
        <MetricCard
          title="Days Active"
          :value="daysActive"
          icon="📅"
          color="green"
          data-aos="fade-up"
          data-aos-delay="300"
        />
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <!-- Progress Chart -->
        <div class="bg-white rounded-2xl shadow-lg p-6" data-aos="fade-right">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Daily Progress</h3>
          <ProgressChart :data="progressChartData" />
        </div>

        <!-- Category Breakdown -->
        <div class="bg-white rounded-2xl shadow-lg p-6" data-aos="fade-left">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Challenge Categories</h3>
          <CategoryChart :data="categoryChartData" />
        </div>
      </div>

      <!-- Streak Calendar -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6" data-aos="fade-up">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Streak Calendar</h3>
        <StreakCalendar :data="streakCalendarData" />
      </div>

      <!-- Achievements -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6" data-aos="fade-up">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Achievements</h3>
        <AchievementsList :achievements="achievements" />
      </div>

      <!-- Partner Comparison -->
      <div class="bg-white rounded-2xl shadow-lg p-6" data-aos="fade-up">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Partner Comparison</h3>
        <PartnerComparison :player1="player1Stats" :player2="player2Stats" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '../stores/gameStore'
import { challenges } from '../data/challenges'
import MetricCard from '../components/MetricCard.vue'
import ProgressChart from '../components/ProgressChart.vue'
import CategoryChart from '../components/CategoryChart.vue'
import StreakCalendar from '../components/StreakCalendar.vue'
import AchievementsList from '../components/AchievementsList.vue'
import PartnerComparison from '../components/PartnerComparison.vue'

const gameStore = useGameStore()

// Computed analytics data
const totalXP = computed(() => {
  const p1XP = gameStore.gameData.player1?.xpPoints || 0
  const p2XP = gameStore.gameData.player2?.xpPoints || 0
  return p1XP + p2XP
})

const longestStreak = computed(() => {
  const streak1 = gameStore.calculateStreak(1)
  const streak2 = gameStore.calculateStreak(2)
  return Math.max(streak1, streak2)
})

const completionRate = computed(() => {
  const totalTasks = gameStore.gameData.revealedDays.length * 2 // Both players
  if (totalTasks === 0) return 0
  
  const completedTasks = gameStore.gameData.revealedDays.reduce((sum, day) => {
    const p1Complete = gameStore.gameData.player1?.todoStatus[`day${day}`] ? 1 : 0
    const p2Complete = gameStore.gameData.player2?.todoStatus[`day${day}`] ? 1 : 0
    return sum + p1Complete + p2Complete
  }, 0)
  
  return Math.round((completedTasks / totalTasks) * 100)
})

const daysActive = computed(() => gameStore.gameData.revealedDays.length)

// Chart data
const progressChartData = computed(() => {
  return gameStore.gameData.revealedDays.map(day => ({
    day: `Day ${day}`,
    player1: gameStore.gameData.player1?.todoStatus[`day${day}`] ? 1 : 0,
    player2: gameStore.gameData.player2?.todoStatus[`day${day}`] ? 1 : 0
  }))
})

const categoryChartData = computed(() => {
  const categories = {}
  
  gameStore.gameData.revealedDays.forEach(day => {
    const challenge = challenges[day - 1]
    if (challenge?.category) {
      categories[challenge.category] = (categories[challenge.category] || 0) + 1
    }
  })
  
  return Object.entries(categories).map(([category, count]) => ({
    category,
    count
  }))
})

const streakCalendarData = computed(() => {
  // Generate calendar data for streak visualization
  const data = []
  for (let day = 1; day <= 30; day++) {
    const p1Complete = gameStore.gameData.player1?.todoStatus[`day${day}`] || false
    const p2Complete = gameStore.gameData.player2?.todoStatus[`day${day}`] || false
    const isRevealed = gameStore.gameData.revealedDays.includes(day)
    
    data.push({
      day,
      player1Complete: p1Complete,
      player2Complete: p2Complete,
      bothComplete: p1Complete && p2Complete,
      isRevealed
    })
  }
  return data
})

const achievements = computed(() => {
  const allAchievements = [
    ...gameStore.gameData.player1?.achievements || [],
    ...gameStore.gameData.player2?.achievements || []
  ]
  return [...new Set(allAchievements)] // Remove duplicates
})

const player1Stats = computed(() => ({
  name: gameStore.playerNames.player1,
  xp: gameStore.gameData.player1?.xpPoints || 0,
  streak: gameStore.calculateStreak(1),
  completions: gameStore.todayCompletionCount,
  achievements: gameStore.gameData.player1?.achievements || []
}))

const player2Stats = computed(() => ({
  name: gameStore.playerNames.player2,
  xp: gameStore.gameData.player2?.xpPoints || 0,
  streak: gameStore.calculateStreak(2),
  completions: Object.values(gameStore.gameData.player2?.todoStatus || {}).filter(Boolean).length,
  achievements: gameStore.gameData.player2?.achievements || []
}))
</script>