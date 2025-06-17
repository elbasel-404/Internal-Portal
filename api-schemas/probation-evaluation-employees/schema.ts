import * as z from "zod"

export const ProbationEvaluationEmployeeSchema = z.object({
  id: z.any(),
  complete_name: z.any(),
  number: z.any(),
  job_id: z.any(),
  department_id: z.any(),
  grade_id: z.any(),
  hiring_date: z.any(),
  date_probation_end: z.any(),
})
export type ProbationEvaluationEmployee = z.infer<
  typeof ProbationEvaluationEmployeeSchema
>

// export const ProbationEvaluationEmployeeSchema = z.object({
//   id: z.number(),
//   complete_name: z.string(),
//   number: z.string(),
//   job_id: z.array(z.union([z.number(), z.string()])),
//   department_id: z.array(z.union([z.number(), z.string()])),
//   grade_id: z.array(z.union([z.number(), z.string()])),
//   hiring_date: z.string(),
//   date_probation_end: z.string(),
// })
// export type ProbationEvaluationEmployee = z.infer<
//   typeof ProbationEvaluationEmployeeSchema
// >
