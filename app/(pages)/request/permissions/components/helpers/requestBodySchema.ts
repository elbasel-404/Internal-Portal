import { z } from "zod";

export const requestBodySchema = z.object({
  employee_id: z.string(),
  type_id: z.string(),
  more_one_day: z.string().optional(),
  date_from: z.string(),
  date_to: z.string().optional(),
  hour_from: z.string().optional(),
  hour_to: z.string().optional(),
  description: z.string().optional(),
  attachment_ids: z.instanceof(File).or(z.string()).optional(),
});
