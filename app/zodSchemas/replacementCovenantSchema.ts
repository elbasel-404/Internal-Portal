import { z } from "zod"

export const ReplacementCovenantSchema = z.object({
  covenantNumber: z.string().min(1, "ادخل رقم العهدة"),
  covenantDate: z.string().min(1, "ادخل تاريخ استعاضة/إقفال العهدة"),
  covenantType: z.string().min(1, "اختر نوع استعاضة/إقفال العهدة"),
})
