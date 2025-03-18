import { Message } from "@/context/chat-context";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Leaf } from "lucide-react";

const PreviewMessage = ({ message }: Readonly<{ message: Message }>) => {
  return (
    <AnimatePresence>
      <motion.div
        className="w-full mx-auto max-w-3xl px-4 group/message"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-bot={message.isBot}
      >
        <div className="flex gap-4 w-full group-data-[bot=false]/message:ml-auto group-data-[bot=false]/message:max-w-2xl group-data-[bot=false]/message:w-fit">
          {message.isBot && (
            <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-background">
              <div className="translate-y-px">
                <Leaf className="h-4 w-4 text-primary" />
              </div>
            </div>
          )}

          <div
            className={cn("flex flex-col gap-4", {
              "bg-primary text-primary-foreground px-3 py-2 rounded-xl":
                !message.isBot,
            })}
          >
            <p>{message.content}</p>
          </div>

          {message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-primary/10 text-xs text-muted-foreground">
              <p className="font-medium mb-1">Sources:</p>
              <ul className="list-disc pl-4 space-y-1">
                {message.sources.map((source, index) => (
                  <li key={index}>
                    <a
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-primary"
                    >
                      {source.replace(/^https?:\/\//, "").split("/")[0]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PreviewMessage;
