import * as z from "zod"

export const HolidayCreateRequestBodySchema = z.object({
  employee_id: z.any(),
  holiday_status_id: z.any(),
  date_from: z.any(),
  date_to: z.any(),
  substitute_employee_id: z.any(),
  notes: z.any(),
  attachment_ids: z.any(),
})
export type HolidayCreateRequestBody = z.infer<
  typeof HolidayCreateRequestBodySchema
>

// export const HolidayCreateRequestBodySchema = z.object({
//   employee_id: z.string(),
//   holiday_status_id: z.string(),
//   date_from: z.string(),
//   date_to: z.string(),
//   substitute_employee_id: z.string(),
//   notes: z.string(),
//   attachment_ids: z.array(z.any()),
// })
// export type HolidayCreateRequestBody = z.infer<
//   typeof HolidayCreateRequestBodySchema
// >
