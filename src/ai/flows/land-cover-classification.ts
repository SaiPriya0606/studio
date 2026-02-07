'use server';

/**
 * @fileOverview This flow classifies land cover types from ISRO EO data and generates a report explaining the classification with visual evidence.
 *
 * - landCoverClassification - A function that handles the land cover classification process.
 * - LandCoverClassificationInput - The input type for the landCoverClassification function.
 * - LandCoverClassificationOutput - The return type for the landCoverClassification function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LandCoverClassificationInputSchema = z.object({
  eoDataUri: z
    .string()
    .describe(
      'ISRO Earth Observation (EO) data as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' /* e.g., data:image/png;base64,<base64_encoded_image> */
    ),
  additionalInstructions: z
    .string()
    .optional()
    .describe('Any specific instructions for the land cover classification.'),
});
export type LandCoverClassificationInput = z.infer<typeof LandCoverClassificationInputSchema>;

const LandCoverClassificationOutputSchema = z.object({
  classificationReport: z.string().describe('A report explaining the land cover classification with visual evidence.'),
});
export type LandCoverClassificationOutput = z.infer<typeof LandCoverClassificationOutputSchema>;

export async function landCoverClassification(
  input: LandCoverClassificationInput
): Promise<LandCoverClassificationOutput> {
  return landCoverClassificationFlow(input);
}

const landCoverClassificationPrompt = ai.definePrompt({
  name: 'landCoverClassificationPrompt',
  input: {schema: LandCoverClassificationInputSchema},
  output: {schema: LandCoverClassificationOutputSchema},
  prompt: `You are an expert in analyzing ISRO Earth Observation (EO) data for land cover classification.

  Analyze the provided EO data and classify the land cover types present. Generate a detailed report explaining the classification, including visual evidence from the EO data to support your analysis.

  EO Data: {{media url=eoDataUri}}

  {{#if additionalInstructions}}
  Additional Instructions: {{{additionalInstructions}}}
  {{/if}}

  Ensure the report is comprehensive and easy to understand for users interested in environmental monitoring.
  `,
});

const landCoverClassificationFlow = ai.defineFlow(
  {
    name: 'landCoverClassificationFlow',
    inputSchema: LandCoverClassificationInputSchema,
    outputSchema: LandCoverClassificationOutputSchema,
  },
  async input => {
    const {output} = await landCoverClassificationPrompt(input);
    return output!;
  }
);
