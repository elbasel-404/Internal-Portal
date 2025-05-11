import { z } from "zod";

export const requestBodySchema = z.object({
  employee_id: z.string(),
  request_type: z.string(),
  individual_complete_name: z.string(),
  relative_relation: z.string(),
  individual_english_name: z.string().optional(),
  attachment_ids: z.instanceof(File).or(z.string()),
});
