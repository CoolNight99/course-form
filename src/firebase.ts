import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// configure Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCV2wb4ny9H_EHdpsUeFyYA_VkldCYtncc",
  authDomain: "course-form-c5a4b.firebaseapp.com",
  projectId: "course-form-c5a4b",
  storageBucket: "course-form-c5a4b.firebasestorage.app",
  messagingSenderId: "114852724417",
  appId: "1:114852724417:web:18469198c36f119b979e40",
  measurementId: "G-JFMV72M8TN",
};

// Firebase initialization
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);