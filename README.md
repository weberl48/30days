# 🏃‍♂️💑 Couples Health Challenge

A modern, progressive web application for couples to build healthy habits together over 30 days. Built with Vue 3, Firebase, and packed with advanced features like real-time sync, analytics, achievements, and smart notifications.

## ✨ Features

### 🚀 Core Features
- **30-Day Progressive Challenge**: Carefully designed daily health habits that build on each other
- **Real-time Sync**: Partner progress updates instantly across all devices
- **Dual Player System**: Separate tracking and themes for each partner
- **Offline-First**: Works without internet, syncs when connected
- **Progressive Web App**: Install on any device, works like a native app

### 🎯 Advanced Features
- **XP & Leveling System**: Earn experience points and level up
- **Achievement System**: Unlock badges for milestones and consistency
- **Smart Analytics**: Detailed progress tracking with beautiful charts
- **Streak Tracking**: Visual streak counters with celebration animations
- **Push Notifications**: Customizable reminders and partner activity alerts
- **Photo Sharing**: Share progress photos and healthy meals
- **Social Features**: Leaderboards and couple challenges

### 🎨 User Experience
- **Beautiful Animations**: Lottie animations and confetti celebrations
- **Responsive Design**: Perfect on mobile, tablet, and desktop
- **Theme System**: Dynamic themes that change based on active player
- **Accessibility**: Full keyboard navigation and screen reader support
- **Dark Mode**: Automatic dark mode support

## 🛠️ Tech Stack

### Frontend
- **Vue 3** - Composition API with `<script setup>`
- **Pinia** - Modern state management
- **Vue Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type safety (optional)

### Libraries & Integrations
- **Chart.js** - Beautiful, responsive charts
- **Lottie-web** - High-quality animations
- **Day.js** - Lightweight date manipulation
- **AOS** - Animate on scroll
- **Canvas Confetti** - Celebration effects
- **Push.js** - Web push notifications
- **Workbox** - Advanced PWA capabilities

### Backend & Infrastructure
- **Firebase Realtime Database** - Real-time data sync
- **Firebase Hosting** - Fast, secure hosting
- **Firebase Analytics** - Usage insights
- **Firebase Performance** - Performance monitoring

### Development Tools
- **Vite** - Lightning-fast build tool
- **Vitest** - Unit testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/couples-health-challenge.git
   cd couples-health-challenge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase** (see [Firebase Setup](#firebase-setup))

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Deploy to Firebase**
   ```bash
   npm run firebase:deploy
   ```

## 🔥 Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Realtime Database and Hosting

2. **Configure Authentication** (optional)
   - Enable Anonymous authentication for enhanced features

3. **Update Configuration**
   - Copy your Firebase config from Project Settings
   - Update `src/services/firebase.js` with your config

4. **Deploy Database Rules**
   ```bash
   firebase deploy --only database
   ```

5. **Deploy Hosting**
   ```bash
   firebase deploy --only hosting
   ```

## 📱 Usage

### Starting a Challenge
1. Open the app and click "Start New Challenge"
2. Enter both partner names
3. Begin with Day 1 - making your bed!
4. Share the session code with your partner

### Joining a Partner
1. Click "Join Partner's Challenge"
2. Enter the 8-character session code
3. Your progress will sync in real-time

### Daily Workflow
1. **Morning**: Check today's challenge and mark habits complete
2. **Throughout Day**: Track progress and see partner updates
3. **Evening**: Review analytics and plan for tomorrow

## 🏗️ Architecture

### State Management
- **Pinia stores** for reactive state management
- **Firebase Realtime Database** for persistence and sync
- **Local Storage** for offline caching

### Component Structure
```
src/
├── components/          # Reusable UI components
├── views/              # Page-level components
├── stores/             # Pinia state stores
├── services/           # External service integrations
├── utils/              # Helper functions and utilities
├── data/               # Static data and configurations
└── styles/             # Global styles and themes
```

### Data Flow
1. User interactions update Pinia store
2. Store automatically syncs to Firebase
3. Firebase pushes updates to all connected clients
4. Local storage provides offline backup

## 🎯 Challenges Overview

The app includes 30 carefully designed challenges that progress from simple habits to more complex lifestyle changes:

- **Week 1**: Foundation building (bed making, gratitude, hydration)
- **Week 2**: Physical activity and mindfulness
- **Week 3**: Advanced habits and social connections
- **Week 4**: Challenge yourself and lifestyle transformation

Each challenge includes:
- Clear instructions and tips
- Estimated time commitment
- XP rewards based on difficulty
- Category tags for organization

## 📊 Analytics & Insights

### Personal Analytics
- Daily completion rates
- Streak tracking and milestones
- XP progression and leveling
- Category breakdown of completed challenges

### Partner Comparison
- Side-by-side progress comparison
- Shared achievements and milestones
- Couple challenge completion
- Mutual motivation metrics

### Advanced Metrics
- Habit consistency patterns
- Peak performance times
- Challenge difficulty preferences
- Long-term trend analysis

## 🏆 Achievement System

### Individual Achievements
- **Streak Master**: 3, 7, 14, 21, 30-day streaks
- **XP Milestones**: 100, 500, 1000+ XP points
- **Category Expert**: Complete all challenges in a category
- **Early Bird**: Complete challenges before 9 AM

### Couple Achievements
- **Perfect Sync**: Both partners complete same day
- **Support System**: Help partner during difficult challenges
- **Challenge Champions**: Complete all weekly couple challenges
- **Transformation Team**: Complete the full 30-day journey

## 🔔 Notification System

### Smart Reminders
- Customizable daily reminder times
- Streak milestone celebrations
- Partner activity notifications
- Weekly challenge alerts

### Notification Types
- **Daily Habits**: "Time to check your healthy habits!"
- **Partner Activity**: "Sarah just completed today's challenge!"
- **Achievements**: "🎉 Achievement Unlocked: 7-Day Streak!"
- **Encouragement**: "You're doing great! Keep it up!"

## 🌐 PWA Features

### Installation
- Install prompt on supported devices
- Works offline with cached data
- App-like experience on mobile and desktop

### Offline Capabilities
- View all unlocked challenges offline
- Mark habits complete without internet
- Automatic sync when connection restored
- Cached images and animations

### Performance
- Service worker for fast loading
- Image optimization and lazy loading
- Code splitting for optimal bundle size
- CDN delivery for global performance

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Performance Testing
```bash
npm run test:perf
```

## 🚀 Deployment

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Other Platforms
The app can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

### Code Style
- Use ESLint and Prettier for formatting
- Follow Vue 3 Composition API patterns
- Write meaningful commit messages
- Add JSDoc comments for complex functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Firebase** for excellent real-time database and hosting
- **Vue.js** team for the amazing framework
- **Tailwind CSS** for beautiful utility-first styling
- **Chart.js** for stunning data visualizations
- **Lottie** for delightful animations

## 📞 Support

- 📧 Email: support@healthchallenge.app
- 💬 Discord: [Join our community](https://discord.gg/healthchallenge)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/couples-health-challenge/issues)
- 📚 Docs: [Full Documentation](https://docs.healthchallenge.app)

---

**Built with ❤️ for couples who want to grow healthier together**

Start your journey today at [https://days-5850a.web.app](https://days-5850a.web.app)