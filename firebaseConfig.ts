// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiehGluJkVs_i_mEs4Qetdt5HgOOI7Qa0",
  authDomain: "test-hitrecord-app.firebaseapp.com",
  projectId: "test-hitrecord-app",
  storageBucket: "test-hitrecord-app.firebasestorage.app",
  messagingSenderId: "915946659527",
  appId: "1:915946659527:web:7712bcd13fbcce9436a8e2",
  measurementId: "G-MP1NQHTDWQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);