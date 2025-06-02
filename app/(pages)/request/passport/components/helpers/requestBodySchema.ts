import { z } from "zod";

export const requestBodySchema = z.object({
  employee_id: z.string(),
  new_passport: z.string(),
  passport_end_date: z.string(),
  attachment_ids: z.instanceof(File).or(z.string()),
});
