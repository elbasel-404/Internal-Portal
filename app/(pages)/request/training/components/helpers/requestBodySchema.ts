import { z } from "zod"

export const requestBodySchema = z.object({
  employee_id: z.string(),
  name: z.string().optional(),
  type: z.string(),
  date_from: z.string(),
  date_to: z.string(),
  training_center_id: z.string().optional(),
  training_type: z.string().optional(),
  city_id: z.string().optional(),
  country_id: z.string().optional(),
  programme_session: z.string().optional(),
  substitute_employee_id: z.string().optional(),
  travel_days_setting: z.string().optional(),
  attachment_ids: z.instanceof(File).or(z.string()).optional(),
})
