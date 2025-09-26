'use client';

import { useEffect, useRef } from 'react';
import type { Message } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './chat-message';
import { TypingIndicator } from './typing-indicator';

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
}

export function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping]);

  return (
    <ScrollArea className="flex-1" ref={scrollAreaRef}>
      <div className="p-4 md:p-6">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </ScrollArea>
  );
}
