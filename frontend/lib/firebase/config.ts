import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getAnalytics, isSupported as analyticsSupported } from 'firebase/analytics';

// Your Firebase configuration
// You'll need to replace these with your actual Firebase project config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || undefined,
};

// Check if Firebase is properly configured
const isFirebaseConfigured = firebaseConfig.apiKey && 
  firebaseConfig.authDomain && 
  firebaseConfig.projectId && 
  !firebaseConfig.apiKey.includes('dev-api-key-here') &&
  !firebaseConfig.authDomain.includes('your-dev-project');

// Initialize Firebase only if properly configured
let app: any = null;
let auth: any = null;
let analytics: any = null;

if (isFirebaseConfigured) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  // Initialize analytics in browser when available
  if (typeof window !== 'undefined') {
    analyticsSupported().then((ok) => {
      if (ok) {
        analytics = getAnalytics(app);
      }
    });
  }
} else {
  console.warn('Firebase is not properly configured. Authentication features will be disabled.');
}

// Connect to auth emulator in development
if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true' && auth) {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
}

export { app, auth, analytics };