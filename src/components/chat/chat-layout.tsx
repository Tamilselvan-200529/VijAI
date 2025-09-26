'use client';

import { useState, useEffect } from 'react';
import {
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
import type { Message, Chat } from '@/lib/types';
import { getChatResponse, getSummary } from '@/app/actions';
import { v4 as uuidv4 } from 'uuid';
import { VijAILogo } from './logo';

export function ChatLayout() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      const savedChats = localStorage.getItem('chats');
      if (savedChats) {
        setChats(JSON.parse(savedChats));
      }
      const savedActiveChatId = localStorage.getItem('activeChatId');
      if (savedActiveChatId) {
        setActiveChatId(JSON.parse(savedActiveChatId));
      }
    } catch (error) {
      console.error("Failed to load chats from local storage", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (chats.length > 0) {
        localStorage.setItem('chats', JSON.stringify(chats));
      }
      if (activeChatId) {
        localStorage.setItem('activeChatId', JSON.stringify(activeChatId));
      }
    } catch (error) {
      console.error("Failed to save chats to local storage", error);
    }
  }, [chats, activeChatId]);

  const activeChat = chats.find(chat => chat.id === activeChatId);

  const handleSendMessage = async (content: string, type: 'text' | 'file' = 'text', fileDataUri?: string) => {
    let currentChatId = activeChatId;
    // Create a new chat if there isn't one
    if (!currentChatId) {
      const newChatId = uuidv4();
      const newChat: Chat = {
        id: newChatId,
        name: content.substring(0, 30), // Use first 30 chars as name
        messages: [],
      };
      setChats(prev => [...prev, newChat]);
      setActiveChatId(newChatId);
      currentChatId = newChatId;
    }
    
    if (type === 'text') {
      const userMessage: Message = { id: uuidv4(), role: 'user', content };
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId ? { ...chat, messages: [...chat.messages, userMessage] } : chat
      ));
      
      setIsTyping(true);
      const response = await getChatResponse([], content);
      const assistantMessage: Message = { id: uuidv4(), role: 'assistant', content: response };
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId ? { ...chat, messages: [...chat.messages, assistantMessage] } : chat
      ));
      setIsTyping(false);

    } else if (type === 'file' && fileDataUri) {
        setIsTyping(true);
        const userMessage: Message = { id: uuidv4(), role: 'user', content: "File uploaded. Here's a summary:" };
        setChats(prev => prev.map(chat => 
          chat.id === currentChatId ? { ...chat, messages: [...chat.messages, userMessage] } : chat
        ));

        const summary = await getSummary(fileDataUri);
        const assistantMessage: Message = { id: uuidv4(), role: 'assistant', content: summary };
        setChats(prev => prev.map(chat => 
          chat.id === currentChatId ? { ...chat, messages: [...chat.messages, assistantMessage] } : chat
        ));
        setIsTyping(false);
    }
  };
  
  const startNewChat = () => {
    setActiveChatId(null);
  };

  const selectChat = (chatId: string) => {
    setActiveChatId(chatId);
    setIsSidebarOpen(false);
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
              <ChatHistory chats={chats} onSelectChat={selectChat} />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
             <VijAILogo className="h-8 w-8 text-primary" />
             <h1 className="font-headline text-xl font-semibold text-foreground">VijAI</h1>
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
          <ChatHistory chats={chats} onSelectChat={selectChat} />
        </aside>
        <div className="flex flex-1 flex-col">
          <ChatMessages messages={activeChat?.messages ?? []} isTyping={isTyping} />
          <div className="border-t p-4">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
