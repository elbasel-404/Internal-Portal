import { z } from "zod"

export const requestBodySchema = z.object({
  employee_id: z.string(),
  holiday_status_id: z.string(),
  date_from: z.string(),
  date_to: z.string(),
  substitute_employee_id: z.string(),
  notes: z.string(),
  attachment_ids: z.instanceof(File).or(z.string()).optional(),
  childbirth_date: z.string().optional(),
  death_person: z.string().optional(),
})
