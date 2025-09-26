'use server';
/**
 * @fileOverview An AI agent that summarizes uploaded documents.
 *
 * - summarizeUploadedDocument - A function that summarizes the content of a document.
 * - SummarizeUploadedDocumentInput - The input type for the summarizeUploadedDocument function.
 * - SummarizeUploadedDocumentOutput - The return type for the summarizeUploadedDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUploadedDocumentInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      "A document (PDF, image, or text) as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SummarizeUploadedDocumentInput = z.infer<typeof SummarizeUploadedDocumentInputSchema>;

const SummarizeUploadedDocumentOutputSchema = z.object({
  summary: z.string().describe('A summary of the document content.'),
});
export type SummarizeUploadedDocumentOutput = z.infer<typeof SummarizeUploadedDocumentOutputSchema>;

export async function summarizeUploadedDocument(input: SummarizeUploadedDocumentInput): Promise<SummarizeUploadedDocumentOutput> {
  return summarizeUploadedDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeUploadedDocumentPrompt',
  input: {schema: SummarizeUploadedDocumentInputSchema},
  output: {schema: SummarizeUploadedDocumentOutputSchema},
  prompt: `You are an expert summarizer. Please summarize the content of the following document.  Be as detailed as possible.

Document: {{media url=fileDataUri}}`,
});

const summarizeUploadedDocumentFlow = ai.defineFlow(
  {
    name: 'summarizeUploadedDocumentFlow',
    inputSchema: SummarizeUploadedDocumentInputSchema,
    outputSchema: SummarizeUploadedDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
