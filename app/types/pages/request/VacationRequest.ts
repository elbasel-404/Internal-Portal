import { z } from "zod";

export const VacationRequestSchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  status: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  approvalDate: z.string(),
  durationInDays: z.number(),
});

export type VacationRequest = z.infer<typeof VacationRequestSchema>;