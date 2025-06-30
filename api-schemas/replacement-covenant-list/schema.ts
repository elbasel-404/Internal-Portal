import * as z from "zod"

export const ReplacementCovenantListElementSchema = z.object({
  id: z.any(),
  name: z.any(),
  custody_id_number: z.any(),
  close_date: z.any(),
  close_type: z.any(),
  state: z.any(),
  employee_id: z.any(),
  order_date: z.any(),
  custody_type: z.any(),
  custody_amount: z.any(),
  close_amount: z.any(),
  remaining_amount: z.any(),
  sector_id: z.any(),
  job_id: z.any(),
  administration_id: z.any(),
})
export type ReplacementCovenantListElement = z.infer<
  typeof ReplacementCovenantListElementSchema
>
