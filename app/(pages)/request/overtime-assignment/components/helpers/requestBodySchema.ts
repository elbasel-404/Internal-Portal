import { z } from "zod"

export const requestBodySchema = z.object({
  year: z.string(),
  month: z.string(),
  day_from: z.string(),
  day_to: z.string(),
  nb_hours: z.string(),
  description: z.string(),
})
