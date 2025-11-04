// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfkfKW3oDgeiKdDFmKs8Rqo8T9WVXrKrk",
  authDomain: "chattingapp-1d0d9.firebaseapp.com",
  projectId: "chattingapp-1d0d9",
  storageBucket: "chattingapp-1d0d9.firebasestorage.app",
  messagingSenderId: "645263954797",
  appId: "1:645263954797:web:a4b0e90ac933ab87290064",
  measurementId: "G-5EMW7K02BK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
let auth = getAuth();
export{app, auth}

