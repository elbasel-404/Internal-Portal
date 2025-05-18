import * as z from "zod";


export const DepartmentGlobalIdEnumSchema = z.enum([
    "مكتب المحافظ / مكتب المحافظ",
]);
export type DepartmentGlobalIdEnum = z.infer<typeof DepartmentGlobalIdEnumSchema>;


export const EmployeeIdEnumSchema = z.enum([
    "[1316] سامي بن إبراهيم الحسيني",
]);
export type EmployeeIdEnum = z.infer<typeof EmployeeIdEnumSchema>;


export const HolidayStatusIdEnumSchema = z.enum([
    "إجازة سنوية",
]);
export type HolidayStatusIdEnum = z.infer<typeof HolidayStatusIdEnumSchema>;


export const RequestTypeArSchema = z.enum([
    "إجازة",
    "تذكرة دعم",
    "طلب تعريف راتب",
    "عمل عن بعد",
]);
export type RequestTypeAr = z.infer<typeof RequestTypeArSchema>;


export const RequestTypeEnSchema = z.enum([
    "distance_work",
    "help_desk",
    "holiday",
    "salary_request",
]);
export type RequestTypeEn = z.infer<typeof RequestTypeEnSchema>;


export const ResModelSchema = z.enum([
    "helpdesk.ticket",
    "hr.distance.work",
    "hr.holidays",
    "salary.identification.request",
]);
export type ResModel = z.infer<typeof ResModelSchema>;


export const SectorIdEnumSchema = z.enum([
    "مكتب المحافظ",
]);
export type SectorIdEnum = z.infer<typeof SectorIdEnumSchema>;


export const StateSchema = z.enum([
    "cutoff",
    "done",
]);
export type State = z.infer<typeof StateSchema>;


export const SubstituteEmployeeIdEnumSchema = z.enum([
    "[1007] ماجد بن ناصر بونهيه",
    "[1373] رياض بن عبدالمحسن آل الشيخ",
    "[1509] سعود بن خالد السبهان",
    "[1510] سليمان بن عبدالرحمن الطريف",
    "[1522] عبدالله بن فواز المسعد",
]);
export type SubstituteEmployeeIdEnum = z.infer<typeof SubstituteEmployeeIdEnumSchema>;


export const TypeSchema = z.enum([
    "salary_detail",
    "salary_identification",
    "salary_payslip",
    "total_salary",
]);
export type Type = z.infer<typeof TypeSchema>;

export const TransactionListElementSchema = z.object({
    "id": z.number(),
    "create_date": z.coerce.date(),
    "duration": z.number().optional(),
    "holiday_status_id": z.array(z.union([HolidayStatusIdEnumSchema, z.number()])).optional(),
    "date_from": z.string().optional(),
    "date_to": z.string().optional(),
    "notes": z.union([z.boolean(), z.string()]).optional(),
    "attachment_ids": z.array(z.number()).optional(),
    "death_person": z.union([z.boolean(), z.string()]).optional(),
    "substitute_employee_id": z.union([z.array(z.union([SubstituteEmployeeIdEnumSchema, z.number()])), z.boolean()]).optional(),
    "refuse_reason": z.boolean().optional(),
    "childbirth_date": z.boolean().optional(),
    "res_model": ResModelSchema,
    "name": z.string().optional(),
    "date": z.string().optional(),
    "state": StateSchema.optional(),
    "employee_id": z.array(z.union([EmployeeIdEnumSchema, z.number()])).optional(),
    "cancel_reason": z.boolean().optional(),
    "department_global_id": z.array(z.union([DepartmentGlobalIdEnumSchema, z.number()])).optional(),
    "sector_id": z.array(z.union([SectorIdEnumSchema, z.number()])).optional(),
    "request_type_ar": RequestTypeArSchema,
    "request_type_en": RequestTypeEnSchema,
    "description": z.string().optional(),
    "reason": z.boolean().optional(),
    "write_date": z.coerce.date().optional(),
    "priority": z.string().optional(),
    "ticket_type_id": z.array(z.union([z.number(), z.string()])).optional(),
    "class_id": z.array(z.union([z.number(), z.string()])).optional(),
    "location_id": z.array(z.union([z.number(), z.string()])).optional(),
    "team_id": z.array(z.union([z.number(), z.string()])).optional(),
    "category_id": z.array(z.union([z.number(), z.string()])).optional(),
    "open_date": z.string().optional(),
    "stage_id": z.array(z.union([z.number(), z.string()])).optional(),
    "number": z.string().optional(),
    "order_date": z.string().optional(),
    "destination_id": z.boolean().optional(),
    "type": TypeSchema.optional(),
    "download_link": z.boolean().optional(),
    "open_link": z.boolean().optional(),
    "template_id": z.union([z.array(z.union([z.number(), z.string()])), z.boolean()]).optional(),
});
export type TransactionListElement = z.infer<typeof TransactionListElementSchema>;
