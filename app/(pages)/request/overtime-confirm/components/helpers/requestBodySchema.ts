import { z } from "zod"

export const requestBodySchema = z.object({
  employee_id: z.string(),
  nb_extras_time: z.string(),
  overtime_assignment_id: z.string(),
})
