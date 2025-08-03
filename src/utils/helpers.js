import dayjs from 'dayjs'

export function generateSessionCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const timestamp = Date.now().toString(36).slice(-4).toUpperCase()
  let result = timestamp
  
  // Add 4 more random characters
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  // Shuffle the result to make it less predictable
  return result.split('').sort(() => Math.random() - 0.5).join('')
}

export function getTodayKey() {
  return dayjs().format('YYYY-MM-DD')
}

export function formatDate(date, format = 'MMMM D, YYYY') {
  return dayjs(date).format(format)
}

export function getDateDifference(date1, date2, unit = 'day') {
  return dayjs(date1).diff(dayjs(date2), unit)
}

export function isToday(date) {
  return dayjs(date).isSame(dayjs(), 'day')
}

export function getWeekNumber(date) {
  return dayjs(date).week()
}

export function getDaysUntil(targetDate) {
  return dayjs(targetDate).diff(dayjs(), 'day')
}

export function formatDuration(minutes) {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (remainingMinutes === 0) {
    return `${hours}h`
  }
  return `${hours}h ${remainingMinutes}m`
}

export function getStreakEmoji(streak) {
  if (streak >= 30) return '👑'
  if (streak >= 21) return '💎'
  if (streak >= 14) return '🏆'
  if (streak >= 7) return '⭐'
  if (streak >= 3) return '🔥'
  return '💪'
}

export function getXPLevel(xp) {
  if (xp >= 1000) return { level: 10, title: 'Health Master' }
  if (xp >= 800) return { level: 9, title: 'Wellness Guru' }
  if (xp >= 600) return { level: 8, title: 'Habit Hero' }
  if (xp >= 450) return { level: 7, title: 'Consistency King/Queen' }
  if (xp >= 350) return { level: 6, title: 'Progress Pro' }
  if (xp >= 250) return { level: 5, title: 'Momentum Maker' }
  if (xp >= 150) return { level: 4, title: 'Streak Seeker' }
  if (xp >= 100) return { level: 3, title: 'Habit Builder' }
  if (xp >= 50) return { level: 2, title: 'Getting Started' }
  return { level: 1, title: 'Beginner' }
}

export function calculateXPToNextLevel(currentXP) {
  const levels = [0, 50, 100, 150, 250, 350, 450, 600, 800, 1000]
  const currentLevel = getXPLevel(currentXP).level
  
  if (currentLevel >= 10) return 0
  
  return levels[currentLevel] - currentXP
}

export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function throttle(func, limit) {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text)
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    return new Promise((resolve, reject) => {
      document.execCommand('copy') ? resolve() : reject()
      textArea.remove()
    })
  }
}

export function vibrate(pattern = [100]) {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}

export function playSound(type = 'success') {
  // Create audio context for sound effects
  if ('AudioContext' in window || 'webkitAudioContext' in window) {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    const audioContext = new AudioContext()
    
    const sounds = {
      success: { frequency: 800, duration: 150 },
      error: { frequency: 300, duration: 300 },
      notification: { frequency: 600, duration: 100 },
      achievement: { frequency: 1000, duration: 200 }
    }
    
    const sound = sounds[type] || sounds.success
    
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = sound.frequency
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration / 1000)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + sound.duration / 1000)
  }
}

export function shareContent(data) {
  if (navigator.share) {
    return navigator.share(data)
  } else {
    // Fallback: copy to clipboard
    const text = `${data.title}\n${data.text}\n${data.url}`
    return copyToClipboard(text)
  }
}

export function getDeviceType() {
  const userAgent = navigator.userAgent.toLowerCase()
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent)
  const isTablet = /ipad|android(?!.*mobile)/.test(userAgent)
  
  if (isTablet) return 'tablet'
  if (isMobile) return 'mobile'
  return 'desktop'
}

export function isOnline() {
  return navigator.onLine
}

export function formatNumber(num) {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)  }M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)  }K`
  }
  return num.toString()
}

export function getRandomMotivationalQuote() {
  const quotes = [
    "Every small step counts",
    "Consistency builds results",
    "Progress over perfection",
    "Stay focused on your goals",
    "Small habits create big changes",
    "Keep moving forward",
    "Every day is an opportunity",
    "Maintain your momentum"
  ]
  
  return quotes[Math.floor(Math.random() * quotes.length)]
}

export function getTimeOfDayGreeting() {
  const hour = dayjs().hour()
  
  if (hour < 6) return "Good night"
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  if (hour < 21) return "Good evening"
  return "Good night"
}