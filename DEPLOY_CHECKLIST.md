# Firebase Deployment Checklist for days-5850a

## ✅ Configuration Complete
- Firebase project ID: `days-5850a`
- Web app configured with correct API keys
- Hosting site: `days-5850a.web.app` and `days-5850a.firebaseapp.com`

## 📋 Pre-deployment Checklist

### 1. Verify Realtime Database is Enabled
- [ ] Go to [Realtime Database](https://console.firebase.google.com/project/days-5850a/database)
- [ ] If not created, click "Create Database"
- [ ] Choose location closest to your users
- [ ] Start in test mode (we have proper rules configured)

### 2. Deploy Commands

```bash
# Deploy everything (database rules + hosting)
firebase deploy

# OR deploy separately:
firebase deploy --only database   # Deploy database rules first
firebase deploy --only hosting    # Then deploy the website
```

### 3. Post-deployment Testing

After deployment, your app will be available at:
- Primary: https://days-5850a.web.app
- Alternative: https://days-5850a.firebaseapp.com

#### Test Real-time Sync:
1. Open the app on Device/Browser 1
2. Create a new challenge (enter partner names)
3. Note the 8-character session code
4. Open the app on Device/Browser 2
5. Click "Join Partner's Challenge"
6. Enter the session code
7. Check a habit on one device - it should instantly appear on the other

#### Test Features:
- [ ] Challenge reveal works
- [ ] Daily habits can be checked/unchecked
- [ ] Partner's progress shows in real-time
- [ ] Streak calculation works
- [ ] Theme changes when switching players
- [ ] Offline mode works (disconnect internet, make changes, reconnect)

## 🚀 Ready to Deploy!

Your app is fully configured and ready for deployment. The Firebase configuration is correct, and all features should work as expected.

## 📱 Share with Your Partner

Once deployed, share:
1. The app URL: `https://days-5850a.web.app`
2. Your session code (shown in the app)

Both of you can track your 30-day health challenge together with real-time synchronization!