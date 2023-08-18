// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD42tSUCEFVMYM53k3GsyJUVtwgUfO_E98",
  authDomain: "cityhospital1.firebaseapp.com",
  projectId: "cityhospital1",
  storageBucket: "cityhospital1.appspot.com",
  messagingSenderId: "689176507114",
  appId: "1:689176507114:web:c67f8366fa00178b759d93",
  measurementId: "G-FF76H21MH6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);