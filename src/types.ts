export enum TONE_OPTIONS {
  educative = "Éducatif",
  sarcastic = "Sarcastique",
  humorous = "Humoristique",
  motivational = "Motivant",
}

export type User = {
  uid: string;
  createdAt: Date;
  email: string;
  apiKey?: string;
};
