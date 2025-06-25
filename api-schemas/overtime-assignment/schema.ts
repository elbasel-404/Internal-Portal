import * as z from "zod"

// export const OvertimeAssignmentElementSchema = z.object({
//   id: z.any(),
//   name: z.any(),
//   date: z.any(),
//   employee_id: z.any(),
//   state: z.any(),
//   date_from: z.any(),
//   date_to: z.any(),
//   nb_hours: z.any(),
//   description: z.any(),
//   department_id: z.any(),
//   job_id: z.any(),
//   type_job_id: z.any(),
// })
// export type OvertimeAssignmentElement = z.infer<
//   typeof OvertimeAssignmentElementSchema
// >

export const OvertimeAssignmentElementSchema = z.object({
  id: z.number(),
  name: z.string(),
  date: z.string(),
  employee_id: z.array(z.union([z.string(), z.number()])),
  department_id: z.array(z.union([z.number(), z.string()])),
  job_id: z.array(z.union([z.string(), z.number()])),
  type_job_id: z.array(z.union([z.string(), z.number()])),
  date_from: z.string(),
  date_to: z.string(),
  nb_hours: z.number(),
  description: z.string(),
  state: z.string(),
})
export type OvertimeAssignmentElement = z.infer<
  typeof OvertimeAssignmentElementSchema
>
