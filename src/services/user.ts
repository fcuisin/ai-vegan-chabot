import { auth, dataConverter, db } from "@/lib/firebase";
import { User } from "@/types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const getUserById = async (userId: string) => {
  const user = await getDoc(
    doc(db, "users", userId).withConverter<User>(dataConverter)
  );

  if (!user.exists()) {
    return null;
  }

  return user.data();
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = await getUserById(userCredential.user.uid);

    return user;
  } catch (error: unknown) {
    console.error("Erreur lors de la connexion:", error);
    throw new Error("Erreur lors de la connexion. Veuillez réessayer !");
  }
};

export const signupUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log(userCredential);

    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: userCredential.user.email,
      createdAt: new Date(),
    });

    const user = await getUserById(userCredential.user.uid);

    console.log(user);

    return user;
  } catch (error: unknown) {
    console.error("Erreur lors de l'inscription:", error);
    throw new Error("Erreur lors de l'inscription. Veuillez réessayer !");
  }
};
