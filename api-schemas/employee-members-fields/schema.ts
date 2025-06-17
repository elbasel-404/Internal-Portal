import * as z from "zod"

export const EmployeeMembersFieldSchema = z.object({
  id: z.any(),
  name: z.any(),
  individual_complete_name: z.any(),
  first_name_ar: z.any(),
  father_name_ar: z.any(),
  grandfather_name_ar: z.any(),
  individual_english_name: z.any(),
  family_name_ar: z.any(),
  first_name_en: z.any(),
  father_name_en: z.any(),
  grandfather_name_en: z.any(),
  family_name_en: z.any(),
  relative_relation: z.any(),
  identity: z.any(),
  birthday: z.any(),
})
export type EmployeeMembersField = z.infer<typeof EmployeeMembersFieldSchema>

// export const EmployeeMembersFieldSchema = z.object({
//   id: z.union([z.number(), z.string()]),
//   name: z.string().optional(),
//   individual_complete_name: z.string().optional(),
//   first_name_ar: z.string().optional(),
//   father_name_ar: z.string().optional(),
//   grandfather_name_ar: z.string().optional(),
//   individual_english_name: z.string().optional(),
//   family_name_ar: z.string().optional(),
//   first_name_en: z.string().optional(),
//   father_name_en: z.string().optional(),
//   grandfather_name_en: z.string().optional(),
//   family_name_en: z.string().optional(),
//   relative_relation: z.string().optional(),
//   identity: z.string().optional(),
//   birthday: z.string().optional(),
// })
// export type EmployeeMembersField = z.infer<typeof EmployeeMembersFieldSchema>
