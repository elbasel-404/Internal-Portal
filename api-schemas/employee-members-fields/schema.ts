import * as z from "zod";


export const EmployeeMembersFieldSchema = z.object({
    "id": z.union([z.number(), z.string()]),
    "name": z.string().optional(),
    "individual_complete_name": z.string().optional(),
    "first_name_ar": z.string().optional(),
    "father_name_ar": z.string().optional(),
    "grandfather_name_ar": z.string().optional(),
    "individual_english_name": z.string().optional(),
    "family_name_ar": z.string().optional(),
    "first_name_en": z.string().optional(),
    "father_name_en": z.string().optional(),
    "grandfather_name_en": z.string().optional(),
    "family_name_en": z.string().optional(),
    "relative_relation": z.string().optional(),
    "identity": z.string().optional(),
    "birthday": z.string().optional(),
});
export type EmployeeMembersField = z.infer<typeof EmployeeMembersFieldSchema>;
