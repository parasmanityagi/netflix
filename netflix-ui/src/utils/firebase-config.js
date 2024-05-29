// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA8gu-ru_UX44dSCgUxaR-44HwtWIPPbBU",
  authDomain: "react-netflix-clone-38d49.firebaseapp.com",
  projectId: "react-netflix-clone-38d49",
  storageBucket: "react-netflix-clone-38d49.appspot.com",
  messagingSenderId: "386473253196",
  appId: "1:386473253196:web:1a61ef3de6eab9976dd7e9",
  measurementId: "G-QFKWLC49PZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);