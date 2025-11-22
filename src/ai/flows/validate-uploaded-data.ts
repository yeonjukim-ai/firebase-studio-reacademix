'use server';

/**
 * @fileOverview Data validation flow using AI to identify and highlight errors in uploaded data files.
 *
 * - validateUploadedData - A function that validates uploaded data files and identifies errors.
 * - ValidateUploadedDataInput - The input type for the validateUploadedData function.
 * - ValidateUploadedDataOutput - The return type for the validateUploadedData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateUploadedDataInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      "The uploaded file data as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  fileType: z.enum(['Excel', 'CSV']).describe('The type of the uploaded file.'),
});
export type ValidateUploadedDataInput = z.infer<typeof ValidateUploadedDataInputSchema>;

const ValidationErrorSchema = z.object({
  row: z.number().describe('The row number where the error occurred.'),
  column: z.string().describe('The column name where the error occurred.'),
  errorType: z.string().describe('The type of error found.'),
  errorMessage: z.string().describe('A detailed message describing the error.'),
});

const ValidateUploadedDataOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the uploaded data is valid or not.'),
  validationErrors: z.array(ValidationErrorSchema).describe('A list of validation errors found in the data.'),
  correctedDataUri: z
    .string()
    .optional()
    .describe(
      'The corrected file data as a data URI, only present if corrections were made.'
    ),
});
export type ValidateUploadedDataOutput = z.infer<typeof ValidateUploadedDataOutputSchema>;

export async function validateUploadedData(input: ValidateUploadedDataInput): Promise<ValidateUploadedDataOutput> {
  return validateUploadedDataFlow(input);
}

const validateDataPrompt = ai.definePrompt({
  name: 'validateDataPrompt',
  input: {schema: ValidateUploadedDataInputSchema},
  output: {schema: ValidateUploadedDataOutputSchema},
  prompt: `You are an AI data validation assistant. Your task is to analyze the data provided in the file and identify any errors or inconsistencies.

  The file data is provided as a data URI: {{fileDataUri}}
  The file type is: {{fileType}}

  Analyze the data for common issues such as missing values, incorrect data types, format errors, and inconsistencies across columns.  Return a list of validation errors with row and column numbers, error types, and detailed error messages.

  If the data is valid, return isValid as true and an empty list of validationErrors.

  If there are errors, return isValid as false and a list of validationErrors.

  You must always return a JSON format that corresponds to the ValidateUploadedDataOutputSchema.
  Ensure that the output is valid JSON.  Be concise in the error messages.
  `,
});

const validateUploadedDataFlow = ai.defineFlow(
  {
    name: 'validateUploadedDataFlow',
    inputSchema: ValidateUploadedDataInputSchema,
    outputSchema: ValidateUploadedDataOutputSchema,
  },
  async input => {
    const {output} = await validateDataPrompt(input);
    return output!;
  }
);
