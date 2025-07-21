import { z } from "zod"

export const ResultSchema = z.object({
  // update type from number to any to be optional cause in purchase field request api endpoint it does not return it
  statusCode: z.any(),
  status: z.string(),
  data: z.array(z.any()),
})
