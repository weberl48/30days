import { defineStore } from 'pinia'
import { ref } from 'vue'
import Push from 'push.js'
import dayjs from 'dayjs'

export const useNotificationStore = defineStore('notification', () => {
  const isEnabled = ref(false)
  const settings = ref({
    dailyReminder: true,
    partnerActivity: true,
    achievements: true,
    streakMilestones: true,
    reminderTime: '09:00'
  })

  function initialize() {
    loadSettings()
    setupEventListeners()
    
    if (isEnabled.value) {
      scheduleDailyReminder()
    }
  }

  async function requestPermission() {
    try {
      const permission = await Push.Permission.request()
      isEnabled.value = permission === 'granted'
      
      if (isEnabled.value) {
        scheduleDailyReminder()
        showNotification('Notifications enabled!', '🔔 You\'ll receive helpful reminders')
      }
      
      saveSettings()
      return isEnabled.value
    } catch (error) {
      console.error('Notification permission error:', error)
      return false
    }
  }

  function showNotification(title, body, options = {}) {
    if (!isEnabled.value) return

    const defaultOptions = {
      body,
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      tag: 'health-challenge',
      requireInteraction: false,
      timeout: 5000,
      ...options
    }

    Push.create(title, defaultOptions)
  }

  function scheduleDailyReminder() {
    if (!isEnabled.value || !settings.value.dailyReminder) return

    // Clear existing reminder
    clearDailyReminder()

    const now = dayjs()
    const [hour, minute] = settings.value.reminderTime.split(':').map(Number)
    let reminderTime = now.hour(hour).minute(minute).second(0)

    // If the time has passed today, schedule for tomorrow
    if (reminderTime.isBefore(now)) {
      reminderTime = reminderTime.add(1, 'day')
    }

    const msUntilReminder = reminderTime.diff(now)

    setTimeout(() => {
      showNotification(
        'Daily Health Challenge',
        'Time to complete your daily habits.',
        {
          tag: 'daily-reminder',
          requireInteraction: true,
          actions: [
            { action: 'open', title: 'Open App' },
            { action: 'snooze', title: 'Remind in 1 hour' }
          ]
        }
      )

      // Schedule next day's reminder
      setTimeout(() => scheduleDailyReminder(), 24 * 60 * 60 * 1000)
    }, msUntilReminder)
  }

  function clearDailyReminder() {
    // This would clear any existing timeout, but we'll use a simpler approach
    // In a real app, you'd want to track timeouts to clear them properly
  }

  function notifyPartnerActivity(playerName, action) {
    if (!settings.value.partnerActivity) return

    showNotification(
      `${playerName} is active`,
      `${action}`,
      {
        tag: 'partner-activity',
        timeout: 3000
      }
    )
  }

  function notifyAchievement(achievement) {
    if (!settings.value.achievements) return

    showNotification(
      'Achievement Unlocked',
      achievement.name,
      {
        tag: 'achievement',
        requireInteraction: true,
        timeout: 8000
      }
    )
  }

  function notifyStreakMilestone(streak) {
    if (!settings.value.streakMilestones) return

    const messages = {
      3: '3-day streak achieved',
      7: '1 week streak achieved',
      14: '2 week streak achieved',
      21: '3 week streak achieved',
      30: '30-day challenge completed'
    }

    const message = messages[streak]
    if (message) {
      showNotification(
        'Streak Milestone!',
        message,
        {
          tag: 'streak-milestone',
          requireInteraction: true,
          timeout: 10000
        }
      )
    }
  }

  function setupEventListeners() {
    // Listen for custom events from the game store
    window.addEventListener('achievement-unlocked', (event) => {
      notifyAchievement(event.detail)
    })

    window.addEventListener('day-completed', (event) => {
      showNotification(
        'Day Complete',
        `All habits completed for Day ${event.detail.day}`,
        { tag: 'day-complete', timeout: 5000 }
      )
    })

    window.addEventListener('partner-activity', (event) => {
      notifyPartnerActivity(event.detail.playerName, event.detail.action)
    })

    // Handle notification clicks
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'NOTIFICATION_CLICK') {
          // Handle notification click actions
          window.focus()
        }
      })
    }
  }

  function updateSettings(newSettings) {
    settings.value = { ...settings.value, ...newSettings }
    saveSettings()

    if (settings.value.dailyReminder && isEnabled.value) {
      scheduleDailyReminder()
    }
  }

  function saveSettings() {
    localStorage.setItem('notificationSettings', JSON.stringify({
      isEnabled: isEnabled.value,
      settings: settings.value
    }))
  }

  function loadSettings() {
    const saved = localStorage.getItem('notificationSettings')
    if (saved) {
      const parsed = JSON.parse(saved)
      isEnabled.value = parsed.isEnabled || false
      settings.value = { ...settings.value, ...parsed.settings }
    }
  }

  return {
    isEnabled,
    settings,
    initialize,
    requestPermission,
    showNotification,
    scheduleDailyReminder,
    notifyPartnerActivity,
    notifyAchievement,
    notifyStreakMilestone,
    updateSettings
  }
})