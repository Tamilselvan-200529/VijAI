import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import type { Chat } from "@/lib/types"

interface ChatHistoryProps {
  chats: Chat[];
  onSelectChat: (chatId: string) => void;
}

export function ChatHistory({ chats, onSelectChat }: ChatHistoryProps) {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {chats.map((chat) => (
          <Button
            key={chat.id}
            variant="ghost"
            className="w-full justify-start overflow-hidden whitespace-nowrap text-ellipsis"
            onClick={() => onSelectChat(chat.id)}
          >
            {chat.name}
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}
