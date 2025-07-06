import * as z from "zod"

export const PurchaseSchema = z.object({
  id: z.any(),
  employee_id: z.any(),
  date: z.any(),
  description: z.any(),
  purchase_initiative_id: z.any(),
  project_name: z.any(),
  project_number: z.any(),
  request_title: z.any(),
  type: z.any(),
  note: z.any(),
  award_amount: z.any(),
  amount_total: z.any(),
  state: z.any(),
  attachment_ids: z.any(),
})
export type PurchaseType = z.infer<typeof PurchaseSchema>
