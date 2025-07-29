import { z } from "zod"

export const requestBodySchema = z.object({
  family_answer: z.boolean(),
  family_description: z.string(),
  relationship_answer: z.boolean(),
  relationship_description: z.string(),
  work_answer: z.boolean(),
  work_description: z.string(),
})
