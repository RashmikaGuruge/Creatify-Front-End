// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

// Access the environment variable
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
console.log(apiKey);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "liverr-freelance.firebaseapp.com",
  projectId: "liverr-freelance",
  storageBucket: "liverr-freelance.appspot.com",
  messagingSenderId: "1086487734239",
  appId: "1:1086487734239:web:776cb1f6c358c5819b066a",
  measurementId: "G-0BWTB35PQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const imageDb = getStorage(app);
