import React, { useState, useRef, useEffect } from "react";
import { Send, RefreshCw } from "lucide-react";

import { useChat } from "@/context/chat-context";
import MessageBubble from "./messages";

interface ChatInterfaceProps {
  apiKey?: string;
}

const ChatInterface = ({ apiKey = "" }: Readonly<ChatInterfaceProps>) => {
  const { messages, isTyping } = useChat();

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      //handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto rounded-xl overflow-hidden glass-panel">
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        <div className="space-y-1">
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              content={message.content}
              isBot={message.isBot}
              sources={message.sources}
              delay={index === messages.length - 1 && message.isBot ? 500 : 0}
            />
          ))}
          {isTyping && <MessageBubble content="" isBot={true} delay={1} />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Posez votre question sur le véganisme..."
            className="w-full p-3 pr-12 rounded-full bg-secondary border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
            disabled={isTyping}
          />
          <button
            //onClick={handleSendMessage}
            disabled={input.trim() === "" || isTyping}
            className={`absolute right-1 rounded-full p-2 
              ${
                input.trim() === "" || isTyping
                  ? "text-muted-foreground"
                  : "text-white bg-primary hover:bg-primary/90"
              } transition-colors`}
            aria-label="Envoyer"
          >
            {isTyping ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
