'use client';

import { useEffect, useRef, useState } from 'react';
import type { Message } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './chat-message';
import { TypingIndicator } from './typing-indicator';
import { useFirestore, useAuth } from '@/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

interface ChatMessagesProps {
  chatId: string | null;
}

export function ChatMessages({ chatId }: ChatMessagesProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const firestore = useFirestore();
  const { currentUser } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (!firestore || !currentUser || !chatId) {
      setMessages([]);
      return;
    }

    const messagesRef = collection(firestore, 'users', currentUser.uid, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('createdAt'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Message));
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [firestore, currentUser, chatId]);

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping]);

  if (!chatId) {
    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-semibold">Welcome to VijAI</h2>
                <p className="text-muted-foreground">Start a new conversation to begin.</p>
            </div>
        </div>
    )
  }

  return (
    <ScrollArea className="flex-1">
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
