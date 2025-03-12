import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

const dataConverter = {
  toFirestore<T>(value: WithFieldValue<T>) {
    return value;
  },
  fromFirestore<T>(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
    } as T;
  },
};

const firebaseConfig = {
  apiKey: "AIzaSyAUgs4XOtY2NFJor7S9qPNVqi6vAOiHwrU",
  authDomain: "ai-vegan-chatbot.firebaseapp.com",
  projectId: "ai-vegan-chatbot",
  storageBucket: "ai-vegan-chatbot.firebasestorage.app",
  messagingSenderId: "523072120100",
  appId: "1:523072120100:web:71713c40a41a450b8ebfb1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, dataConverter };
