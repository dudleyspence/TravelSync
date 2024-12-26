// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtfErY8DoZG_9FJow5vmG9KnyEJUYGytQ",
  authDomain: "travelsync-extended.firebaseapp.com",
  projectId: "travelsync-extended",
  storageBucket: "travelsync-extended.appspot.com",
  messagingSenderId: "453150346257",
  appId: "1:453150346257:web:ebd4c0c78bf178f4fc35b0",
  measurementId: "G-8WH6EQW83M",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
