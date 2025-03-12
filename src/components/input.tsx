import { useChat } from "@/context/chat-context";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowUpIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { TONE_OPTIONS } from "@/types";

const Input = ({ rows = 4 }: { rows?: number }) => {
  const [input, setInput] = useState<string>("");
  const { sendMessageHandler, setTone } = useChat();

  return (
    <div className="relative w-full flex flex-col gap-4">
      <Textarea
        //ref={textareaRef}
        placeholder="Posez votre question sur le véganisme..."
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
        className="min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base bg-muted pb-10 dark:border-zinc-700"
        rows={rows}
        autoFocus
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            !event.shiftKey &&
            !event.nativeEvent.isComposing
          ) {
            event.preventDefault();

            sendMessageHandler(input);
          }
        }}
      />

      <div className="absolute bottom-0 p-2 w-fit flex flex-row justify-start">
        <Select onValueChange={(value: TONE_OPTIONS) => setTone(value)}>
          <SelectTrigger className="inline-flex border-transparent shadow-none focus:border-transparent focus:ring-0 dark:text-primary-foreground">
            <SelectValue placeholder="Choisissez un ton" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(TONE_OPTIONS).map((tone) => (
              <SelectItem key={tone} value={tone}>
                {tone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end">
        <Button
          className="rounded-full p-1.5 h-fit border dark:border-zinc-600"
          onClick={(event) => {
            event.preventDefault();
            sendMessageHandler(input);
          }}
          disabled={input.length === 0}
        >
          <ArrowUpIcon size={14} />
        </Button>
      </div>
    </div>
  );
};

export default Input;
