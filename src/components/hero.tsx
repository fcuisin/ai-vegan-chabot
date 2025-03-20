import { useChat } from "@/context/chat-context";
import { Leaf } from "lucide-react";

const Hero = () => {
  const { messages } = useChat();

  if (messages.length > 0) return null;

  return (
    <div className="flex flex-col items-center text-center px-6 md:px-0">
      <div className="rounded-full bg-primary/10 p-3 mb-2">
        <Leaf className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
        Discutez, apprenez, répondez.
      </h1>
      <p className="max-w-[42rem] text-muted-foreground md:text-lg mb-4">
        Une plateforme pour générer des réponses claires et factuelles aux
        critiques et idées reçues courantes sur le véganisme.
      </p>
    </div>
  );
};

export default Hero;
