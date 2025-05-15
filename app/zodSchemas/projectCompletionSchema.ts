import { z } from 'zod';

export const ProjectCompletionSchema = z.object({
  phaseName: z.string().min(1),
  year: z.string().min(1),
  amount: z.string(),
});
