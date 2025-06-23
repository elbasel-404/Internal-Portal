import { z } from "zod"

export const requestBodySchema = z.object({
  template_type_id: z.string(),
  destination_id: z.string(),
  notes: z.string().optional(),
  type: z.string(),
})
