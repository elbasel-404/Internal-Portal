import * as z from "zod"

export const PurchaseFieldSchema = z.object({
  id: z.any(),
  name: z.any(),
  key: z.any(),
  value: z.any(),
})
export type PurchaseField = z.infer<typeof PurchaseFieldSchema>
