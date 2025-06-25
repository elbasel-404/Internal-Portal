import * as z from "zod"

export const SubstituteEmployeesSchema = z.object({
  id: z.any(),
  name: z.any(),
  complete_name: z.any(),
  family_name: z.any(),
})

export type SubstituteEmployees = z.infer<typeof SubstituteEmployeesSchema>
