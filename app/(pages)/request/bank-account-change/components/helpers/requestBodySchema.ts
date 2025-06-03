import { z } from "zod"

export const requestBodySchema = z.object({
  employee_id: z.string(),
  new_bank_id: z.string(),
  iban: z.string(),
  attachment_ids: z.instanceof(File).or(z.string()),
})
