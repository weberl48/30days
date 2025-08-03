import { createRouter, createWebHistory } from 'vue-router'
import { useGameStore } from '../stores/gameStore'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresSetup: false }
  },
  {
    path: '/setup',
    name: 'Setup',
    component: () => import('../views/SetupView.vue')
  },
  {
    path: '/challenge',
    name: 'Challenge',
    component: () => import('../views/ChallengeView.vue'),
    meta: { requiresSetup: true }
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('../views/AnalyticsView.vue'),
    meta: { requiresSetup: true }
  },
  {
    path: '/social',
    name: 'Social',
    component: () => import('../views/SocialView.vue'),
    meta: { requiresSetup: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/SettingsView.vue'),
    meta: { requiresSetup: true }
  },
  {
    path: '/join/:sessionCode?',
    name: 'Join',
    component: () => import('../views/JoinView.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const gameStore = useGameStore()
  
  if (to.meta.requiresSetup && !gameStore.isSetupComplete) {
    next('/setup')
  } else if (to.name === 'Setup' && gameStore.isSetupComplete) {
    next('/challenge')
  } else {
    next()
  }
})

export default router