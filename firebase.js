// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCyxFqF-3FflU6tDfvKmk9T74jibJQe40g",
    authDomain: "webtrendgagan.firebaseapp.com",
    projectId: "webtrendgagan",
    storageBucket: "webtrendgagan.firebasestorage.app",
    messagingSenderId: "944668819597",
    appId: "1:944668819597:web:75f8c8786857c1367422c4"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, collection, addDoc, onSnapshot };
