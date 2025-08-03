import { z } from "zod"

export const requestBodySchema = z.object({
  family_answer: z.string(),
  family_description: z.string().optional(),
  relationship_answer: z.string(),
  relationship_description: z.string().optional(),
  work_answer: z.string(),
  work_description: z.string().optional(),
})
