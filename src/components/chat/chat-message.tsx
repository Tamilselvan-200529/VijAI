import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { VijAILogo } from './logo';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex items-start gap-3',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-transparent text-primary">
            <VijAILogo className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-xs rounded-2xl p-3 text-sm md:max-w-md lg:max-w-lg animate-in fade-in zoom-in-95',
          isUser
            ? 'bg-gradient-to-br from-primary to-violet-500 text-primary-foreground'
            : 'bg-muted shadow-md'
        )}
      >
        <p className="font-code whitespace-pre-wrap">{message.content}</p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
