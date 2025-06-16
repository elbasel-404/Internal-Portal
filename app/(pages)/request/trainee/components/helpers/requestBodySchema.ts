import { z } from "zod"

export const requestBodySchema = z.object({
  employee_id: z.string(),
  date_from: z.string(),
  date_to: z.string(),
  description: z.string(),
})
