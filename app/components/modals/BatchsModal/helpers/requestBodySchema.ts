import { z } from "zod"

export const paymentSchema = z.object({
  name: z.string(),
  number: z.number(),
  deduction_amount: z.number(),
  amount_before_deduction: z.number(),
  amount: z.number(),
  products: z.array(
    z.object({
      id: z.number(),
    }),
  ),
})

export const requestBodySchema = z.object({
  requestId: z.any(),
  payments: z.array(paymentSchema),
})
