import * as z from "zod";

export const SalaryIdentificationElementSchema = z.object({
    "id": z.any(),
    "number": z.any(),
    "order_date": z.any(),
    "employee_id": z.any(),
    "destination_id": z.any(),
    "type": z.any(),
    "speech_lang": z.any(),
    "state": z.any(),
    "partner_id": z.any(),
    "template_id": z.any(),
    "refuse_reason": z.any(),
    "notes": z.any(),
    "active": z.any(),
    "account_status": z.any(),
    "bank_id": z.any(),
    "acc_number": z.any(),
    "download_link": z.any(),
    "open_link": z.any(),
    "res_model": z.any(),
    "is_from_mobile": z.any(),
    "message_follower_ids": z.any(),
    "message_ids": z.any(),
    "message_last_post": z.any(),
    "website_message_ids": z.any(),
    "create_uid": z.any(),
    "create_date": z.any(),
    "write_uid": z.any(),
    "write_date": z.any(),
    "eng_destination": z.any(),
    "template_name": z.any(),
    "basic_salary": z.any(),
    "allowance_housing": z.any(),
    "allowance_transportation": z.any(),
    "allowance_mobile": z.any(),
    "designation_mandated_amount": z.any(),
    "department_global_id": z.any(),
    "sector_id": z.any(),
    "message_is_follower": z.any(),
    "message_partner_ids": z.any(),
    "message_channel_ids": z.any(),
    "message_unread": z.any(),
    "message_unread_counter": z.any(),
    "message_needaction": z.any(),
    "message_needaction_counter": z.any(),
    "display_name": z.any(),
    "__last_update": z.any(),
});

// export const CreateUidEnumSchema = z.enum([
//     "Administrator",
//     "Hamad Y. Alqushaymit",
// ]);
// export type CreateUidEnum = z.infer<typeof CreateUidEnumSchema>;


// export const DepartmentGlobalIdEnumSchema = z.enum([
//     "خدمات المنشآت / التقنية والحلول الرقمية",
// ]);
// export type DepartmentGlobalIdEnum = z.infer<typeof DepartmentGlobalIdEnumSchema>;


// export const DisplayNameSchema = z.enum([
//     "[1401] حمد بن يوسف القشيميط",
// ]);
// export type DisplayName = z.infer<typeof DisplayNameSchema>;


// export const ResModelSchema = z.enum([
//     "salary.identification.request",
// ]);
// export type ResModel = z.infer<typeof ResModelSchema>;


// export const SectorIdEnumSchema = z.enum([
//     "خدمات المنشآت",
// ]);
// export type SectorIdEnum = z.infer<typeof SectorIdEnumSchema>;


// export const StateSchema = z.enum([
//     "done",
// ]);
// export type State = z.infer<typeof StateSchema>;


// export const TemplateSchema = z.enum([
//     "",
//     "Salary Request RTL",
//     "خطاب تعريف بتفاصيل الراتب",
// ]);
// export type Template = z.infer<typeof TemplateSchema>;

// export const SalaryIdentificationElementSchema = z.object({
//     "id": z.number(),
//     "number": z.string(),
//     "order_date": z.string(),
//     "employee_id": z.array(z.union([DisplayNameSchema, z.number()])),
//     "destination_id": z.array(z.union([z.number(), z.string()])),
//     "type": z.string(),
//     "speech_lang": z.union([z.boolean(), z.string()]),
//     "state": StateSchema,
//     "partner_id": z.boolean(),
//     "template_id": z.array(z.union([TemplateSchema, z.number()])),
//     "refuse_reason": z.boolean(),
//     "notes": z.union([z.boolean(), z.string()]),
//     "active": z.boolean(),
//     "account_status": z.string(),
//     "bank_id": z.array(z.any()),
//     "acc_number": z.string(),
//     "download_link": z.string(),
//     "open_link": z.string(),
//     "res_model": ResModelSchema,
//     "is_from_mobile": z.boolean(),
//     "message_follower_ids": z.array(z.number()),
//     "message_ids": z.array(z.number()),
//     "message_last_post": z.boolean(),
//     "website_message_ids": z.array(z.any()),
//     "create_uid": z.array(z.union([CreateUidEnumSchema, z.number()])),
//     "create_date": z.coerce.date(),
//     "write_uid": z.array(z.union([z.number(), z.string()])),
//     "write_date": z.coerce.date(),
//     "eng_destination": z.string(),
//     "template_name": TemplateSchema,
//     "basic_salary": z.number(),
//     "allowance_housing": z.number(),
//     "allowance_transportation": z.number(),
//     "allowance_mobile": z.number(),
//     "designation_mandated_amount": z.number(),
//     "department_global_id": z.array(z.union([DepartmentGlobalIdEnumSchema, z.number()])),
//     "sector_id": z.array(z.union([SectorIdEnumSchema, z.number()])),
//     "message_is_follower": z.boolean(),
//     "message_partner_ids": z.array(z.number()),
//     "message_channel_ids": z.array(z.any()),
//     "message_unread": z.boolean(),
//     "message_unread_counter": z.number(),
//     "message_needaction": z.boolean(),
//     "message_needaction_counter": z.number(),
//     "display_name": DisplayNameSchema,
//     "__last_update": z.coerce.date(),
// });
// export type SalaryIdentificationElement = z.infer<typeof SalaryIdentificationElementSchema>;
