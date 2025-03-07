import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAUgs4XOtY2NFJor7S9qPNVqi6vAOiHwrU",
  authDomain: "ai-vegan-chatbot.firebaseapp.com",
  projectId: "ai-vegan-chatbot",
  storageBucket: "ai-vegan-chatbot.firebasestorage.app",
  messagingSenderId: "523072120100",
  appId: "1:523072120100:web:71713c40a41a450b8ebfb1",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
