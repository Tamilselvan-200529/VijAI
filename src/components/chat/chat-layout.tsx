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
import { collection, query, onSnapshot, doc, addDoc, serverTimestamp, orderBy, CollectionReference } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';


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
    },
    async (error) => {
        const permissionError = new FirestorePermissionError({
          path: (chatsRef as CollectionReference).path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
    });

    return () => unsubscribe();
  }, [firestore, currentUser?.uid, activeChatId]);


  const activeChat = chats.find(chat => chat.id === activeChatId);

  const handleSendMessage = async (content: string, type: 'text' | 'file' = 'text', fileDataUri?: string) => {
    if (!firestore || !currentUser) return;

    let currentChatId = activeChatId;

    // Create a new chat if there isn't one
    if (!currentChatId) {
       const newChatData = {
        name: content.substring(0, 30),
        createdAt: serverTimestamp(),
      };
      const chatsRef = collection(firestore, 'users', currentUser.uid, 'chats');
      try {
        const newChatRef = await addDoc(chatsRef, newChatData);
        currentChatId = newChatRef.id;
        setActiveChatId(currentChatId);
      } catch (e) {
         const permissionError = new FirestorePermissionError({
            path: (chatsRef as CollectionReference).path,
            operation: 'create',
            requestResourceData: newChatData,
          });
          errorEmitter.emit('permission-error', permissionError);
          return;
      }
    }
    
    if (!currentChatId) return;

    const messagesRef = collection(firestore, 'users', currentUser.uid, 'chats', currentChatId, 'messages');

    const handleAiResponse = async (userMessage: Omit<Message, 'id'>) => {
        addDoc(messagesRef, userMessage).catch(async (e) => {
            const permissionError = new FirestorePermissionError({ path: messagesRef.path, operation: 'create', requestResourceData: userMessage });
            errorEmitter.emit('permission-error', permissionError);
        });

        setIsTyping(true);
        const response = await getChatResponse([], content);
        const assistantMessage: Omit<Message, 'id'> = { role: 'assistant', content: response, createdAt: serverTimestamp() };
        addDoc(messagesRef, assistantMessage).catch(async (e) => {
            const permissionError = new FirestorePermissionError({ path: messagesRef.path, operation: 'create', requestResourceData: assistantMessage });
            errorEmitter.emit('permission-error', permissionError);
        });
        setIsTyping(false);
    }

    if (type === 'text') {
      const userMessage: Omit<Message, 'id'> = { role: 'user', content, createdAt: serverTimestamp() };
      handleAiResponse(userMessage);
    } else if (type === 'file' && fileDataUri) {
        const userMessage: Omit<Message, 'id'> = { role: 'user', content: "File uploaded. Here's a summary:", createdAt: serverTimestamp() };
        addDoc(messagesRef, userMessage).catch(async (e) => {
            const permissionError = new FirestorePermissionError({ path: messagesRef.path, operation: 'create', requestResourceData: userMessage });
            errorEmitter.emit('permission-error', permissionError);
        });
        
        setIsTyping(true);
        const summary = await getSummary(fileDataUri);
        const assistantMessage: Omit<Message, 'id'> = { role: 'assistant', content: summary, createdAt: serverTimestamp() };
        addDoc(messagesRef, assistantMessage).catch(async (e) => {
             const permissionError = new FirestorePermissionError({ path: messagesRef.path, operation: 'create', requestResourceData: assistantMessage });
            errorEmitter.emit('permission-error', permissionError);
        });
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
