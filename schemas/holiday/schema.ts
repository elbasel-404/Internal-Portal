import * as z from "zod";


export const CountryIdEnumSchema = z.enum([
    "Bonaire, Sint Eustatius and Saba",
]);
export type CountryIdEnum = z.infer<typeof CountryIdEnumSchema>;


export const CreateUidEnumSchema = z.enum([
    "Mahmoud N. Albakr",
]);
export type CreateUidEnum = z.infer<typeof CreateUidEnumSchema>;


export const DepartmentGlobalIdEnumSchema = z.enum([
    "خدمات المنشآت / التقنية والحلول الرقمية",
]);
export type DepartmentGlobalIdEnum = z.infer<typeof DepartmentGlobalIdEnumSchema>;


export const EmployeeIdEnumSchema = z.enum([
    "[1750] محمود  بن ناصر  البكر",
]);
export type EmployeeIdEnum = z.infer<typeof EmployeeIdEnumSchema>;


export const GradeIdEnumSchema = z.enum([
    "قائد فريق",
]);
export type GradeIdEnum = z.infer<typeof GradeIdEnumSchema>;


export const HolidayStatusIdEnumSchema = z.enum([
    "إجازة المولود",
    "إجازة زواج",
    "إجازة سنوية",
    "إجازة مرضيّة",
]);
export type HolidayStatusIdEnum = z.infer<typeof HolidayStatusIdEnumSchema>;


export const HolidayTypeSchema = z.enum([
    "employee",
]);
export type HolidayType = z.infer<typeof HolidayTypeSchema>;


export const JobIdEnumSchema = z.enum([
    "قائد فريق إدارة الخدمات الرقمية",
]);
export type JobIdEnum = z.infer<typeof JobIdEnumSchema>;


export const ManagerIdEnumSchema = z.enum([
    "[1417] رائد بن حمد رشيد",
    "[1688] ايمن بن معتوق السفياني",
]);
export type ManagerIdEnum = z.infer<typeof ManagerIdEnumSchema>;


export const ResModelSchema = z.enum([
    "hr.holidays",
]);
export type ResModel = z.infer<typeof ResModelSchema>;


export const SectorIdEnumSchema = z.enum([
    "خدمات المنشآت",
]);
export type SectorIdEnum = z.infer<typeof SectorIdEnumSchema>;


export const StateSchema = z.enum([
    "done",
]);
export type State = z.infer<typeof StateSchema>;


export const TypeSchema = z.enum([
    "remove",
]);
export type Type = z.infer<typeof TypeSchema>;


export const WriteUidEnumSchema = z.enum([
    "Anfal N. Hamdi",
    "Mubarak H. Alajmi",
]);
export type WriteUidEnum = z.infer<typeof WriteUidEnumSchema>;

