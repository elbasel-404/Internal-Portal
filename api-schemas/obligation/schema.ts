import * as z from "zod"

export const ObligationSchema = z.object({
  obligation_settings_text: z.any(),
  family: z.object({
    answer: z.any(),
    description: z.any(),
  }),
  relationship: z.object({
    answer: z.any(),
    description: z.any(),
  }),
  work: z.object({
    answer: z.any(),
    description: z.any(),
  }),
})
export type Rule = z.infer<typeof ObligationSchema>
