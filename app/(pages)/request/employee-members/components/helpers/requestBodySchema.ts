import { z } from "zod"

export const requestBodySchema = z.object({
  type: z.string(),
  first_name_ar: z.string(),
  father_name_ar: z.string(),
  grandfather_name_ar: z.string(),
  family_name_ar: z.string(),
  first_name_en: z.string(),
  father_name_en: z.string(),
  grandfather_name_en: z.string(),
  family_name_en: z.string(),
  identity: z.string(),
  birthday: z.string(),
  relative_relation: z.string(),
  attachment_ids: z.instanceof(File).or(z.string()).optional(),
})
