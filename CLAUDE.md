# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern Progressive Web App for couples to track 30-day health challenges together. Built with Vue 3, Pinia, Firebase, and features real-time sync, achievements system, analytics, and offline capabilities.

## Architecture

### Frontend Framework
- **Vue 3** with Composition API and `<script setup>` syntax
- **Pinia** for reactive state management
- **Vue Router** for client-side routing  
- **Vite** as build tool with HMR and optimized bundling
- **Tailwind CSS** for utility-first styling

### Backend & Data
- **Firebase Realtime Database** for real-time sync between partners
- **Firebase Hosting** for static asset delivery
- **Firebase Analytics** and **Performance** monitoring
- **Session-based sync** using 8-character codes (no authentication required)

### State Management
- **Pinia stores** (`gameStore.js`, `notificationStore.js`) for reactive state
- **Local Storage** for offline caching and persistence  
- **Firebase listeners** for real-time partner updates
- **Computed properties** for derived state (streaks, completion rates, XP)

## Key Components

### Store Architecture (`src/stores/gameStore.js`)
- **Player Management**: Switch between two players with separate progress tracking
- **Challenge System**: 30 progressive daily challenges with reveal/completion logic
- **Achievement System**: XP points, streaks, badges with automatic unlock detection
- **Firebase Sync**: Real-time bidirectional sync with offline-first approach
- **Analytics**: Progress tracking, streak calculation, completion statistics

### Component Structure
```
src/
├── components/          # Reusable UI components
│   ├── ChallengeCard.vue    # Daily challenge display with completion state
│   ├── PlayerSelector.vue   # Player switching with theme changes  
│   ├── XPDisplay.vue        # Progress indicators and achievement status
│   ├── NotificationManager.vue  # Toast notifications and alerts
│   └── PartnerStatus.vue    # Real-time partner activity updates
├── views/               # Route-level page components
│   ├── HomeView.vue         # Main challenge interface
│   ├── SetupView.vue        # Initial setup and session joining
│   ├── AnalyticsView.vue    # Progress charts and statistics
│   └── ChallengeView.vue    # Individual challenge details
├── stores/              # Pinia state management
├── services/            # External integrations (Firebase)
├── utils/               # Helper functions and animations
└── data/               # Static challenge definitions
```

### Data Flow
1. **User Action** → Pinia store mutation (e.g., `toggleTodo()`)
2. **Store Update** → Automatic Firebase sync via `syncToFirebase()`
3. **Firebase Change** → Real-time listener updates partner's store
4. **Reactive UI** → Vue components re-render based on store state
5. **Local Backup** → Changes cached to localStorage for offline access

## Commands

### Development
```bash
npm run dev          # Start Vite dev server with HMR (port 3000)
npm run build        # Production build with optimizations
npm run preview      # Preview production build locally
```

### Testing & Quality
```bash
npm run test         # Run Vitest unit tests
npm run test:ui      # Interactive test UI with coverage
npm run lint         # ESLint with Vue plugin (auto-fix enabled)
npm run format       # Prettier code formatting
```

### Firebase Operations  
```bash
npm run firebase:deploy     # Build and deploy to Firebase Hosting
npm run firebase:emulators  # Local Firebase emulator suite
firebase deploy --only database  # Deploy database rules only
firebase deploy --only hosting   # Deploy static assets only
```

## Key Features Implementation

### Real-time Partner Sync
- **Session Creation**: `gameStore.createFirebaseSession()` creates sharable session
- **Partner Joining**: `gameStore.joinSession(code)` connects to existing session  
- **Live Updates**: Firebase listeners automatically sync partner progress
- **Offline Support**: Changes cached locally and synced when reconnected

### Achievement System
- **XP Calculation**: 5 XP for revealing challenges, 10 XP per completion, 25 XP daily bonus
- **Streak Logic**: `calculateStreak()` checks consecutive daily completions
- **Badge Unlocking**: `checkAchievements()` runs after each action to award new badges
- **Celebration Events**: Custom events trigger confetti and notifications

### Theme System
- **Dynamic CSS**: Player-specific CSS classes applied to root element
- **Tailwind Integration**: Custom player1-theme/player2-theme variants
- **Component Theming**: Consistent colors across all UI components

### PWA Capabilities  
- **Service Worker**: Vite PWA plugin with Workbox for offline caching
- **App Manifest**: Full PWA manifest with icons and display settings
- **Offline Mode**: Core functionality works without internet connection
- **Install Prompt**: Native app-like installation on supported devices

## Development Workflow

### Adding New Features
1. **Store Logic**: Add reactive state and actions to appropriate Pinia store
2. **Components**: Create Vue components following existing patterns (Composition API)
3. **Firebase Sync**: Ensure new data syncs via `syncToFirebase()` calls
4. **Local Storage**: Update `saveToLocalStorage()` to include new state
5. **Testing**: Add unit tests for store logic and component behavior

### Firebase Schema
Database structure under `/challenges/{sessionCode}/`:
```javascript
{
  gameData: {
    currentDay: number,
    revealedDays: number[],
    player1: { todoStatus: {}, dailyCompletions: {}, achievements: [], xpPoints: number },
    player2: { todoStatus: {}, dailyCompletions: {}, achievements: [], xpPoints: number }
  },
  playerNames: { player1: string, player2: string },
  challengeStartDate: string,
  lastUpdated: timestamp
}
```

### Component Patterns
- Use **Composition API** with `<script setup>` syntax
- **Reactive references** from stores via `storeToRefs()`  
- **Computed properties** for derived data (avoid watchers when possible)
- **Event emission** for parent-child communication
- **Tailwind classes** for styling (avoid scoped CSS unless necessary)