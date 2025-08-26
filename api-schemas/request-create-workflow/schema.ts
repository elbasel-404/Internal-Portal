import * as z from "zod"

export const RequestCreateWorkflowElementSchema = z.object({
  state: z.any(),
  name: z.any(),
})
export type RequestCreateWorkflowElement = z.infer<
  typeof RequestCreateWorkflowElementSchema
>
// export const RequestCreateWorkflowElementSchema = z.object({
//   state: z.string(),
// })
// export type RequestCreateWorkflowElement = z.infer<
//   typeof RequestCreateWorkflowElementSchema
// >
