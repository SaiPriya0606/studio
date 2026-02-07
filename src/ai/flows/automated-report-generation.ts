'use server';

/**
 * @fileOverview Automated report generation flow for geospatial analysis and generative AI reasoning over EO data.
 *
 * - generateReport - A function that handles the automated report generation process.
 * - GenerateReportInput - The input type for the generateReport function.
 * - GenerateReportOutput - The return type for the generateReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReportInputSchema = z.object({
  geospatialAnalysis: z
    .string()
    .describe('The geospatial analysis data as a string.'),
  reasoningOverEoData: z
    .string()
    .describe('The generative AI reasoning over EO data as a string.'),
});
export type GenerateReportInput = z.infer<typeof GenerateReportInputSchema>;

const GenerateReportOutputSchema = z.object({
  report: z.string().describe('The generated report.'),
});
export type GenerateReportOutput = z.infer<typeof GenerateReportOutputSchema>;

export async function generateReport(input: GenerateReportInput): Promise<GenerateReportOutput> {
  return generateReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReportPrompt',
  input: {schema: GenerateReportInputSchema},
  output: {schema: GenerateReportOutputSchema},
  prompt: `You are an expert report generator specializing in geospatial analysis and Earth Observation (EO) data.

You will use the provided geospatial analysis and generative AI reasoning over EO data to generate a comprehensive report.

Geospatial Analysis: {{{geospatialAnalysis}}}
Reasoning over EO Data: {{{reasoningOverEoData}}}

Report:`, // The actual prompt here
});

const generateReportFlow = ai.defineFlow(
  {
    name: 'generateReportFlow',
    inputSchema: GenerateReportInputSchema,
    outputSchema: GenerateReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
