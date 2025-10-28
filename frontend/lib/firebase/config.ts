import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// Your Firebase configuration (from your Firebase console)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyC7pYKYwIGmBBK2OkjEvkiIJwW-yKI6nss',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'kubedoo-df2de.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'kubedoo-df2de',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'kubedoo-df2de.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '403890120641',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:403890120641:web:50343b823662eade107140',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-GVQKQ1S07T',
};

// Check if Firebase is properly configured
const isFirebaseConfigured =
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  !firebaseConfig.apiKey.includes('dev-api-key-here') &&
  !firebaseConfig.authDomain.includes('your-dev-project');

// Initialize Firebase only if properly configured
let app: any = null;
let auth: any = null;

if (isFirebaseConfigured) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
} else {
  console.warn('⚠️ Firebase is not properly configured. Authentication features will be disabled.');
}

// Connect to auth emulator in development (optional)
if (
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true' &&
  auth
) {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
}

export { app, auth };
