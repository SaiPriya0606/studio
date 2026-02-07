'use server';

/**
 * @fileOverview Implements a Genkit flow for change detection analysis on ISRO EO data.
 *
 * - analyzeChangeDetection - A function that handles the change detection analysis process.
 * - ChangeDetectionInput - The input type for the analyzeChangeDetection function.
 * - ChangeDetectionOutput - The return type for the analyzeChangeDetection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChangeDetectionInputSchema = z.object({
  date1: z.string().describe('The first date for EO data analysis (YYYY-MM-DD).'),
  date2: z.string().describe('The second date for EO data analysis (YYYY-MM-DD).'),
  areaOfInterest: z.string().describe('Description of the area of interest.'),
});
export type ChangeDetectionInput = z.infer<typeof ChangeDetectionInputSchema>;

const ChangeDetectionOutputSchema = z.object({
  report: z.string().describe('A detailed report describing the changes detected between the two dates, including spatial analytics and domain-specific reasoning.'),
});
export type ChangeDetectionOutput = z.infer<typeof ChangeDetectionOutputSchema>;

export async function analyzeChangeDetection(input: ChangeDetectionInput): Promise<ChangeDetectionOutput> {
  return changeDetectionFlow(input);
}

const changeDetectionPrompt = ai.definePrompt({
  name: 'changeDetectionPrompt',
  input: {schema: ChangeDetectionInputSchema},
  output: {schema: ChangeDetectionOutputSchema},
  prompt: `You are an expert in analyzing Earth Observation (EO) data from ISRO satellites. Your task is to analyze changes between two dates for a specified area of interest and generate a comprehensive report.

Analyze the EO data from {{date1}} and {{date2}} for the following area of interest:
{{areaOfInterest}}

Provide a detailed report that includes:
- Spatial analytics of the changes detected (e.g., land cover changes, vegetation changes).
- Domain-specific reasoning to explain the potential causes and impacts of the observed changes.
- Any relevant insights or recommendations based on the analysis.
`,
});

const changeDetectionFlow = ai.defineFlow(
  {
    name: 'changeDetectionFlow',
    inputSchema: ChangeDetectionInputSchema,
    outputSchema: ChangeDetectionOutputSchema,
  },
  async input => {
    const {output} = await changeDetectionPrompt(input);
    return output!;
  }
);
