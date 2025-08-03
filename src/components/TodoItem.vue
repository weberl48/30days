<template>
  <div class="todo-item-container">
    <VTooltip 
      placement="bottom-start" 
      :distance="8"
      :delay="{ show: 300, hide: 100 }"
      :auto-hide="true"
      theme="todo-tooltip"
    >
      <div 
        class="todo-item flex items-center justify-between p-4 bg-gray-50 rounded border hover:bg-gray-100 transition-colors duration-200"
        :class="getItemClasses()"
      >
        <div class="flex items-center space-x-3 flex-1">
          <button
            class="flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center"
            :class="getCheckboxClasses()"
            @click="$emit('toggle', day, !isCompleted)"
          >
            <svg 
              v-if="isCompleted" 
              class="w-4 h-4 text-white" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fill-rule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clip-rule="evenodd" 
              />
            </svg>
          </button>
          
          <div class="flex items-center space-x-2 flex-1 min-w-0">
            <span class="text-sm font-medium text-gray-500">Day {{ day }}</span>
            <span class="text-lg font-semibold truncate" :class="getTitleClasses()">
              {{ challenge.title }}
            </span>
            <div class="flex space-x-2">
              <span 
                v-for="tag in challenge.tags" 
                :key="tag"
                class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div class="flex items-center space-x-2 text-xs text-gray-500">
            <span>{{ challenge.estimatedTime }}</span>
            <span class="text-primary-600 font-semibold">+{{ challenge.xpReward }}XP</span>
          </div>
        </div>
        
        <!-- Partner Status Indicator -->
        <div class="flex items-center space-x-1 ml-3">
          <div 
            v-if="partnerCompleted"
            class="w-2 h-2 bg-green-400 rounded-full"
            title="Partner completed"
          ></div>
          <div 
            v-else
            class="w-2 h-2 bg-gray-300 rounded-full"
            title="Partner not completed"
          ></div>
        </div>
      </div>
      
      <template #popper>
        <div class="space-y-3 p-4 max-w-xs">
          <div>
            <h4 class="font-semibold text-gray-800 mb-1">{{ challenge.title }}</h4>
            <p class="text-sm text-gray-600">{{ challenge.description }}</p>
          </div>
          
          <div class="border-t pt-3">
            <h5 class="font-medium text-gray-700 mb-1 text-sm">Tip:</h5>
            <p class="text-xs text-gray-600">{{ getTipForDay(day) }}</p>
          </div>
          
          <div class="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
            <div class="flex items-center space-x-3">
              <span>{{ challenge.category }}</span>
              <span>Difficulty: Level {{ challenge.difficulty }}</span>
            </div>
            <span>{{ challenge.estimatedTime }}</span>
          </div>
        </div>
      </template>
    </VTooltip>
  </div>
</template>

<script setup>
import { VTooltip } from 'floating-vue'
import { challengeTips } from '../data/challenges'

const props = defineProps({
  day: {
    type: Number,
    required: true
  },
  challenge: {
    type: Object,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  partnerCompleted: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle'])

function getItemClasses() {
  if (props.isCompleted) {
    return 'bg-green-50 border-green-200'
  }
  return 'border-gray-200'
}

function getCheckboxClasses() {
  if (props.isCompleted) {
    return 'bg-green-500 border-green-500'
  }
  return 'border-gray-300 hover:border-primary-400'
}

function getTitleClasses() {
  if (props.isCompleted) {
    return 'text-green-700 line-through'
  }
  return 'text-gray-800'
}

function getTipForDay(day) {
  // challengeTips array is 0-indexed, but days are 1-indexed
  return challengeTips[day - 1] || 'Keep up the great work!'
}
</script>

<style>
/* Custom theme for todo tooltips */
.v-popper--theme-todo-tooltip .v-popper__popper {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s, transform 0.3s;
}

.v-popper--theme-todo-tooltip .v-popper__arrow-outer {
  border-color: #e5e7eb;
}

.v-popper--theme-todo-tooltip .v-popper__arrow-inner {
  border-color: white;
}
</style>