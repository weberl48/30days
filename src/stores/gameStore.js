import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { database } from '../services/firebase'
import { generateSessionCode, getTodayKey } from '../utils/helpers'
import { challenges } from '../data/challenges'
import dayjs from 'dayjs'

export const useGameStore = defineStore('game', () => {
  // State
  const currentPlayer = ref(1)
  const currentDay = ref(1)
  const sessionCode = ref('')
  const playerNames = ref({ player1: '', player2: '' })
  const challengeStartDate = ref(null)
  const gameData = ref({
    currentDay: 1,
    revealedDays: [],
    player1: {
      todoStatus: {},
      dailyCompletions: {},
      lastActiveDate: null,
      achievements: [],
      xpPoints: 0
    },
    player2: {
      todoStatus: {},
      dailyCompletions: {},
      lastActiveDate: null,
      achievements: [],
      xpPoints: 0
    },
    weeklyChallenge: {
      completed: false,
      week: 1
    },
    coupleChallenge: {
      completed: false,
      week: 1
    }
  })
  
  const isConnected = ref(false)
  const sessionRef = ref(null)
  const isInitializing = ref(true)

  // Computed
  const isSetupComplete = computed(() => 
    playerNames.value.player1 && playerNames.value.player2
  )

  const currentPlayerData = computed(() => 
    gameData.value[`player${currentPlayer.value}`]
  )

  const partnerPlayerData = computed(() => 
    gameData.value[`player${currentPlayer.value === 1 ? 2 : 1}`]
  )

  const currentChallenge = computed(() => 
    challenges[currentDay.value - 1]
  )

  const isDayRevealed = computed(() => 
    gameData.value.revealedDays.includes(currentDay.value)
  )

  const todayCompletionCount = computed(() => {
    const playerData = currentPlayerData.value
    if (!playerData) return 0
    
    return gameData.value.revealedDays
      .filter(day => day <= currentDay.value)
      .reduce((count, day) => {
        return count + (playerData.todoStatus[`day${day}`] ? 1 : 0)
      }, 0)
  })

  const currentStreak = computed(() => calculateStreak(currentPlayer.value))

  const totalCompleted = computed(() => {
    const playerData = currentPlayerData.value
    if (!playerData) return 0
    
    const todoCount = Object.values(playerData.todoStatus).filter(Boolean).length
    const historyCount = Object.values(playerData.dailyCompletions).reduce((sum, day) => {
      if (typeof day === 'object' && day !== null) {
        return sum + Object.values(day).filter(Boolean).length
      }
      return sum
    }, 0)
    
    return todoCount + historyCount
  })

  const progressPercentage = computed(() => 
    Math.round((currentDay.value / 30) * 100)
  )

  // Actions
  function initialize() {
    loadFromLocalStorage()
    initializeFirebaseSession()
    checkDailyReset()
  }

  function startChallenge(name1, name2) {
    playerNames.value = { player1: name1, player2: name2 }
    challengeStartDate.value = dayjs().format('YYYY-MM-DD')
    sessionCode.value = generateSessionCode()
    
    // Initialize first day
    gameData.value.revealedDays = [1]
    gameData.value.player1.todoStatus['day1'] = false
    gameData.value.player2.todoStatus['day1'] = false
    
    saveToLocalStorage()
    createFirebaseSession()
  }

  function switchPlayer(playerNum) {
    currentPlayer.value = playerNum
    checkDailyReset()
  }

  function revealChallenge() {
    if (!gameData.value.revealedDays.includes(currentDay.value)) {
      gameData.value.revealedDays.push(currentDay.value)
      gameData.value.player1.todoStatus[`day${currentDay.value}`] = false
      gameData.value.player2.todoStatus[`day${currentDay.value}`] = false
      
      // Award XP for revealing challenge
      currentPlayerData.value.xpPoints += 5
      
      syncToFirebase()
    }
  }

  function toggleTodo(todoKey, isChecked) {
    const playerData = currentPlayerData.value
    playerData.todoStatus[todoKey] = isChecked
    
    // Award/remove XP
    if (isChecked) {
      playerData.xpPoints += 10
      checkAchievements()
    } else {
      playerData.xpPoints = Math.max(0, playerData.xpPoints - 10)
    }
    
    syncToFirebase()
    checkDayCompletion()
  }

  function nextDay() {
    if (currentDay.value < 30) {
      currentDay.value++
      gameData.value.currentDay = currentDay.value
      
      // Auto-reveal new day
      if (!gameData.value.revealedDays.includes(currentDay.value)) {
        revealChallenge()
      }
      
      syncToFirebase()
    }
  }

  function previousDay() {
    if (currentDay.value > 1) {
      currentDay.value--
      gameData.value.currentDay = currentDay.value
      syncToFirebase()
    }
  }

  function joinSession(code) {
    sessionCode.value = code.toUpperCase()
    connectToFirebaseSession(sessionCode.value)
  }

  function checkDailyReset() {
    const today = getTodayKey()
    const playerData = currentPlayerData.value
    
    if (playerData && playerData.lastActiveDate !== today) {
      // Save yesterday's progress
      if (playerData.lastActiveDate && playerData.todoStatus) {
        playerData.dailyCompletions[playerData.lastActiveDate] = { ...playerData.todoStatus }
      }
      
      // Reset today's todos
      const todayData = {}
      gameData.value.revealedDays.forEach(day => {
        if (day <= currentDay.value) {
          todayData[`day${day}`] = false
        }
      })
      
      playerData.todoStatus = todayData
      playerData.lastActiveDate = today
      
      syncToFirebase()
    }
  }

  function checkAchievements() {
    const playerData = currentPlayerData.value
    const achievements = []
    
    // Streak achievements
    const streak = calculateStreak(currentPlayer.value)
    if (streak >= 3 && !playerData.achievements.includes('streak_3')) {
      achievements.push({ id: 'streak_3', name: '3-Day Streak' })
    }
    if (streak >= 7 && !playerData.achievements.includes('streak_7')) {
      achievements.push({ id: 'streak_7', name: '1-Week Streak' })
    }
    if (streak >= 14 && !playerData.achievements.includes('streak_14')) {
      achievements.push({ id: 'streak_14', name: '2-Week Streak' })
    }
    if (streak >= 21 && !playerData.achievements.includes('streak_21')) {
      achievements.push({ id: 'streak_21', name: '3-Week Streak' })
    }
    if (streak >= 30 && !playerData.achievements.includes('streak_30')) {
      achievements.push({ id: 'streak_30', name: '30-Day Champion' })
    }
    
    // XP achievements
    if (playerData.xpPoints >= 100 && !playerData.achievements.includes('xp_100')) {
      achievements.push({ id: 'xp_100', name: 'Century Club' })
    }
    if (playerData.xpPoints >= 500 && !playerData.achievements.includes('xp_500')) {
      achievements.push({ id: 'xp_500', name: 'High Achiever' })
    }
    
    // Add new achievements
    achievements.forEach(achievement => {
      if (!playerData.achievements.includes(achievement.id)) {
        playerData.achievements.push(achievement.id)
        // Emit achievement notification
        window.dispatchEvent(new CustomEvent('achievement-unlocked', { 
          detail: achievement 
        }))
      }
    })
  }

  function checkDayCompletion() {
    const playerData = currentPlayerData.value
    const todayTodos = gameData.value.revealedDays.filter(day => day <= currentDay.value)
    const allCompleted = todayTodos.every(day => playerData.todoStatus[`day${day}`])
    
    if (allCompleted && todayTodos.length > 0) {
      playerData.xpPoints += 25 // Bonus XP for completing all daily tasks
      
      window.dispatchEvent(new CustomEvent('day-completed', {
        detail: {
          player: playerNames.value[`player${currentPlayer.value}`],
          day: currentDay.value
        }
      }))
    }
  }

  function calculateStreak(playerNum) {
    const playerData = gameData.value[`player${playerNum}`]
    if (!playerData || !challengeStartDate.value) return 0
    
    let streak = 0
    const today = dayjs()
    
    // Check backwards from yesterday
    for (let i = 1; i <= currentDay.value; i++) {
      const checkDate = today.subtract(i, 'day')
      const dateKey = checkDate.format('YYYY-MM-DD')
      
      const dayProgress = playerData.dailyCompletions[dateKey]
      if (dayProgress) {
        const startDate = dayjs(challengeStartDate.value)
        const dayNumber = Math.min(30, checkDate.diff(startDate, 'day') + 1)
        const dayTodos = gameData.value.revealedDays.filter(d => d <= dayNumber)
        const allCompleted = dayTodos.every(d => dayProgress[`day${d}`])
        
        if (allCompleted && dayTodos.length > 0) {
          streak++
        } else {
          break
        }
      } else {
        break
      }
    }
    
    // Check if today's tasks are all complete
    const todayTodos = gameData.value.revealedDays.filter(d => d <= currentDay.value)
    const todayAllComplete = todayTodos.every(d => playerData.todoStatus[`day${d}`])
    if (todayAllComplete && todayTodos.length > 0) {
      streak++
    }
    
    return streak
  }

  // Firebase methods
  function initializeFirebaseSession() {
    const saved = localStorage.getItem('healthChallengeSessionCode')
    if (saved && isSetupComplete.value) {
      sessionCode.value = saved
      connectToFirebaseSession(saved)
    }
  }

  function createFirebaseSession() {
    if (!sessionCode.value) return
    
    sessionRef.value = database.ref(`challenges/${sessionCode.value}`)
    
    const initialData = {
      gameData: gameData.value,
      playerNames: playerNames.value,
      challengeStartDate: challengeStartDate.value,
      lastUpdated: database.ServerValue.TIMESTAMP,
      createdAt: database.ServerValue.TIMESTAMP
    }
    
    sessionRef.value.set(initialData).then(() => {
      localStorage.setItem('healthChallengeSessionCode', sessionCode.value)
      listenToFirebaseSession()
    }).catch(console.error)
  }

  function connectToFirebaseSession(code) {
    sessionRef.value = database.ref(`challenges/${code}`)
    
    sessionRef.value.once('value').then((snapshot) => {
      if (snapshot.exists()) {
        isInitializing.value = true
        loadFromFirebase(snapshot.val())
        listenToFirebaseSession()
        setTimeout(() => { isInitializing.value = false }, 500)
      }
    }).catch(console.error)
  }

  function listenToFirebaseSession() {
    if (!sessionRef.value) return
    
    sessionRef.value.on('value', (snapshot) => {
      if (snapshot.exists() && !isInitializing.value) {
        loadFromFirebase(snapshot.val())
      }
    })
  }

  function syncToFirebase() {
    if (!isConnected.value || !sessionRef.value || isInitializing.value) {
      saveToLocalStorage()
      return
    }
    
    const dataToSync = {
      gameData: gameData.value,
      playerNames: playerNames.value,
      challengeStartDate: challengeStartDate.value,
      lastUpdated: database.ServerValue.TIMESTAMP
    }
    
    sessionRef.value.update(dataToSync).then(() => {
      saveToLocalStorage()
    }).catch(console.error)
  }

  function loadFromFirebase(data) {
    if (!data) return
    
    if (data.gameData) {
      gameData.value = {
        ...gameData.value,
        ...data.gameData
      }
    }
    
    playerNames.value = data.playerNames || playerNames.value
    challengeStartDate.value = data.challengeStartDate
    currentDay.value = gameData.value.currentDay || 1
    
    saveToLocalStorage()
  }

  // Local storage methods
  function saveToLocalStorage() {
    const dataToSave = {
      gameData: gameData.value,
      playerNames: playerNames.value,
      challengeStartDate: challengeStartDate.value,
      sessionCode: sessionCode.value,
      currentPlayer: currentPlayer.value
    }
    localStorage.setItem('healthChallengeData', JSON.stringify(dataToSave))
  }

  function loadFromLocalStorage() {
    const saved = localStorage.getItem('healthChallengeData')
    if (saved) {
      const parsed = JSON.parse(saved)
      gameData.value = parsed.gameData || gameData.value
      playerNames.value = parsed.playerNames || playerNames.value
      challengeStartDate.value = parsed.challengeStartDate
      sessionCode.value = parsed.sessionCode || ''
      currentPlayer.value = parsed.currentPlayer || 1
      currentDay.value = gameData.value.currentDay || 1
    }
  }

  function resetChallenge() {
    // Reset all data
    gameData.value = {
      currentDay: 1,
      revealedDays: [],
      player1: { todoStatus: {}, dailyCompletions: {}, lastActiveDate: null, achievements: [], xpPoints: 0 },
      player2: { todoStatus: {}, dailyCompletions: {}, lastActiveDate: null, achievements: [], xpPoints: 0 },
      weeklyChallenge: { completed: false, week: 1 },
      coupleChallenge: { completed: false, week: 1 }
    }
    
    playerNames.value = { player1: '', player2: '' }
    challengeStartDate.value = null
    sessionCode.value = ''
    currentDay.value = 1
    currentPlayer.value = 1
    
    // Clear Firebase session
    if (sessionRef.value) {
      sessionRef.value.remove()
      sessionRef.value = null
    }
    
    // Clear local storage
    localStorage.removeItem('healthChallengeData')
    localStorage.removeItem('healthChallengeSessionCode')
  }

  // Watch for connection status
  watch(isConnected, (connected) => {
    if (connected && sessionCode.value && !sessionRef.value) {
      connectToFirebaseSession(sessionCode.value)
    }
  })

  return {
    // State
    currentPlayer,
    currentDay,
    sessionCode,
    playerNames,
    challengeStartDate,
    gameData,
    isConnected,
    isInitializing,
    
    // Computed
    isSetupComplete,
    currentPlayerData,
    partnerPlayerData,
    currentChallenge,
    isDayRevealed,
    todayCompletionCount,
    currentStreak,
    totalCompleted,
    progressPercentage,
    
    // Actions
    initialize,
    startChallenge,
    switchPlayer,
    revealChallenge,
    toggleTodo,
    nextDay,
    previousDay,
    joinSession,
    checkDailyReset,
    syncToFirebase,
    resetChallenge,
    calculateStreak
  }
})