import * as z from "zod"

export const EmployeesListElementSchema = z.object({
  id: z.any(),
  department_id: z.any(),
  parent_id: z.any(),
  mobile_phone: z.any(),
  work_phone: z.any(),
  work_email: z.any(),
  number: z.any(),
  sector_id: z.any(),
  job_id: z.any(),
  complete_name: z.any(),
  english_name: z.any(),
  emp_state: z.any(),
  image: z.any(),
  department_global_id: z.any(),
  grade_id: z.any(),
  work_location: z.any(),
  administration_id: z.any(),
  sector_manager_id: z.any(),
  attendance_state: z.any(),
})
export type EmployeesListElement = z.infer<typeof EmployeesListElementSchema>

// export const EmployeesListElementSchema = z.object({
//   id: z.number(),
//   department_id: z.union([
//     z.array(z.union([z.number(), z.string()])),
//     z.boolean(),
//   ]),
//   parent_id: z.union([z.array(z.union([z.number(), z.string()])), z.boolean()]),
//   mobile_phone: z.union([z.string(), z.boolean()]),
//   work_phone: z.union([z.string(), z.boolean()]),
//   work_email: z.union([z.string(), z.boolean()]),
//   number: z.union([z.string(), z.boolean()]),
//   sector_id: z.union([z.array(z.union([z.number(), z.string()])), z.boolean()]),
//   job_id: z.union([z.array(z.union([z.number(), z.string()])), z.boolean()]),
//   complete_name: z.union([z.string(), z.boolean()]),
//   english_name: z.union([z.string(), z.boolean()]),
//   emp_state: z.union([z.string(), z.boolean()]),
//   image: z.union([z.string(), z.boolean()]),
//   department_global_id: z.union([
//     z.array(z.union([z.number(), z.string()])),
//     z.boolean(),
//   ]),
//   grade_id: z.union([z.array(z.union([z.number(), z.string()])), z.boolean()]),
//   work_location: z.union([z.string(), z.boolean()]),
//   administration_id: z.union([
//     z.array(z.union([z.number(), z.string()])),
//     z.boolean(),
//   ]),
//   sector_manager_id: z.union([
//     z.array(z.union([z.number(), z.string()])),
//     z.boolean(),
//   ]),
//   attendance_state: z.union([z.string(), z.boolean()]),
// })
// export type EmployeesListElement = z.infer<typeof EmployeesListElementSchema>
