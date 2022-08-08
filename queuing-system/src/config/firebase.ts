// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUio5D0YE5xvS_0xKzpD8YFjPtX-vtiPM",
  authDomain: "queuing-system-5fe4f.firebaseapp.com",
  projectId: "queuing-system-5fe4f",
  storageBucket: "queuing-system-5fe4f.appspot.com",
  messagingSenderId: "151860949140",
  appId: "1:151860949140:web:07f998edca7c3280b30481",
  measurementId: "G-2G8YCZC6RB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);