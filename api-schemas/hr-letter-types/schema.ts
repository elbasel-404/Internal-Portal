import * as z from "zod"

export const HrLetterTypeSchema = z.object({
  id: z.any(),
  name: z.any(),
})
export type HrLetterType = z.infer<typeof HrLetterTypeSchema>
// export const HrLetterTypeSchema = z.object({
//   id: z.string(),
//   name: z.string(),
// })
// export type HrLetterType = z.infer<typeof HrLetterTypeSchema>
