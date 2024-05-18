// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvbY2D3C6AK7QVLBVL8Ak8y0-M2DeZD4g",
  authDomain: "fitify-reactnative.firebaseapp.com",
  projectId: "fitify-reactnative",
  storageBucket: "fitify-reactnative.appspot.com",
  messagingSenderId: "646812429477",
  appId: "1:646812429477:web:f21b427ad67be3ff7c714c"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);