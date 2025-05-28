import * as z from "zod";


export const EmployeeDepartmentElementSchema = z.object({
    "id": z.number(),
    "complete_name": z.string(),
    "department_id": z.array(z.union([z.number(), z.string()])),
    "parent_id": z.array(z.union([z.number(), z.string()])),
    "grade_id": z.array(z.union([z.number(), z.string()])),
    "image": z.string(),
    "sector_id": z.array(z.union([z.number(), z.string()])),
    "sector_manager_id": z.array(z.union([z.number(), z.string()])),
    "department_global_id": z.array(z.union([z.number(), z.string()])),
    "english_name": z.string(),
    "job_id": z.array(z.union([z.number(), z.string()])),
    "work_phone": z.string(),
    "work_email": z.string(),
    "work_email2": z.string(),
    "work_location": z.string(),
    "mobile_phone": z.string(),
    "mobile_phone2": z.string(),
    "administration_id": z.array(z.union([z.number(), z.string()])),
    "job_english_name": z.string(),
});
export type EmployeeDepartmentElement = z.infer<typeof EmployeeDepartmentElementSchema>;
