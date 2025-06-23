import { z } from "zod"

export const requestBodySchema = z.object({
  option_id: z.string(),
  date_from: z.string(),
  date_to: z.string(),
  notes: z.string(),
  attachment_ids: z.instanceof(File).or(z.string()).optional(),
})
