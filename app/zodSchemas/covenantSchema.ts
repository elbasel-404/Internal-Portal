import { z } from "zod"

export const CovenantSchema = z.object({
  product: z.string().min(1, "Product is required"),
  statement: z.string().min(1, "Statement is required"),
  amount: z.string().min(1, "Amount is required"), // Assuming it's a string, convert to number if needed
  invoiceNumber: z.string().min(1, "Invoice Number is required"),
  attachments: z.array(z.string()), // Assuming attachments are file paths/URLs
})
