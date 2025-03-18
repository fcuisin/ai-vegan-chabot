import { TONES } from "@/types";
import { TONE_OPTIONS } from "./utils";

interface OpenAIResponse {
  text: string;
  sources?: string[];
}

const toneInstructions: Record<keyof typeof TONES, string> = {
  educative:
    "Adopte un ton pédagogique et informatif. Explique clairement les concepts avec des faits précis.",
  sarcastic:
    "Adopte un ton sarcastique. Utilise l'ironie et le sarcasme pour faire passer ton message, tout en restant informatif.",
  humorous:
    "Adopte un ton humoristique et léger. Utilise des jeux de mots et un ton amusant, tout en transmettant les informations importantes.",
  motivational:
    "Adopte un ton motivant et inspirant. Sois encourageant et positif, en mettant l'accent sur l'impact des choix individuels.",
};

export const generateOpenAiResponse = async (
  message: string,
  tone = TONES.educative
): Promise<OpenAIResponse> => {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("Clé API manquante");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              `Tu es VegaBot, un assistant spécialisé sur le véganisme. ` +
              `Tu fournis des informations factuelles, claires et sourcées sur le véganisme, les droits des animaux, ` +
              `la nutrition végétale, et l'impact environnemental de nos choix alimentaires. ` +
              `${toneInstructions[tone]} ` +
              `Réponds toujours en français avec le ton suivant : ${TONE_OPTIONS[tone]}. ` +
              `La réponse ne devra pas exéder 6 phrases.`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || "Erreur lors de la communication avec l'API"
      );
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    console.log(content);

    let sources: string[] = [];
    const sourcesMatch = content.match(/Sources?:?\s*\n((?:.+\n?)+)/i);

    if (sourcesMatch?.[1]) {
      const sourceText = sourcesMatch[1];
      sources = sourceText
        .split(/\n/)
        .map((line) => line.trim())
        .filter((line) => line.startsWith("http") || line.startsWith("www."))
        .map((line) => {
          if (line.startsWith("www.")) return "https://" + line;
          return line;
        });
    }

    let cleanContent = content;
    if (sourcesMatch) {
      cleanContent = content.replace(sourcesMatch[0], "").trim();
    }

    return {
      text: cleanContent,
      sources: sources.length > 0 ? sources : undefined,
    };
  } catch (error: unknown) {
    return {
      text: `Erreur: ${
        error instanceof Error
          ? error.message
          : "Une erreur s'est produite lors de la communication avec ChatGPT"
      }`,
    };
  }
};
