// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_CONFIG_API_KEY,
  authDomain: "trip-planner-201ec.firebaseapp.com",
  projectId: "trip-planner-201ec",
  storageBucket: "trip-planner-201ec.firebasestorage.app",
  messagingSenderId: "651377173875",
  appId: "1:651377173875:web:3d8b9b99ccef2a6a7b9106",
  measurementId: "G-DRLWR777SD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);