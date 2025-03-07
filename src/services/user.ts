import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateDoc(doc(db, "users", user.uid), {
      lastLogin: serverTimestamp(),
    });

    return user;
  } catch (error: unknown) {
    console.error("Erreur lors de la connexion:", error);
    throw new Error("Erreur lors de la connexion. Veuillez rééassayer !");
  }
};
