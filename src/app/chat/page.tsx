import { ChatLayout } from "@/components/chat/chat-layout";

export default function ChatPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-background p-4 md:p-6">
      <ChatLayout />
    </main>
  );
}
