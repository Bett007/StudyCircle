import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE-oQOGJAuxkqiBCDLeOfNvIjxTHzoi9Y",
  authDomain: "react-comments-app-10970.firebaseapp.com",
  projectId: "react-comments-app-10970",
  storageBucket: "react-comments-app-10970.firebasestorage.app",
  messagingSenderId: "363036274262",
  appId: "1:363036274262:web:03e55e59468a96700595f7",
  measurementId: "G-LE87XMHPVW",
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);