export const HolidayElementSchema = z.object({
    "id": z.number(),
    "payslip_status": z.boolean(),
    "report_note": z.boolean(),
    "user_id": z.array(z.union([CreateUidEnumSchema, z.number()])),
    "manager_id": z.array(z.union([ManagerIdEnumSchema, z.number()])),
    "notes": z.string(),
    "number_of_days_temp": z.number(),
    "number_of_days": z.number(),
    "meeting_id": z.boolean(),
    "type": TypeSchema,
    "linked_request_ids": z.array(z.any()),
    "category_id": z.boolean(),
    "holiday_type": HolidayTypeSchema,
    "first_approver_id": z.boolean(),
    "second_approver_id": z.boolean(),
    "name": z.string(),
    "date": z.string(),
    "employee_id": z.array(z.union([EmployeeIdEnumSchema, z.number()])),
    "substitute_employee_id": z.array(z.union([ManagerIdEnumSchema, z.number()])),
    "department_id": z.array(z.union([z.number(), z.string()])),
    "job_id": z.array(z.union([JobIdEnumSchema, z.number()])),
    "grade_id": z.array(z.union([GradeIdEnumSchema, z.number()])),
    "degree_id": z.array(z.union([z.number(), z.string()])),
    "raison": z.union([z.boolean(), z.string()]),
    "date_from": z.string(),
    "date_to": z.string(),
    "duration": z.number(),
    "holiday_status_id": z.array(z.union([HolidayStatusIdEnumSchema, z.number()])),
    "with_advanced_salary": z.boolean(),
    "salary_number": z.number(),
    "state": StateSchema,
    "holiday_cancellation": z.boolean(),
    "is_extension": z.boolean(),
    "extended_holiday_id": z.boolean(),
    "parent_id": z.boolean(),
    "extension_holidays_ids": z.array(z.any()),
    "extension_duration": z.number(),
    "childbirth_date": z.union([z.boolean(), z.string()]),
    "sold_overtime": z.number(),
    "sold_attendance": z.number(),
    "death_person": z.union([z.boolean(), z.string()]),
    "compensation_type": z.boolean(),
    "accompaniment_type": z.boolean(),
    "accompanied_child_age": z.number(),
    "study_subject": z.boolean(),
    "city": z.boolean(),
    "country_ids": z.union([z.array(z.union([CountryIdEnumSchema, z.number()])), z.boolean()]),
    "current_holiday_stock": z.number(),
    "sport_participation_topic": z.boolean(),
    "birth_child_filename": z.boolean(),
    "hide_with_advanced_salary": z.boolean(),
    "token_compensation_stock": z.number(),
    "payed_salary_advance": z.boolean(),
    "done_date": z.coerce.date(),
    "attachment_ids": z.array(z.number()),
    "date_holidays_to": z.boolean(),
    "refuse_reason": z.string(),
    "active": z.boolean(),
    "cancel_reason": z.boolean(),
    "res_model": ResModelSchema,
    "is_from_mobile": z.boolean(),
    "mobile_approvals_ids": z.array(z.number()),
    "message_follower_ids": z.array(z.number()),
    "message_ids": z.array(z.number()),
    "message_last_post": z.boolean(),
    "website_message_ids": z.array(z.any()),
    "create_uid": z.array(z.union([CreateUidEnumSchema, z.number()])),
    "create_date": z.coerce.date(),
    "write_uid": z.array(z.union([WriteUidEnumSchema, z.number()])),
    "write_date": z.coerce.date(),
    "x_sla_labels": z.string(),
    "double_validation": z.boolean(),
    "can_reset": z.boolean(),
    "is_annual": z.boolean(),
    "spend_advanced_salary": z.boolean(),
    "advanced_salary_period": z.number(),
    "is_current_user": z.boolean(),
    "is_direct_manager": z.boolean(),
    "is_cut": z.boolean(),
    "is_cancelled": z.boolean(),
    "is_started": z.boolean(),
    "is_finished": z.boolean(),
    "is_extended": z.boolean(),
    "can_be_cut": z.boolean(),
    "can_be_cancelled": z.boolean(),
    "display_button_cancel": z.boolean(),
    "display_button_cut": z.boolean(),
    "display_button_extend": z.boolean(),
    "attachment_required": z.boolean(),
    "display_button_send": z.boolean(),
    "substitute_employee_required": z.boolean(),
    "department_global_id": z.array(z.union([DepartmentGlobalIdEnumSchema, z.number()])),
    "sector_id": z.array(z.union([SectorIdEnumSchema, z.number()])),
    "message_is_follower": z.boolean(),
    "message_partner_ids": z.array(z.number()),
    "message_channel_ids": z.array(z.any()),
    "message_unread": z.boolean(),
    "message_unread_counter": z.number(),
    "message_needaction": z.boolean(),
    "message_needaction_counter": z.number(),
    "display_name": z.string(),
    "__last_update": z.coerce.date(),
});
export type HolidayElement = z.infer<typeof HolidayElementSchema>;
