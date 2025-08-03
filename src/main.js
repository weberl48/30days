import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { initializeFirebase } from './services/firebase'
import { registerSW } from 'virtual:pwa-register'
import AOS from 'aos'
import FloatingVue from 'floating-vue'

// Import styles
import './styles/main.css'
import 'aos/dist/aos.css'
import 'floating-vue/dist/style.css'

// Initialize Firebase
initializeFirebase()

// Register Service Worker
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New version available! Reload to update?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('App is ready to work offline')
  }
})

// Initialize AOS animations
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
})

// Create Vue app
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(FloatingVue)

// Global error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err, info)
  // You could send this to an error tracking service
}

app.mount('#app')

// Request notification permission
if ('Notification' in window && 'serviceWorker' in navigator) {
  Notification.requestPermission()
}