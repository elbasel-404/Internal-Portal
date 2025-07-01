import * as z from "zod"

export const PurchaseSchema = z.object({
  id: z.any(),
  employee_id: z.any(),
  description: z.any(),
  purchase_initiative_id: z.any(),
  project_name: z.any(),
  project_number: z.any(),
})
export type PurchaseType = z.infer<typeof PurchaseSchema>
