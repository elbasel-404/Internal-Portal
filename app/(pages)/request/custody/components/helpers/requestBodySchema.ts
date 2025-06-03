import { z } from "zod"

export const requestBodySchema = z.object({
  employee_id: z.string(),
  custody_type: z.string(),
  custody_amount: z.string(),
  custody_reason: z.string(),
})
