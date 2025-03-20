import { generateOpenAiResponse } from "@/lib/openai";
import { TONES } from "@/types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";

export interface Message {
  content: string;
  isBot: boolean;
  sources?: string[];
}

interface ChatContextType {
  messages: Message[];
  tone: TONES;
  isTyping: boolean;
  setMessages: (messages: Message[]) => void;
  setTone: (tone: TONES) => void;
  sendMessageHandler: (message: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [tone, setTone] = useState<TONES | null>();
  const [useCount, setUseCount] = useState<number>(0);

  const sendMessageHandler = useCallback(
    async (message: string) => {
      if (!message || message.trim() === "") return;

      const messageToAdd: Message = { content: message, isBot: false };
      setMessages((prev) => [...prev, messageToAdd]);

      setIsTyping(true);

      try {
        const botResponse = await generateOpenAiResponse(message, tone);
        setMessages((prev) => [
          ...prev,
          {
            content: botResponse.text,
            isBot: true,
            sources: botResponse.sources,
          },
        ]);
        setUseCount(useCount + 1);
      } catch (error: unknown) {
        setMessages((prev) => [
          ...prev,
          {
            content: `Désolé, une erreur s'est produite lors de la génération de la réponse: ${
              error instanceof Error ? error.message : "Erreur inconnue"
            }`,
            isBot: true,
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [tone, useCount]
  );

  const value = useMemo(
    () => ({
      messages,
      tone,
      isTyping,
      setMessages,
      setTone,
      sendMessageHandler,
    }),
    [messages, isTyping, tone, sendMessageHandler]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
