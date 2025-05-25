import * as z from 'zod';

export const ProbationEvaluationFieldsSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  display_name: z.string().optional(),
});
export type ProbationEvaluationFields = z.infer<
  typeof ProbationEvaluationFieldsSchema
>;
