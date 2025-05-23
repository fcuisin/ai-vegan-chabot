import { Leaf } from "lucide-react";

import { motion } from "framer-motion";
import { useChat } from "@/context/chat-context";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { cn } from "@/lib/utils";
import Hero from "./hero";
import PreviewMessage from "./message";

const WaitingMessage = () => {
  return (
    <motion.div
      className="w-full mx-auto max-w-3xl px-4 group/message "
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
    >
      <div
        className={cn(
          "flex gap-4 group-data-[bot=false]/message:px-3 w-full group-data-[bot=false]/message:w-fit group-data-[bot=false]/message:ml-auto group-data-[bot=false]/message:max-w-2xl group-data-[bot=false]/message:py-2 rounded-xl",
          {
            "group-data-[bot=false]/message:bg-muted": true,
          }
        )}
      >
        <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
          <Leaf size={14} />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-4 text-muted-foreground">
            Thinking...
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Messages = () => {
  const { messages, isTyping } = useChat();
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  return (
    <div
      ref={messagesContainerRef}
      className={`flex flex-col ${
        messages.length === 0 ? "justify-center" : ""
      } min-w-0 gap-6 flex-1 overflow-y-scroll pt-4`}
    >
      {messages.length === 0 && <Hero />}
      {messages.map((message, index) => (
        <PreviewMessage key={index} message={message} />
      ))}
      {isTyping &&
        messages.length > 0 &&
        !messages[messages.length - 1].isBot && <WaitingMessage />}
      <div
        ref={messagesEndRef}
        className="shrink-0 min-w-[24px] min-h-[24px]"
      />
    </div>
  );
};

export default Messages;
