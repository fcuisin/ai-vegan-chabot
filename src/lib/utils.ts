import CryptoJS from "crypto-js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ENCRYPTION_KEY = "VegaBot_Secure_Key_2025";

export const TONE_OPTIONS = {
  educative: "Éducatif",
  sarcastic: "Sarcastique",
  humorous: "Humoristique",
  motivational: "Motivant",
};

export const encryptText = (text: string, userSalt: string): string => {
  const combinedKey = `${ENCRYPTION_KEY}_${userSalt}`;
  return CryptoJS.AES.encrypt(text, combinedKey).toString();
};

export const decryptText = (
  encryptedText: string,
  userSalt: string
): string => {
  const combinedKey = `${ENCRYPTION_KEY}_${userSalt}`;
  const bytes = CryptoJS.AES.decrypt(encryptedText, combinedKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
