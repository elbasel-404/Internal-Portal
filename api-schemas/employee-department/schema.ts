import * as z from "zod"

export const EmployeeDepartmentElementSchema = z.object({
  id: z.any(),
  complete_name: z.any(),
  department_id: z.any(),
  parent_id: z.any(),
  grade_id: z.any(),
  image: z.any(),
  sector_id: z.any(),
  sector_manager_id: z.any(),
  department_global_id: z.any(),
  english_name: z.any(),
  job_id: z.any(),
  work_phone: z.any(),
  work_email: z.any(),
  work_email2: z.any(),
  work_location: z.any(),
  mobile_phone: z.any(),
  mobile_phone2: z.any(),
  administration_id: z.any(),
  job_english_name: z.any(),
})
export type EmployeeDepartmentElement = z.infer<
  typeof EmployeeDepartmentElementSchema
>

// export const EmployeeDepartmentElementSchema = z.object({
//   id: z.number(),
//   complete_name: z.string(),
//   department_id: z.array(z.union([z.number(), z.string()])),
//   parent_id: z.array(z.union([z.number(), z.string()])),
//   grade_id: z.array(z.union([z.number(), z.string()])),
//   image: z.string(),
//   sector_id: z.array(z.union([z.number(), z.string()])),
//   sector_manager_id: z.array(z.union([z.number(), z.string()])),
//   department_global_id: z.array(z.union([z.number(), z.string()])),
//   english_name: z.string(),
//   job_id: z.array(z.union([z.number(), z.string()])),
//   work_phone: z.string(),
//   work_email: z.string(),
//   work_email2: z.string(),
//   work_location: z.string(),
//   mobile_phone: z.string(),
//   mobile_phone2: z.string(),
//   administration_id: z.array(z.union([z.number(), z.string()])),
//   job_english_name: z.string(),
// })
// export type EmployeeDepartmentElement = z.infer<
//   typeof EmployeeDepartmentElementSchema
// >
