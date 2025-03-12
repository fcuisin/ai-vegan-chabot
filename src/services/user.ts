import { auth, dataConverter, db } from "@/lib/firebase";
import { User } from "@/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const getUserById = async (userId: string) => {
  const user = await getDoc(
    doc(db, "posts", userId).withConverter<User>(dataConverter)
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
    throw new Error("Erreur lors de la connexion. Veuillez rééassayer !");
  }
};
