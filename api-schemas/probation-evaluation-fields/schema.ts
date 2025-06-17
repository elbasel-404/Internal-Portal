import * as z from "zod"

export const ProbationEvaluationFieldsSchema = z.object({
  id: z.any(),
  name: z.any(),
  display_name: z.any(),
})
export type ProbationEvaluationFields = z.infer<
  typeof ProbationEvaluationFieldsSchema
>

// export const ProbationEvaluationFieldsSchema = z.object({
//   id: z.union([z.string(), z.number()]),
//   name: z.string(),
//   display_name: z.string().optional(),
// })
// export type ProbationEvaluationFields = z.infer<
//   typeof ProbationEvaluationFieldsSchema
// >
