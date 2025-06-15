import * as z from "zod";


export const EmployeeMemberSchema = z.object({
    "id": z.number(),
    "name": z.string(),
    "date": z.string(),
    "type": z.string(),
    "state": z.string(),
    "employee_id": z.array(z.union([z.number(), z.string()])),
    "attachment_ids": z.array(z.number()),
    "individual_complete_name": z.string(),
    "individual_english_name": z.string(),
    "identity": z.string(),
    "birthday": z.string(),
    "relative_relation": z.string(),
});
export type EmployeeMember = z.infer<typeof EmployeeMemberSchema>;
