'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Paperclip, Mic, MicOff } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/use-speech-recognition';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ChatInputProps {
  onSendMessage: (content: string, type?: 'text' | 'file', fileDataUri?: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [text, setText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const { isListening, transcript, startListening, stopListening } = useSpeechRecognition({
    onResult: (result) => setText(result),
  });

  const handleSendClick = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText('');
      if (isListening) {
        stopListening();
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };
  
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const dataUri = loadEvent.target?.result as string;
        onSendMessage(`File uploaded: ${file.name}`, 'file', dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      <Textarea
        placeholder="Type your message or use the microphone..."
        value={text}
        onChange={handleTextChange}
        onKeyPress={handleKeyPress}
        rows={1}
        className="min-h-[48px] w-full resize-none rounded-2xl border-2 border-input bg-background p-3 pr-28 text-sm shadow-sm"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" size="icon" variant="ghost" onClick={() => fileInputRef.current?.click()}>
                <Paperclip className="h-5 w-5" />
                <span className="sr-only">Attach file</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Attach File</TooltipContent>
          </Tooltip>
          <Tooltip>
             <TooltipTrigger asChild>
                <Button type="button" size="icon" variant={isListening ? "destructive" : "ghost"} onClick={isListening ? stopListening : startListening}>
                    {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    <span className="sr-only">{isListening ? 'Stop listening' : 'Start listening'}</span>
                </Button>
             </TooltipTrigger>
             <TooltipContent>{isListening ? 'Stop Listening' : 'Use Voice'}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button type="submit" size="icon" className="rounded-full" onClick={handleSendClick}>
          <Send className="h-5 w-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,application/pdf,.txt,.md" />
    </div>
  );
}
