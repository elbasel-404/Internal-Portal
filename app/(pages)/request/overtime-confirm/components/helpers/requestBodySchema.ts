import { z } from "zod"

export const requestBodySchema = z.object({
  nb_extras_time: z.string(),
  overtime_assignment_id: z.string(),
})
