import { z } from 'zod';

export const requestBodySchema = z.object({
  employee_id: z.string(),
  recommendation: z.string(),
  question_id12: z.string(),
  answer_id12: z.string(),
  question_id13: z.string(),
  answer_id13: z.string(),
  question_id14: z.string(),
  answer_id14: z.string(),
  question_id15: z.string(),
  answer_id15: z.string(),
  question_id16: z.string(),
  answer_id16: z.string(),
  question_id17: z.string(),
  answer_id17: z.string(),
  question_id18: z.string(),
  answer_id18: z.string(),
  notes: z.string().optional(),
  attachment_ids: z.instanceof(File).or(z.string()),
});
