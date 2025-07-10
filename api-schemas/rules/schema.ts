import * as z from "zod"

export const RulesSchema = z.object({
  id: z.any(),
  published: z.any(),
  code: z.any(),
  title: z.any(),
  resume: z.any(),
  description: z.any(),
  active: z.any(),
  create_uid: z.any(),
  create_date: z.any(),
  write_uid: z.any(),
  write_date: z.any(),
  display_name: z.any(),
  __last_update: z.any(),
})
export type Rule = z.infer<typeof RulesSchema>
