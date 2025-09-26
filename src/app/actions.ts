'use server';

import { generateChatResponse } from '@/ai/flows/generate-chat-response';
import { summarizeUploadedDocument } from '@/ai/flows/summarize-uploaded-document';

export async function getChatResponse(
  chatHistory: { role: 'user' | 'model'; parts: { text: string }[] }[],
  newMessage: string
) {
  // The current genkit flow is simple and doesn't handle history.
  // We'll just send the latest message.
  // A more advanced implementation would pass the history.
  try {
    const result = await generateChatResponse({ message: newMessage });
    return result.response;
  } catch (error) {
    console.error('Error generating chat response:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}

export async function getSummary(fileDataUri: string) {
  try {
    const result = await summarizeUploadedDocument({ fileDataUri });
    return result.summary;
  } catch (error) {
    console.error('Error summarizing document:', error);
    return 'Sorry, I was unable to summarize the document.';
  }
}
