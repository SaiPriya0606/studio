'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating captions for images.
 *
 * - generateCaption - A function that takes an image and returns a descriptive caption.
 * - ImageCaptioningInput - The input type for the generateCaption function, expects image as a data URI.
 * - ImageCaptioningOutput - The return type for the generateCaption function, returns a text caption.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageCaptioningInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo to be captioned, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // intentionally escaped
    ),
});
export type ImageCaptioningInput = z.infer<typeof ImageCaptioningInputSchema>;

const ImageCaptioningOutputSchema = z.object({
  caption: z.string().describe('A descriptive caption of the image.'),
});
export type ImageCaptioningOutput = z.infer<typeof ImageCaptioningOutputSchema>;

export async function generateCaption(input: ImageCaptioningInput): Promise<ImageCaptioningOutput> {
  return imageCaptioningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'imageCaptioningPrompt',
  input: {schema: ImageCaptioningInputSchema},
  output: {schema: ImageCaptioningOutputSchema},
  prompt: `You are an AI that generates descriptive captions for images.

  Generate a detailed caption for the following image:

  {{media url=photoDataUri}}
  `,
});

const imageCaptioningFlow = ai.defineFlow(
  {
    name: 'imageCaptioningFlow',
    inputSchema: ImageCaptioningInputSchema,
    outputSchema: ImageCaptioningOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
