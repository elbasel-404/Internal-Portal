import { z } from "zod"

export const BatchProductSchema = z.object({
  id: z.any(),
  product_id: z.any(),
  name: z.any(),
  date_planned: z.any(),
  company_id: z.any(),
  product_qty: z.any(),
  price_unit: z.any(),
  price_subtotal: z.any(),
  product_category_root_name: z.any(),
  quantity_completed: z.any(),
  amount_completed: z.any(),
  quantity_under_completed: z.any(),
  quantity_remain: z.any(),
  amount_quantity_remain: z.any(),
  unit_price_after_tax: z.any(),
})
export type BatchProduct = z.infer<typeof BatchProductSchema>
