<template>
  <div class="flex items-center space-x-2 bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium">
    <span>{{ formattedXP }} XP</span>
    <div class="text-xs opacity-75">
      Level {{ level.level }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getXPLevel, formatNumber } from '../utils/helpers'

const props = defineProps({
  xp: {
    type: Number,
    default: 0
  }
})

const formattedXP = computed(() => formatNumber(props.xp))
const level = computed(() => getXPLevel(props.xp))
</script>