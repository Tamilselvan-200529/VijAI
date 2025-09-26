'use client';

import { useState, useEffect } from 'react';
import {
  LogOut,
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
import { VijAILogo } from './logo';
import { useAuth, useFirestore } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { collection, query, where, onSnapshot, doc, setDoc, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';

export function ChatLayout() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { auth, currentUser } = useAuth();
  const firestore = useFirestore();
  const router = useRouter();


  useEffect(() => {
    if (!firestore || !currentUser?.uid) return;

    const chatsRef = collection(firestore, 'users', currentUser.uid, 'chats');
    const q = query(chatsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userChats: Chat[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Chat));
      setChats(userChats);

      if (!activeChatId && userChats.length > 0) {
        setActiveChatId(userChats[0].id);
      }
    });

    return () => unsubscribe();
  }, [firestore, currentUser?.uid, activeChatId]);


  const activeChat = chats.find(chat => chat.id === activeChatId);

  const handleSendMessage = async (content: string, type: 'text' | 'file' = 'text', fileDataUri?: string) => {
    if (!firestore || !currentUser) return;

    let currentChatId = activeChatId;

    // Create a new chat if there isn't one
    if (!currentChatId) {
      const newChatRef = await addDoc(collection(firestore, 'users', currentUser.uid, 'chats'), {
        name: content.substring(0, 30),
        createdAt: serverTimestamp(),
      });
      currentChatId = newChatRef.id;
      setActiveChatId(currentChatId);
    }
    
    if (!currentChatId) return;

    const messagesRef = collection(firestore, 'users', currentUser.uid, 'chats', currentChatId, 'messages');

    if (type === 'text') {
      const userMessage: Omit<Message, 'id'> = { role: 'user', content, createdAt: serverTimestamp() };
      await addDoc(messagesRef, userMessage);
      
      setIsTyping(true);
      const response = await getChatResponse([], content);
      const assistantMessage: Omit<Message, 'id'> = { role: 'assistant', content: response, createdAt: serverTimestamp() };
      await addDoc(messagesRef, assistantMessage);
      setIsTyping(false);

    } else if (type === 'file' && fileDataUri) {
        setIsTyping(true);
        const userMessage: Omit<Message, 'id'> = { role: 'user', content: "File uploaded. Here's a summary:", createdAt: serverTimestamp() };
        await addDoc(messagesRef, userMessage);

        const summary = await getSummary(fileDataUri);
        const assistantMessage: Omit<Message, 'id'> = { role: 'assistant', content: summary, createdAt: serverTimestamp() };
        await addDoc(messagesRef, assistantMessage);
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

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/login');
    }
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
          <Link href="/" className="flex items-center gap-2">
             <VijAILogo className="h-8 w-8 text-primary" />
             <h1 className="font-headline text-xl font-semibold text-foreground">VijAI</h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={startNewChat}>
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
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
          <ChatMessages chatId={activeChatId} />
          <div className="border-t p-4">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
