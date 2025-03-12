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
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PreviewMessage;
