import * as z from "zod"

export const AttendanceSchema = z.object({
  id: z.any(),
  employee_id: z.any(),
  date: z.any(),
  day: z.any(),
  check_in: z.any(),
  check_out: z.any(),
  authorization: z.any(),
  retard: z.any(),
  worked_hours: z.any(),
  leave: z.any(),
  hours_supp: z.any(),
  absence_type: z.any(),
})
export type Rule = z.infer<typeof AttendanceSchema>
