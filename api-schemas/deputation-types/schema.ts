import * as z from "zod"

export const DeputationTypeSchema = z.object({
  id: z.any(),
  name: z.any(),
})
export type DeputationType = z.infer<typeof DeputationTypeSchema>
// export const HrLetterTypeSchema = z.object({
//   id: z.string(),
//   name: z.string(),
// })
// export type HrLetterType = z.infer<typeof HrLetterTypeSchema>
