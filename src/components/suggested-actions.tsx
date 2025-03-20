"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { memo } from "react";
import { useChat } from "@/context/chat-context";

const suggestedActions = [
  {
    title: "Que deviendront les animaux",
    label: "si on arrête de les manger ?",
    action: "Que deviendront les animaux si on arrête de les manger ?",
  },
  {
    title: "Le véganisme est-il approprié",
    label: `pour les sportifs ?`,
    action: `Le véganisme est-il approprié pour les sportifs ?`,
  },
  {
    title: "Ne faut-il pas boire du lait ",
    label: `pour avoir des os solides ?`,
    action: `Ne faut-il pas boire du lait pour avoir des os solides ?`,
  },
  {
    title: "Est-ce que les poissons",
    label: "ressentent la douleur ?",
    action: "Est-ce que les poissons ressentent la douleur ?",
  },
];

const SuggestedActions = () => {
  const { messages, sendMessageHandler } = useChat();

  if (messages.length > 0) return null;

  return (
    <div className="grid w-full mx-auto sm:grid-cols-2 gap-2 w-full md:max-w-3xl">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? "hidden sm:block" : "block"}
        >
          <Button
            variant="ghost"
            onClick={() => sendMessageHandler(suggestedAction.action)}
            className="cursor-pointer text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export const ChatSuggestedActions = memo(SuggestedActions);
