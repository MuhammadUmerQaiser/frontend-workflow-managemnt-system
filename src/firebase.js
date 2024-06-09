// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDwwfySXG5TPz7DHP-TwtGdgIgqGZk-cjE",
  authDomain: "sindh-revenue-board.firebaseapp.com",
  projectId: "sindh-revenue-board",
  storageBucket: "sindh-revenue-board.appspot.com",
  messagingSenderId: "182600282982",
  appId: "1:182600282982:web:813c5c71250a8562994ea7",
  measurementId: "G-P7M9M6SBZD",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
