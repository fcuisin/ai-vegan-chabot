export enum TONES {
  educative = "educative",
  sarcastic = "sarcastic",
  humorous = "humorous",
  motivational = "motivational",
}

export type User = {
  uid: string;
  createdAt: Date;
  email: string;
  apiKey?: string;
};
