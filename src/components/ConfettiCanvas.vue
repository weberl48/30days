<template>
  <canvas
    ref="confettiCanvas"
    class="fixed inset-0 pointer-events-none z-40"
    :width="canvasWidth"
    :height="canvasHeight"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { createConfetti, createStreakConfetti, createAchievementConfetti } from '../utils/animations'

const confettiCanvas = ref(null)
const canvasWidth = ref(window.innerWidth)
const canvasHeight = ref(window.innerHeight)

function handleResize() {
  canvasWidth.value = window.innerWidth
  canvasHeight.value = window.innerHeight
}

function handleStreakConfetti(event) {
  createStreakConfetti(event.detail.streak)
}

function handleAchievementConfetti() {
  createAchievementConfetti()
}

function handleDayComplete() {
  createConfetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  })
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('streak-milestone', handleStreakConfetti)
  window.addEventListener('achievement-unlocked', handleAchievementConfetti)
  window.addEventListener('day-completed', handleDayComplete)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('streak-milestone', handleStreakConfetti)
  window.removeEventListener('achievement-unlocked', handleAchievementConfetti)
  window.removeEventListener('day-completed', handleDayComplete)
})

defineExpose({
  createConfetti,
  createStreakConfetti,
  createAchievementConfetti
})
</script>