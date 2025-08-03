# Firebase Setup Instructions

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Choose a project name (e.g., "couples-health-challenge")
4. Disable Google Analytics (optional for this project)
5. Click "Create project"

## 2. Enable Firebase Services

### Enable Realtime Database
1. In your project dashboard, click "Realtime Database" in the left sidebar
2. Click "Create Database"
3. Choose "Start in test mode" for now (we'll update security rules later)
4. Select a location close to your users

### Enable Firebase Hosting
1. Click "Hosting" in the left sidebar
2. Click "Get started"
3. Follow the setup steps (we'll configure this via CLI)

## 3. Get Firebase Configuration

1. Go to Project Settings (gear icon in sidebar)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (`</>`)
4. Give your app a nickname (e.g., "Health Challenge Web App")
5. Check "Also set up Firebase Hosting"
6. Click "Register app"
7. Copy the `firebaseConfig` object

## 4. Update Configuration in Code

Replace the placeholder config in `index.html` (around line 718) with your actual config:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com/",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};
```

## 5. Install Firebase CLI and Deploy

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project directory
firebase init

# When prompted:
# - Select "Database" and "Hosting"
# - Choose your project
# - Accept default database rules file (database.rules.json)
# - Set public directory to "." (current directory)
# - Configure as single-page app: Yes
# - Set up automatic builds and deploys with GitHub: No (for now)

# Update .firebaserc with your project ID
# Edit .firebaserc and replace "your-project-id" with your actual project ID

# Deploy to Firebase
firebase deploy
```

## 6. Update Database Security Rules

After testing, update your database rules for better security:

```json
{
  "rules": {
    "challenges": {
      "$sessionCode": {
        ".read": true,
        ".write": true,
        ".validate": "$sessionCode.length >= 8 && $sessionCode.length <= 8 && $sessionCode.matches(/^[A-Z0-9]+$/)"
      }
    }
  }
}
```

Then deploy the rules:
```bash
firebase deploy --only database
```

## 7. Test Your Deployment

1. Visit your Firebase Hosting URL (shown after deployment)
2. Create a challenge and note the session code
3. Open the same URL on another device/browser
4. Use "Join Partner's Challenge" and enter the session code
5. Test real-time sync by checking/unchecking habits on both devices

## Troubleshooting

### Common Issues:

1. **"Permission denied" errors**: Check that your database rules allow read/write access
2. **Connection issues**: Verify your Firebase config is correct
3. **Session not found**: Ensure both devices are using the same session code
4. **Deployment fails**: Check that you're in the correct directory and have proper permissions

### Debug Steps:

1. Open browser developer tools (F12)
2. Check the Console tab for error messages
3. Check the Network tab to see if Firebase requests are successful
4. Verify your Firebase project is active and billing is set up if needed

## Firebase Usage Costs

This app uses Firebase's free tier efficiently:
- **Realtime Database**: Very minimal data per session (well under free limits)
- **Hosting**: Static files with minimal bandwidth usage
- **No authentication required**: Reduces complexity and costs

The free tier should handle hundreds of concurrent couples easily.

## Production Considerations

1. **Custom Domain**: Set up a custom domain in Firebase Hosting settings
2. **Analytics**: Add Firebase Analytics if you want usage insights
3. **Performance Monitoring**: Enable Firebase Performance Monitoring
4. **Error Reporting**: Add Firebase Crashlytics for error tracking
5. **Backup Strategy**: Firebase automatically backs up Realtime Database data

## Security Notes

- No authentication required makes it easy to use but means anyone with a session code can access that challenge
- Session codes are 8 characters (36^8 = 2.8 trillion possibilities) making them hard to guess
- Data is not sensitive (just health habit completions)
- Consider adding optional user authentication for enhanced security if needed