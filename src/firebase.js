// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMPPPSIoesymCvj9_s0YItULlac89nR1U",
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
