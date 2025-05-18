import { z } from 'zod';

export const BatchSchema = z.object({
  batchNumber: z.string(),
  batchName: z.string(),
  // paymentDate: z.string().optional(),
  // notes: z.string().optional(),
  // attachments: z.array(z.number()).optional(),
});
