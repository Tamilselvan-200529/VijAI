import type { Timestamp } from 'firebase/firestore';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Timestamp;
};

export type Chat = {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Timestamp;
};
