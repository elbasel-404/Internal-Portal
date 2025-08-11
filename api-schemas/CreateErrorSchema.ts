import { z } from "zod"

export const CreateErrorSchema = z.object({
  status: z.string(),
  error: z.string(),
})
