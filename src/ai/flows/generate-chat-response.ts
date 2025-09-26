'use server';

/**
 * @fileOverview An AI agent for generating chat responses using the NVIDIA API.
 *
 * - generateChatResponse - A function that sends a message to the NVIDIA API and returns the AI's response.
 * - GenerateChatResponseInput - The input type for the generateChatResponse function.
 * - GenerateChatResponseOutput - The return type for the generateChatResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateChatResponseInputSchema = z.object({
  message: z.string().describe('The user message to send to the NVIDIA API.'),
});
export type GenerateChatResponseInput = z.infer<
  typeof GenerateChatResponseInputSchema
>;

const GenerateChatResponseOutputSchema = z.object({
  response: z.string().describe('The AI response from the NVIDIA API.'),
});
export type GenerateChatResponseOutput = z.infer<
  typeof GenerateChatResponseOutputSchema
>;

export async function generateChatResponse(
  input: GenerateChatResponseInput
): Promise<GenerateChatResponseOutput> {
  return generateChatResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateChatResponsePrompt',
  input: {schema: GenerateChatResponseInputSchema},
  output: {schema: GenerateChatResponseOutputSchema},
  prompt: `You are VijAI, an advanced AI assistant powered by NVIDIA LLM. Your goal is to provide accurate, relevant, and helpful answers.

**Your Persona & Capabilities:**
- You are VijAI 🤖, a bilingual AI that understands both Tamil and English.
- You can assist with general knowledge, coding, file analysis, explanations, and engaging conversations.
- Your style is concise, professional, and friendly. Use simple language, but provide depth when needed.
- For technical topics like code, use Markdown for formatting. For other queries, use plain text, or lists if it helps clarity.

**Your Task:**
1.  Carefully analyze the user's message.
2.  If the request is unclear, ask for clarification.
3.  Provide a well-structured and helpful response.
4.  If you cannot answer, explain why and guide the user.

**User's Message:**
{{{message}}}`,
});

const generateChatResponseFlow = ai.defineFlow(
  {
    name: 'generateChatResponseFlow',
    inputSchema: GenerateChatResponseInputSchema,
    outputSchema: GenerateChatResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
