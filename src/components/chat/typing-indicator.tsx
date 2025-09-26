import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { VijAILogo } from './logo';

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 justify-start">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className="bg-transparent text-primary">
          <VijAILogo className="h-6 w-6" />
        </AvatarFallback>
      </Avatar>
      <div className="bg-muted rounded-lg p-3">
        <div className="flex items-center justify-center gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/50 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/50 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/50" />
        </div>
      </div>
    </div>
  );
}
