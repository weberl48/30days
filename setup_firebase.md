# Complete Firebase Setup for days-5850a

## Step 1: Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/project/days-5850a)
2. Click the gear icon (⚙️) in the left sidebar → **Project settings**
3. Scroll down to **Your apps** section
4. If you don't see a web app, click **Add app** → Web (`</>` icon)
5. Register the app with nickname "Health Challenge"
6. Copy the `firebaseConfig` object values

## Step 2: Enable Required Services

### Enable Realtime Database:
1. In Firebase Console, go to **Realtime Database** in left sidebar
2. Click **Create Database**
3. Choose **Start in test mode** (we'll update rules after)
4. Select your preferred location (choose closest to users)

### Enable Hosting:
1. Go to **Hosting** in left sidebar  
2. Click **Get started**
3. No need to install CLI again since you have it

## Step 3: Update Configuration in Code

Replace the placeholder values in `index.html` (around line 718-726) with your actual values from step 1:

```javascript
const firebaseConfig = {
    apiKey: "AIza...", // Copy from Firebase Console
    authDomain: "days-5850a.firebaseapp.com",
    databaseURL: "https://days-5850a-default-rtdb.firebaseio.com/",
    projectId: "days-5850a",
    storageBucket: "days-5850a.appspot.com",
    messagingSenderId: "123456789", // Copy from Firebase Console
    appId: "1:123:web:abc123" // Copy from Firebase Console
};
```

## Step 4: Deploy Everything

Run these commands in your project directory:

```bash
# Deploy database rules and hosting together
firebase deploy

# OR deploy separately:
firebase deploy --only database  # Deploy database rules
firebase deploy --only hosting   # Deploy website
```

## Step 5: Test Your App

1. After deployment, Firebase will show your hosting URL (like `https://days-5850a.web.app`)
2. Open the URL in browser
3. Create a challenge and note the session code
4. Open the same URL on another device/browser
5. Use "Join Partner's Challenge" to test real-time sync

## Troubleshooting Node.js Version Issue

If you get a Node.js version error with Firebase CLI:

```bash
# Check current Node version
node --version

# If you need to upgrade Node.js:
# Option 1: Download from nodejs.org and install latest LTS
# Option 2: Use node version manager (if installed)
nvm install --lts
nvm use --lts

# Then retry Firebase commands
firebase --version
firebase deploy
```

## Quick Test Commands

```bash
# Check if everything is configured correctly
firebase projects:list
firebase use days-5850a

# Test database rules
firebase database:rules:get

# Check hosting status  
firebase hosting:sites:list
```

Once you complete Step 3 (updating the config in index.html), you should be able to run `firebase deploy` successfully!