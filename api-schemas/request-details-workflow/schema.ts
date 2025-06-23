import * as z from "zod"

export const RequestDetailsWorkflowElementSchema = z.object({
  state: z.any(),
  status: z.any(),
  icon: z.any(),
  created_date: z.any(),
  id: z.any(),
  employee_name: z.any(),
})
export type RequestDetailsWorkflowElement = z.infer<
  typeof RequestDetailsWorkflowElementSchema
>

// export const RequestDetailsWorkflowElementSchema = z.object({
//   state: z.array(z.string()),
//   status: z.string(),
//   icon: z.string(),
//   created_date: z.coerce.date().optional(),
//   id: z.number().optional(),
//   employee_name: z.string().optional(),
// })
// export type RequestDetailsWorkflowElement = z.infer<
//   typeof RequestDetailsWorkflowElementSchema
// >
