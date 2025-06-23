import { z } from "zod"

export const requestBodySchema = z.object({
  custody_type: z.string(),
  custody_amount: z.string(),
  custody_reason: z.string(),
})
