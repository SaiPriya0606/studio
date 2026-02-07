'use server';

/**
 * @fileOverview A flow for answering questions about an image.
 *
 * - visualQuestionAnswering - A function that takes an image and a question and returns an answer.
 * - VisualQuestionAnsweringInput - The input type for the visualQuestionAnswering function.
 * - VisualQuestionAnsweringOutput - The return type for the visualQuestionAnswering function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VisualQuestionAnsweringInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to ask a question about, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  question: z.string().describe('The question to ask about the photo.'),
});
export type VisualQuestionAnsweringInput = z.infer<typeof VisualQuestionAnsweringInputSchema>;

const VisualQuestionAnsweringOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about the photo.'),
});
export type VisualQuestionAnsweringOutput = z.infer<typeof VisualQuestionAnsweringOutputSchema>;

export async function visualQuestionAnswering(input: VisualQuestionAnsweringInput): Promise<VisualQuestionAnsweringOutput> {
  return visualQuestionAnsweringFlow(input);
}

const prompt = ai.definePrompt({
  name: 'visualQuestionAnsweringPrompt',
  input: {schema: VisualQuestionAnsweringInputSchema},
  output: {schema: VisualQuestionAnsweringOutputSchema},
  prompt: `You are an expert in answering questions about images.

  Please answer the following question about the image:
  Question: {{{question}}}
  Image: {{media url=photoDataUri}}
  `,
});

const visualQuestionAnsweringFlow = ai.defineFlow(
  {
    name: 'visualQuestionAnsweringFlow',
    inputSchema: VisualQuestionAnsweringInputSchema,
    outputSchema: VisualQuestionAnsweringOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
