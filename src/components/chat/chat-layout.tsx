'use client';

import { useState } from 'react';
import {
  Bot,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { ChatHistory } from './chat-history';
import { ChatInput } from './chat-input';
import { ChatMessages } from './chat-messages';
import type { Message } from '@/lib/types';
import { getChatResponse, getSummary } from '@/app/actions';
import { v4 as uuidv4 } from 'uuid';

export function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSendMessage = async (content: string, type: 'text' | 'file' = 'text', fileDataUri?: string) => {
    if (type === 'text') {
      const userMessage: Message = { id: uuidv4(), role: 'user', content };
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);
      const response = await getChatResponse([], content);
      const assistantMessage: Message = { id: uuidv4(), role: 'assistant', content: response };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    } else if (type === 'file' && fileDataUri) {
        setIsTyping(true);
        const userMessage: Message = { id: uuidv4(), role: 'user', content: "File uploaded. Here's a summary:" };
        setMessages((prev) => [...prev, userMessage]);
        const summary = await getSummary(fileDataUri);
        const assistantMessage: Message = { id: uuidv4(), role: 'assistant', content: summary };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
    }
  };
  
  const startNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="relative flex h-full max-h-[95vh] w-full max-w-5xl flex-col rounded-lg border bg-card shadow-lg">
      <header className="flex h-16 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <PanelLeftOpen className="h-5 w-5" />
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-4">
              <SheetHeader className="mb-4">
                <SheetTitle className="font-headline text-xl">
                  Chat History
                </SheetTitle>
              </SheetHeader>
              <ChatHistory />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
             <Bot className="h-8 w-8 text-accent" />
             <h1 className="font-headline text-xl font-semibold text-foreground">AetherMind AI</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={startNewChat}>
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-72 flex-col border-r md:flex">
          <div className="p-4">
            <h2 className="font-headline text-xl font-semibold">Chat History</h2>
          </div>
          <ChatHistory />
        </aside>
        <div className="flex flex-1 flex-col">
          <ChatMessages messages={messages} isTyping={isTyping} />
          <div className="border-t p-4">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
