// Import Firebase core
import { initializeApp } from "firebase/app";

// Import Firebase services
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC12SPuuR1h42QzFNf-QIOTMMk9g73xl98",
  authDomain: "shivakumar-stores.firebaseapp.com",
  projectId: "shivakumar-stores",
  storageBucket: "shivakumar-stores.firebasestorage.app",
  messagingSenderId: "651050789626",
  appId: "1:651050789626:web:cc1c9395f84c5bc9187743",
  measurementId: "G-YV1E4FNHDQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Optional: analytics (only works on https or localhost)
export const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();