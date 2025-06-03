import { z } from "zod"

export const BankAccountSchema = z.object({
  bankName: z.string().min(1, "اختر اسم البنك"),
  ibanNumber: z.string().min(1, "ادخل رقم الآيبان (IBAN)"),
  attachments: z.array(z.instanceof(File)).optional(),
})
