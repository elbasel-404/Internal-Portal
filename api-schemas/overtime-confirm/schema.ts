import * as z from "zod"

export const OvertimeConfirmElementSchema = z.object({
  id: z.number(),
  name: z.string(),
  date: z.string(),
  employee_id: z.array(z.union([z.number(), z.string()])),
  department_id: z.array(z.union([z.number(), z.string()])),
  job_id: z.array(z.union([z.number(), z.string()])),
  type_job_id: z.array(z.union([z.number(), z.string()])),
  nb_extras_time: z.number(),
  overtime_assignment_id: z.array(z.union([z.number(), z.string()])),
  state: z.string(),
})
export type OvertimeConfirmElement = z.infer<
  typeof OvertimeConfirmElementSchema
>
