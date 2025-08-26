import { z } from "zod"

export const BatchProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  quantity: z.string(),
  completedQuantity: z.string().optional(),
  completedCost: z.string().optional(),
  underCompletedQauntity: z.string().optional(),
  underCompletedCost: z.string().optional(),
  remainingQuantity: z.string().optional(),
  remainingCost: z.string().optional(),
  unitPrice: z.string(),
  unitPriceWithTax: z.string(),
  subtotal: z.string(),
})
