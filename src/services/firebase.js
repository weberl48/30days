import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, off, set, update, remove, serverTimestamp } from 'firebase/database'
import { getAnalytics } from 'firebase/analytics'
import { getPerformance } from 'firebase/performance'

// Firebase configuration (using existing config from original app)
const firebaseConfig = {
  apiKey: "AIzaSyBn5EgymjkRpfbUFIPB8Rz778-FB3BV_Ns",
  authDomain: "days-5850a.firebaseapp.com",
  databaseURL: "https://days-5850a-default-rtdb.firebaseio.com",
  projectId: "days-5850a",
  storageBucket: "days-5850a.firebasestorage.app",
  messagingSenderId: "1071625366378",
  appId: "1:1071625366378:web:0cea0c8f122e605a3bd313"
}

// Initialize Firebase
let app
let database
let analytics

export function initializeFirebase() {
  try {
    app = initializeApp(firebaseConfig)
    database = getDatabase(app)
    
    // Initialize analytics in production
    if (import.meta.env.PROD) {
      analytics = getAnalytics(app)
      getPerformance(app)
    }
    
    console.log('Firebase initialized successfully')
    return true
  } catch (error) {
    console.error('Firebase initialization error:', error)
    return false
  }
}

// Connection status monitoring
export function monitorConnection(callback) {
  const connectedRef = ref(database, '.info/connected')
  
  const unsubscribe = onValue(connectedRef, (snapshot) => {
    const connected = snapshot.val() === true
    callback(connected)
  })
  
  return unsubscribe
}

// Database operations
export function createSession(sessionCode, data) {
  const sessionRef = ref(database, `challenges/${sessionCode}`)
  return set(sessionRef, {
    ...data,
    createdAt: serverTimestamp(),
    lastUpdated: serverTimestamp()
  })
}

export function updateSession(sessionCode, data) {
  const sessionRef = ref(database, `challenges/${sessionCode}`)
  return update(sessionRef, {
    ...data,
    lastUpdated: serverTimestamp()
  })
}

export function deleteSession(sessionCode) {
  const sessionRef = ref(database, `challenges/${sessionCode}`)
  return remove(sessionRef)
}

export function subscribeToSession(sessionCode, callback) {
  const sessionRef = ref(database, `challenges/${sessionCode}`)
  
  const unsubscribe = onValue(sessionRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val())
    } else {
      callback(null)
    }
  }, (error) => {
    console.error('Firebase subscription error:', error)
    callback(null)
  })
  
  return unsubscribe
}

export function unsubscribeFromSession(sessionCode, callback) {
  const sessionRef = ref(database, `challenges/${sessionCode}`)
  off(sessionRef, 'value', callback)
}

// Analytics events
export function trackEvent(eventName, parameters = {}) {
  if (analytics && import.meta.env.PROD) {
    import('firebase/analytics').then(({ logEvent }) => {
      logEvent(analytics, eventName, parameters)
    })
  }
}

// Common analytics events
export const AnalyticsEvents = {
  CHALLENGE_STARTED: 'challenge_started',
  DAY_COMPLETED: 'day_completed',
  STREAK_ACHIEVED: 'streak_achieved',
  PARTNER_JOINED: 'partner_joined',
  ACHIEVEMENT_UNLOCKED: 'achievement_unlocked',
  WEEKLY_CHALLENGE_COMPLETED: 'weekly_challenge_completed'
}

// Export database instance for direct use
export { database, serverTimestamp }