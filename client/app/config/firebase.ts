// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe_LM0dD-N2uFwUKKEdyN7uWB3T_sZRcs",
  authDomain: "talentful-dexa.firebaseapp.com",
  databaseURL:
    "https://talentful-dexa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "talentful-dexa",
  storageBucket: "talentful-dexa.firebasestorage.app",
  messagingSenderId: "828872879159",
  appId: "1:828872879159:web:384ef15d771bbfd4aea3b2",
  measurementId: "G-LRE7DCGKVK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseRealtimeDb = getDatabase(app);
