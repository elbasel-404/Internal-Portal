import * as z from "zod"

export const ObligationSchema = z.object({
  obligation_settings_text: z.string(),
  family: z.object({
    answer: z.string(),
    description: z.string(),
  }),
  relationship: z.object({
    answer: z.string(),
    description: z.string(),
  }),
  work: z.object({
    answer: z.string(),
    description: z.string(),
  }),
})
export type Rule = z.infer<typeof ObligationSchema>
