import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TONE_OPTIONS = {
  educative: "Éducatif",
  sarcastic: "Sarcastique",
  humorous: "Humoristique",
  motivational: "Motivant",
};
