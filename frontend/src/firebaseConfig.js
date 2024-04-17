// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Configuration object containing Firebase API keys and other credentials
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase app with the provided configuration
const fb = initializeApp(firebaseConfig);

// Get Firebase services instances (Auth, Firestore, Analytics)
const auth = getAuth(fb);
const db = getFirestore(fb);
const analytics = getAnalytics(fb);

// Initialize Firebase App Check for production environment only
let appCheck;
if (process.env.REACT_APP_ENV !== "development") {
  appCheck = initializeAppCheck(fb, {
    provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHA_SITE_KEY),
    isTokenAutoRefreshEnabled: true,
  });
}

// Export Firebase instances for use in other parts of the application
export { fb, auth, db, appCheck, analytics };
