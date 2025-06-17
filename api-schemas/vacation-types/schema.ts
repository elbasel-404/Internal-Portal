import * as z from "zod"

export const VacationTypeSchema = z.object({
  id: z.any(),
  name: z.any(),
  display_name: z.any(),
})

export type VacationType = z.infer<typeof VacationTypeSchema>

// export const VacationTypeSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   display_name: z.string(),
// })
// export type VacationType = z.infer<typeof VacationTypeSchema>
