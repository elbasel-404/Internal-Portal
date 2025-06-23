import { z } from "zod"

export const requestBodySchema = z.object({
  date_from: z.string(),
  date_to: z.string(),
  description: z.string(),
})
